<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>The Banana Game</title>
 <style>
    body {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center items horizontally */
        justify-content: center; /* Center items vertically */
        height: 100vh; /* Make body full height of the viewport */
        margin: 0; 
        background-image: url('banana_img.png'); 
        background-size: cover; 
        background-position: center; 
        background-repeat: no-repeat; 
    
    }
    #game-container {
        background: #a8c17a;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        max-width: 600px;
        margin: auto;
        width: 90%;
        top:10%;
        position: relative; 
        transform: translateY(-50%); 
        text-align: center; 
    }
    #quest {
        display: block; 
        margin: 0 auto; /* Center the image horizontally */
        max-width: 100%; /* Ensure image fits within the screen */
        height: auto; /* Maintain aspect ratio */
    }
    .button-62 {
        padding: 5px; 
        border: none; 
        border-radius: 5px; 
        background-color: #5c7f2b; 
        color: white; 
        font-size: 16px; 
    }
    h2 {
        text-align: center; 
    }
    #exit-button {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 100px;
            height: 40px;
            font-size: 14px;
            font-weight: bold;
            color: white;
            background-color: #dc3545; /* Vibrant red */
            border: none;
            border-radius: 12px; /* Rounded corners */
            cursor: pointer;
            box-shadow: 0 5px #a71d2a; /* Shadow for depth */
            transition: all 0.2s ease; /* Smooth hover transition */
            text-align: center;
            line-height: 40px; /* Vertically center the text */
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        #exit-button:hover {
            background-color: #c82333; /* Darker red on hover */
            transform: translateY(-3px); /* Lift button on hover */
        }

        #exit-button:active {
            background-color: #a71d2a; /* Even darker red on click */
            box-shadow: 0 2px #a71d2a; /* Smaller shadow when pressed */
            transform: translateY(2px); /* Button press effect */
        }
</style>
    <script>
        var quest = "";
        var solution = -1;
        var score = 0;
        let timeRemaining = 60; 
        let timerInterval;
        let timerHasStarted = false;

        let newgame = function(x) {
            let inp = document.getElementById("input");
            inp.disabled = false;
            startup();
        }
        let handleInput = function(x) {

            let inp = document.getElementById("input");
            var note = document.getElementById("note");
            var scoreDisplay = document.getElementById("score"); 
            if (inp.value == solution) {
                score++;
                note.innerHTML = 'Correct! -  <button class="button-62" onClick="newgame()" >New game?</button>';
                scoreDisplay.innerHTML = "Score: " + score;
                inp.value = ""; 
                inp.disabled = true;
            } else {
                note.innerHTML = "Not Correct!";
            }
        }

        let saveScore = function() {
           let savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
           savedScores.push(score); // Add current score to saved scores
           localStorage.setItem("savedScores", JSON.stringify(savedScores)); // Save to local storage
           window.location.href = 'results.php';
        }

        let startCountdown = function() {
            if (!timerHasStarted) {
                let endTime = new Date().getTime() + timeRemaining * 1000;

                timerInterval = setInterval(() => {
                    let now = new Date().getTime();
                    let remainingTime = Math.ceil((endTime - now) / 1000);

                    if (remainingTime <= 0) {
                        clearInterval(timerInterval);
                        document.getElementById('timer').textContent = "Time's up!";
                        alert("Time's up! Your final score is: " + score);
                        endGame(); 
                    } else {
                        document.getElementById('time').textContent = remainingTime;
                    }
                }, 1000);

                timerHasStarted = true; // Ensure timer is only started once
            }
        }

        let startQuest = function(data) {
            var parsed = JSON.parse(data);
            quest = parsed.question;
            solution = parsed.solution;
            let img = document.getElementById("quest");
            img.src = quest;
            let note = document.getElementById("note");
            note.innerHTML = "Start Your New Challenge !";
        }

        let fetchText = async function() {
            let response = await fetch('https://marcconrad.com/uob/banana/api.php');
            let data = await response.text();
            startQuest(data);
        }

        let startup = function() {
            fetchText();
            
        }
        window.onload = function() {
            startup(); // Start the first puzzle
            startCountdown(); // Start the countdown once
        }
        let exitGame = function() {
        window.location.href = 'game.php'; 
        }
    </script>

</head>
<body>
    <script>
        startup();
    </script>
   
    <img id="quest" />
    <div id="game-container">
    <h2 class="h2-62" id="note">[Wait for first game]</h2>
    <button id="exit-button"  onclick="exitGame()">Quit</button>
    <div id="timer">Time Remaining: <span id="time">60</span> seconds</div>


    <h2>Enter the missing digit: <input class="button-62" id="input" onchange="handleInput()" type="number" step="1" min="0" max="9"></h2>
    <h2 id="score">Score: 0</h2>
    <button class="button-62" onclick="saveScore()">Save Score</button>
    </div>
</body>
</html>