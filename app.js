var express = require('express');
var app = express();
var computeScores = require("./compute");
var Request = require("request");
//hard-coded jsonData string used for testing
//var jsonData = '{"listQuestions" : [{"question" : "What is the application workload type? ","applicable" : "Yes","response" : "Development", "Comments" : "Test 1"}, {"question" : "What is the architecture type of application under consideration?","applicable" : "Yes","response" : "Microservices", "Comments" : "Test 2"}, {"question" : "Have you performed assessment of the application for its cloud readiness?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 3"}, {"question" : "What is the type of data is the application expected to handle?","applicable" : "Yes","response" : "Internal", "Comments" : "Test 4"}, {"question" : "How is the application going to be accessed?","applicable" : "Yes","response" : "Mostly over internet", "Comments" : "Test 5"}, {"question" : "Is the application expected to handle large amounts of data?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 6"}, {"question" : "When is the peak load expected for the application?","applicable" : "Yes","response" : "24*7*365 days", "Comments" : "Test 7"}, {"question" : "Is the application latency sensitive?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 8"}, {"question" : "Does the application have a near zero RTO/RPO requirement?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 9"}, {"question" : "Does the application need to transfer data over a content delivery network (CDN)?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 10"}, {"question" : "Does the application require to maintain audit and transaction logs for a specified time interval as per regulatory requirements?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 11"}, {"question" : "Does the application need to be accessed through Multi-factor Authentication?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 12"}, {"question" : "Does the application mandate the data residing within the application to be hosted in a particular geography only?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 13"}, {"question" : "Are you certain that the application will be in production one year from Yesw?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 14"}, {"question" : "Does the application need large amounts of compute and performance?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 15"}, {"question" : "Does managing the application need niche skills and high level of expertise?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 16"}, {"question" : "Does the application need high levels of customization to meet business objectives?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 17"}, {"question" : "Does the application need integration with on-prem applications / workloads?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 18"}]}';
app.set("view engine", "jade");

app.get('/', function (req, res) {
    var data = req.query.jsonData;
    var cloudScore = computeScores.getFinalCloudScore(data);
    var onPremScore = computeScores.getFinalOnPremScore(data);
    var inferenceMsg = "";    
    if (cloudScore < onPremScore)
        inferenceMsg = "The application is more suited to be hosted on premises";
    else if (cloudScore == onPremScore)
        inferenceMsg = "The application can be hosted on-premises or on the cloud";
    else
        inferenceMsg = "The Application is more suited to be hosted on public cloud";    
    app.render("inferenceTemplate", { cloudScore: cloudScore, onPremScore: onPremScore, inferenceMsg: inferenceMsg}, function(err, html) {
        res.render("inferenceTemplate", { cloudScore: cloudScore, onPremScore: onPremScore, inferenceMsg: inferenceMsg, htmlContent: html });        
    });  
    
});

//Call the 'Print' microservice to print PDF
app.get('/print', function (req, res) {
    Request
        .post({
            "headers": { "content-type": "application/pdf" },
            "url": "http://localhost:8081/api/v1/print" + "?htmlContent=" + req.query.htmlContent
        })
        .on('error', function (err) {
            console.log(err)
        })
        .pipe(res)
});

//Call the 'Inference' microservice to save it
app.get('/save', function (req, res) {
    var userName = "Vedant Aphale";
    var jsonData = '{"listQuestions" : [{"question" : "What is the application workload type? ","applicable" : "Yes","response" : "Development", "Comments" : "Test 1"}, {"question" : "What is the architecture type of application under consideration?","applicable" : "Yes","response" : "Microservices", "Comments" : "Test 2"}, {"question" : "Have you performed assessment of the application for its cloud readiness?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 3"}, {"question" : "What is the type of data is the application expected to handle?","applicable" : "Yes","response" : "Internal", "Comments" : "Test 4"}, {"question" : "How is the application going to be accessed?","applicable" : "Yes","response" : "Mostly over internet", "Comments" : "Test 5"}, {"question" : "Is the application expected to handle large amounts of data?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 6"}, {"question" : "When is the peak load expected for the application?","applicable" : "Yes","response" : "24*7*365 days", "Comments" : "Test 7"}, {"question" : "Is the application latency sensitive?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 8"}, {"question" : "Does the application have a near zero RTO/RPO requirement?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 9"}, {"question" : "Does the application need to transfer data over a content delivery network (CDN)?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 10"}, {"question" : "Does the application require to maintain audit and transaction logs for a specified time interval as per regulatory requirements?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 11"}, {"question" : "Does the application need to be accessed through Multi-factor Authentication?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 12"}, {"question" : "Does the application mandate the data residing within the application to be hosted in a particular geography only?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 13"}, {"question" : "Are you certain that the application will be in production one year from Yesw?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 14"}, {"question" : "Does the application need large amounts of compute and performance?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 15"}, {"question" : "Does managing the application need niche skills and high level of expertise?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 16"}, {"question" : "Does the application need high levels of customization to meet business objectives?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 17"}, {"question" : "Does the application need integration with on-prem applications / workloads?","applicable" : "Yes","response" : "Yes", "Comments" : "Test 18"}]}';
    var cloudScore = Math.floor(computeScores.getFinalCloudScore(jsonData));
    var onPremScore = Math.floor(computeScores.getFinalOnPremScore(jsonData));
    var queryParm = "?user=" + userName + "&listQuestions=" + jsonData + "&onPremScore=" + onPremScore + "&cloudScore=" + cloudScore
    Request
        .post({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:8082/api/v1/inference" + encodeURI(queryParm, "UTF-8")
        })
        .on('error', function (err) {
            console.log(err)
        })
        .pipe(res)
});

//Call the 'Email' microservice to mail the inference
app.get('/email', function (req, res) {
    Request
        .post({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:8083/api/v1/email" + "?toAddress=atulaphale@gmail.com" + "&subject=InferenceReport" + "&body=" + req.query.htmlContent 
        })
        .on('error', function (err) {
            console.log(err)
        })
        .pipe(res)
});
app.listen(5000, 'localhost');