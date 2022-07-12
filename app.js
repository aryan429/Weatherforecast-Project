const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName
    const cityName = query;
    const apiKey = "a336be7f7424e327f206a767ca213fee";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const cur = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDiscription + " d</p>")
            res.write("<h1>The temp in "+query+  " is " + cur + " degree</h1>");
            res.write("<img src=" + imgurl + ">");
            res.send();
        })
    });
});


app.listen(3000, function () {
    console.log("Server");
});







