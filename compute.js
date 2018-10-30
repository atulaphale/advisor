var fs = require('fs');

//Get the JSON data
//var jsonData = fs.readFileSync("survey.json", "utf-8");


function getSurveyData(data, type) {
    var responses = [];
    for (var i = 0; i < data.listQuestions.length; i++) {
        var question = data.listQuestions[i];
        if (type == 'response')
            responses.push(question.response);
        else if (type == 'applicable')
            responses.push(question.applicable);
    }
    return responses;
}

function getActualWeight(weight, applicableData) {
    var newWeight = [];
    for (var i = 0; i < applicableData.length; i++) {
        if (applicableData[i] == 'Yes')
            newWeight.push(weight[i]);
        else if (applicableData[i] == 'No')
            newWeight.push(0);
    }
    return newWeight;
}

function getCloudScore(responseData) {
    var cloudScore = [];
    for (var i = 0; i < responseData.length; i++) {
        switch (i) {
            case 0:
                if (responseData[i] == "Production")
                    cloudScore.push(5);
                else
                    cloudScore.push(10);
                break;

            case 1:
                if (responseData[i] == "Single Tier")
                    cloudScore.push(8);
                else if (responseData[i] == "2 Tier")
                    cloudScore.push(5);
                else if (responseData[i] == "3 Tier")
                    cloudScore.push(4);
                else if (responseData[i] == "Microservices")
                    cloudScore.push(10);
                else
                    cloudScore.push(2);
                break;

            case 2:
                if (responseData[i] == "Yes")
                    cloudScore.push(10);
                else
                    cloudScore.push(5);
                break;

            case 3:
                if (responseData[i] == "Confidential")
                    cloudScore.push(0);
                else if (responseData[i] == "Internal")
                    cloudScore.push(3);
                else if (responseData[i] == "Restricted")
                    cloudScore.push(5);
                else
                    cloudScore.push(10);
                break;

            case 4:
                if (responseData[i] == "Only over corporate network")
                    cloudScore.push(1);
                else if (responseData[i] == "Mostly over corporate network")
                    cloudScore.push(3);
                else if (responseData[i] == "Equally over corporate network and internet")
                    cloudScore.push(5);
                else if (responseData[i] == "Mostly over internet")
                    cloudScore.push(7);
                else
                    cloudScore.push(8);
                break;

            case 5:
                if (responseData[i] == "Yes")
                    cloudScore.push(3);
                else
                    cloudScore.push(10);
                break;

            case 6:
                if (responseData[i] == "24*7*365 days")
                    cloudScore.push(1);
                else if (responseData[i] == "8-10 hours on weekdays")
                    cloudScore.push(3);
                else if (responseData[i] == "3-4 days in a month")
                    cloudScore.push(8);
                else
                    cloudScore.push(10);
                break;

            case 7:
            case 8:
            case 16:
            case 17:
                if (responseData[i] == "Yes")
                    cloudScore.push(5);
                else
                    cloudScore.push(10);
                break;

            case 9:
                if (responseData[i] == "Yes")
                    cloudScore.push(8);
                else
                    cloudScore.push(4);
                break;

            case 10:
                if (responseData[i] == "Yes")
                    cloudScore.push(4);
                else
                    cloudScore.push(7);
                break;

            case 11:
                if (responseData[i] == "Yes")
                    cloudScore.push(6);
                else
                    cloudScore.push(4);
                break;

            case 12:
                if (responseData[i] == "Yes")
                    cloudScore.push(3);
                else
                    cloudScore.push(8);
                break;

            case 13:
                if (responseData[i] == "Yes")
                    cloudScore.push(4);
                else
                    cloudScore.push(10);
                break;

            case 14:
            case 15:
                if (responseData[i] == "Yes")
                    cloudScore.push(10);
                else
                    cloudScore.push(5);
                break;
        }
    }
    return cloudScore;
}

