var express = require("express");
var router = express.Router();
var request = require("request");
var fs = require("fs");

const { resolve } = require("path");


router.get("/", function(req, res) {
    //https://api.covidtracking.com/v1/states/current.json
    //https://covidtracking.com/data/api
    var options = {
        method: 'GET',
        url: "https://api.covidtracking.com/v1/states/current.json",
        headers: {
            'cache-control': 'no-cache'
        }
    };
    request(options, function(err, response, body) {
        if (err) {
            console.log(err);
        } else {
            //console.log(response.body);
            // res.send(response.body);
            // res.send("hello");
            var obj;
            fs.readFile("data/census.json", 'utf8', function(e, d) {
                if(e) throw e;
                obj = JSON.parse(d);
                //console.log(obj);
                //console.log(Object.keys(obj));
                var apiData = JSON.parse(response.body);
                for(var stateId in obj) {
                    
                    for (var i in apiData) {
                 //       console.log(apiData[i]["state"]);
                        if(stateId == apiData[i]["state"]) {
                            apiData[i]["stateName"] = obj[stateId]["State"];
                            apiData[i]["population"] = obj[stateId]["Census"];
                            apiData[i]["adults60Up"] = obj[stateId]["adults60Up"];
                            console.log(apiData[i]);
                        } 

                        if(["AS","GU", "MP", "PR", "VI"].includes(apiData[i]["state"])) {
                            apiData.splice(i,1);
                        }
                    }                  
                    console.log(obj[stateId]);                    
                }
                res.render("index", { "covidAllStatesData": apiData});
            });
           
           
            

        }
    });
});

module.exports = router;