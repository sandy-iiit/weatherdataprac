const { response, urlencoded } = require("express");
const express = require("express");
const bodyParser=require("body-parser");
require('dotenv').config()

const https = require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");


    });


app.post("/",function(req,res){


    console.log(req.body.city);
    const query=req.body.city;
    const apikey=process.env.APIKEY;
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+apikey+"&q="+query+"&units="+unit;

https.get(url,function(response){

console.log(response.statusCode);
        response.on("data",function(data){
                 
            wd=JSON.parse(data);
            console.log(wd);
            const temp=wd.main.temp;
            const des=wd.weather[0].description;
            const icon=wd.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";    

            console.log(temp);
            res.write("<p>The weather description in " +query +" is "+des+"<p>");
            res.write("<h1>The temperature in"+ query +" is " +temp+"</h1>");
            res.write("<img src="+imgurl+">");
            res.send();
        }) ;
});
});






app.listen(3000,function(){

    console.log("Server is running in the port 3000");
});







