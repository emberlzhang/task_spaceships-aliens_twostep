"use strict";
var round = 1;
var totalRounds = 10;
var results = [];
var points = 0;
var rewardA = [1, 2]; // Rewards for choosing Option X in different worlds (80% and 20%)
var rewardB = [3, 4]; // Rewards for choosing Option Y in different worlds (80% and 20%)
function chooseOption() {
    var outcome = '';
    var reward = 0;
    if (round % 2 === 1) { // Stage 1: Choosing between Option A and Option B
        if (option === 'A') {
            outcome = Math.random() < 0.8 ? 'A' : 'B';
        }
        else {
            outcome = Math.random() < 0.8 ? 'B' : 'A';
        }
        document.getElementById('stage').innerText = "Stage 2: Choose between these two options";
        // Displaying images for stage 2
        if (outcome === 'A') {
            // document.getElementById('task').innerHTML = `
            // <img src="optionX.jpg" alt="Option X" onclick="chooseOption('X')" style="cursor: pointer;">
            // <img src="optionY.jpg" alt="Option Y" onclick="chooseOption('Y')" style="cursor: pointer;">
            // `;    
            document.getElementById('task').innerHTML = "\n            <div class=\"option\" style=\"background-color: orange\" onclick=\"chooseOption('X')\"></div>\n            <div class=\"option\" style=\"background-color: yellow\" onclick=\"chooseOption('Y')\"></div>\n            ";
        }
        else {
            // document.getElementById('task').innerHTML = `
            // <img src="optionX.jpg" alt="Option Z" onclick="chooseOption('Z')" style="cursor: pointer;">
            // <img src="optionY.jpg" alt="Option W" onclick="chooseOption('W')" style="cursor: pointer;">
            // `;
            document.getElementById('task').innerHTML = "\n            <div class=\"option\" style=\"background-color: purple\" onclick=\"chooseOption('Z')\"></div>\n            <div class=\"option\" style=\"background-color: blue\" onclick=\"chooseOption('W')\"></div>\n            ";
        }
    }
    else { // Stage 2: Choosing between Option X, Y, Z, or W
        console.log("option: " + option);
        switch (option) {
            case 'X':
                outcome = Math.random() < 0.7 ? 'X' : 'Y';
                reward = (outcome === 'X') ? rewardA[0] : rewardA[1];
                break;
            case 'Y':
                outcome = Math.random() < 0.7 ? 'Y' : 'X';
                reward = (outcome === 'X') ? rewardA[0] : rewardA[1];
                break;
            case 'Z':
                outcome = Math.random() < 0.7 ? 'Z' : 'W';
                reward = (outcome === 'Z') ? rewardB[0] : rewardB[1];
                break;
            case 'W':
                outcome = Math.random() < 0.7 ? 'W' : 'Z';
                reward = (outcome === 'Z') ? rewardB[0] : rewardB[1];
                break;
        }
        document.getElementById('stage').innerText = "Stage 1: Choose between these two options";
        // document.getElementById('task').innerHTML = `
        // <img src="optionA.jpg" alt="Option A" onclick="chooseOption('A')" style="cursor: pointer;">
        // <img src="optionB.jpg" alt="Option B" onclick="chooseOption('B')" style="cursor: pointer;">
        // `;
        document.getElementById('task').innerHTML = "\n        <div class=\"option\" style=\"background-color: #ff0000\" onclick=\"chooseOption('A')\"></div>\n        <div class=\"option\" style=\"background-color: #00ff00\" onclick=\"chooseOption('B')\"></div>\n        ";
        points += reward;
        document.getElementById('pointCounter').innerText = points;
    }
    document.getElementById('result').innerText = "You chose ".concat(option, ". Outcome: ").concat(outcome, ". Reward: ").concat(reward);
    //document.getElementById('result').innerText = `You won a reward: ${reward}`; // this needs to be removed
    results.push({ round: round, choice: option, outcome: outcome, reward: reward });
    round++;
    document.getElementById('roundNumber').innerText = round;
    if (round > totalRounds) {
        // End of the task, save results to CSV
        saveResultsToCSV(results);
        // this resets the round and points but not reflected in the display until 1-2 rounds later
        round = 1;
        results = [];
        points = 0;
        alert("Task completed! Thank you for participating.");
    }
}
function saveResultsToCSV(results) {
    var subjectId = getParameterByName('subject_id') || 'UnknownSubject';
    var timestamp = new Date().toISOString().replace(/:/g, '-');
    var filename = "data/two_step_task_results_".concat(subjectId, "_").concat(timestamp, ".csv");
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Round,Choice,Outcome,Reward\n";
    results.forEach(function (result) {
        var row = result.round + "," + result.choice + "," + result.outcome + "," + result.reward + "\n";
        csvContent += row;
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}
// Function to get URL parameter by name
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
