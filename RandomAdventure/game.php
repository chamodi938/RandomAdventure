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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Adventure Game</title>
    <link rel="stylesheet" href="styles.css"> 
</head>
<body>
    <div id="game-container">
        <h1>Welcome to Random Adventure!</h1>
        
        <div id="player-info">
            <input type="text" id="player-name" placeholder="Enter your name">
            <button id="start-game">Start Game</button>
        </div>
      
        <div id="scoreboard" class="hidden">
            <button id="exit-button"  onclick="exitGame()">Quit</button>
            <div id="timer">Time Remaining: <span id="time">60</span> seconds</div>
            <p>Score: <span id="score">0</span></p>
            <button id="save-score">Save Score</button>
        </div>
        <div id="message" ></div>
        
        <div id="scenario" class="hidden"></div>
        
        <div id="choices" class="hidden"></div>
        
        <div id="leaderboard" class="hidden">
            <h2>Leaderboard</h2>
            <div id="leaderboard-list"></div>
        </div>
    
        <script src="game.js"></script>
    
</body>
</html>
