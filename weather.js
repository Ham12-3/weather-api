const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
//  create a get method
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
   
} );
app.use(bodyParser.urlencoded({extended:true}));
// post method
app.post("/", function(req,res) {

    const query=req.body.location;
    // add the url of the weather api
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=29e061926405973b64a8e014eb30eeeb&units=metric";
       
    
    // add the https native node module
    


    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData= JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl="https://openweathermap.org/img/wn/" +icon+"@2x.png";
            res.write("<h1>The temperature of the weather in "+ query+" is " +temp+" degrees celsius</h1>");
            res.write(weatherDescription);
            res.write("<img src="+imageUrl+">");
            res.send();
        });
    });
});

// create port to listen to
app.listen(process.env.PORT||3000, function() {
    console.log("server is up and running"); 
});
