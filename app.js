//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    //console.log(firstName, lastName, email);

    //our data is gone send by the body parameter using key called member
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    //to turn data object in flat pack JSON
    const jsonData = JSON.stringify(data); 

    //options specifies whether we want to get or post requests

    // const url = "https://us"{number after us in  api key}".api.mailchimp.com/3.0/lists/"{List ID}"";

    const url = "https://us5.api.mailchimp.com/3.0/lists/5a9f59e691";

    const options = {
        method: "POST",
        auth: "suraj1:8dcb6fb17dc73531afa5a3c47b1565b7-us5"         //for https athentification
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+ "/success.html");
        }else{
            res.send(__dirname+"/failurer.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

});


//redirect to home 
app.post("/failurer",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT,8000,function()
{
    console.log("server is running on port 8000");

})




//API KEY
// 8dcb6fb17dc73531afa5a3c47b1565b7-us5

// ;LIST ID 
// 5a9f59e691