function getOnPremScore(responseData, cloudScore) {
    var onPremScore = [];
    for (var i = 0; i < responseData.length; i++) {
        switch (i) {
            case 0:
                if (responseData[i] == "Production")
                    onPremScore.push(10);
                else
                    onPremScore.push(3);
                break;

            case 1:
            case 6:
                onPremScore.push(10 - cloudScore[i]);
                break;

            case 2:
                if (responseData[i] == "Production")
                    onPremScore.push(10);
                else
                    onPremScore.push(5);
                break;

            case 3:
            case 7:
                onPremScore.push(10);
                break;

            case 4:
                if (responseData[i] == "Only over corporate network")
                    onPremScore.push(10);
                else if (responseData[i] == "Mostly over corporate network")
                    onPremScore.push(8);
                else if (responseData[i] == "Equally over corporate network and internet")
                    onPremScore.push(6);
                else if (responseData[i] == "Mostly over internet")
                    onPremScore.push(5);
                else
                    onPremScore.push(4);
                break;

            case 5:
                if (responseData[i] == "Yes")
                    onPremScore.push(7);
                else
                    onPremScore.push(10);
                break;

            case 8:
            case 16:
            case 17:
                if (responseData[i] == "Yes")
                    onPremScore.push(10);
                else
                    onPremScore.push(5);
                break;

            case 9:
                if (responseData[i] == "Yes")
                    onPremScore.push(4);
                else
                    onPremScore.push(8);
                break;

            case 10:
                if (responseData[i] == "Yes")
                    onPremScore.push(7);
                else
                    onPremScore.push(4);
                break;

            case 11:
                if (responseData[i] == "Yes")
                    onPremScore.push(4);
                else
                    onPremScore.push(6);
                break;

            case 12:
                onPremScore.push(8)
                break;

            case 13:
                if (responseData[i] == "Yes")
                    onPremScore.push(10);
                else
                    onPremScore.push(4);
                break;

            case 14:
            case 15:
                if (responseData[i] == "Yes")
                    onPremScore.push(5);
                else
                    onPremScore.push(10);
                break;
        }
    }
    return onPremScore;
}

function getActualScore(actualWeight, score) {
    actualScore = [];
    for (var i = 0; i < score.length; i++) {
        actualScore.push(actualWeight[i] * score[i]);
    }
    return actualScore;
}

function getTotalScore(actualWeight, actualScore) {
    var totalWeight = 0;
    var totalScore = 0;
    for (var i = 0; i < actualScore.length; i++) {
        totalWeight = totalWeight + actualWeight[i];
        totalScore = totalScore + actualScore[i];
    }
    var totalActualScore = totalScore * 10 / totalWeight;
    return totalActualScore;
}

function getFinalCloudScore(jsonData) {
    // Get the response data from the survey
    var responseData = getSurveyData(JSON.parse(jsonData), 'response');
    // Get the applicable data from the survey
    var applicableData = getSurveyData(JSON.parse(jsonData), 'applicable');
    // Get static weight values
    var weight = [20, 10, 10, 20, 10, 10, 25, 15, 10, 10, 10, 10, 15, 15, 20, 15, 10, 20];
    //Get actual weight values based on applicable data
    var actualWeight = getActualWeight(weight, applicableData);
    //Get cloud score per question
    var cloudScore = getCloudScore(responseData);
    //Get actual cloud score question
    var actuaCloudScore = getActualScore(actualWeight, cloudScore);
    //Get total cloud score
    var totalCloudScore = getTotalScore(actualWeight, actuaCloudScore);
    return totalCloudScore;
}

function getFinalOnPremScore(jsonData) {
    // Get the response data from the survey
    var responseData = getSurveyData(JSON.parse(jsonData), 'response');
    // Get the applicable data from the survey
    var applicableData = getSurveyData(JSON.parse(jsonData), 'applicable');
    // Get static weight values
    var weight = [20, 10, 10, 20, 10, 10, 25, 15, 10, 10, 10, 10, 15, 15, 20, 15, 10, 20];
    //Get actual weight values based on applicable data
    var actualWeight = getActualWeight(weight, applicableData);
    //Get cloud score per question
    var cloudScore = getCloudScore(responseData);
    //Get onprem score per question
    var onPremScore = getOnPremScore(responseData, cloudScore);
    //Get actual onprem score per question
    var actualOnPremScore = getActualScore(actualWeight, onPremScore);
    //Get total onprem score
    var totalOnPremScore = getTotalScore(actualWeight, actualOnPremScore);
    return totalOnPremScore;
}

module.exports = {
    getFinalOnPremScore,
    getFinalCloudScore
};
