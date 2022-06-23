"use strict"


const express = require("express")
const bodyparser = require("body-parser")
const request = require("request");
const https = require("https");
const { read } = require("fs");
const app = express()
app.use(express.static("/static"))                                //for local storage files rendering on web
app.use(bodyparser.urlencoded({extended:true}))
app.listen(process.env.PORT || 3000, function(){})





app.get("/", function(req, res){
    res.sendFile(__dirname + "/sighup.html")
})




app.post("/", function(req, res){
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const mail = req.body.email;
    // console.log(Fname,Lname, mail)

    const data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/b1ebe26ab1"
    const options = {
        method: "POST",
        auth: "sameer:bb849a23ac102955d2abe43be11ab526-us17"         //edit for 404
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            // res.send("sab badiya bhai thike chalo ab niklo")
            res.sendFile(__dirname + "/sucess.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();


})



app.post("/failure.html", function(req, res){
    res.redirect("/")
})





//API key
//bb849a23ac102955d2abe43be11ab526-us17
// audiance id b1ebe26ab1