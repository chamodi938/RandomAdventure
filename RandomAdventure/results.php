<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // If not logged in, redirect to the login page
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Final Results</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-image: url('img.jpg'); 
            background-size: cover; 
            background-position: center; 
            background-repeat: no-repeat;
        }
        h2 {
            color: #333;
            font-family: Arial, sans-serif;
        }
        #game-container {
            background: #a8c17a;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            max-width: 800px;
            margin: auto;
            width: 90%;
            top:10%;
            position: relative; 
            transform: translateY(-50%); 
            text-align: center; 
        }
        .button-back {
            margin: 10px;
            padding: 15px 30px;
            font-size: 18px;
            font-weight: bold;
            color: white;
            background-color: #28a745; /* Vibrant green */
            border: none;
            border-radius: 10px; /* Rounded corners */
            cursor: pointer;
            box-shadow: 0 5px #1c7430; /* Shadow to make it pop */
            transition: all 0.2s ease;
        }
        .button-back:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div id="game-container">
    <h2 id="resultDisplay"></h2>
    <button class="button-back" onclick="window.location.href='game.php'">Back to Game</button>
    </div>

    <script>
        // Function to calculate and display final results
        let showFinalResults = async function() { 
            // Retrieve player name and main game score
            const playerName = localStorage.getItem('playerName'); 
            const scores = JSON.parse(localStorage.getItem('scores')) || [];
            const mainGameEntry = scores.find(entry => entry.name === playerName);

            // Retrieve the banana game score
            const bananaGameScores = JSON.parse(localStorage.getItem('savedScores')) || [];
            const bananaGameScore = bananaGameScores.length > 0 ? bananaGameScores[bananaGameScores.length - 1] : 0;

            // Calculate combined score
            let combinedScore = 0;
            if (mainGameEntry) {
                combinedScore = mainGameEntry.mainGameScore + bananaGameScore; 
            }

            // Display the result
            let resultDisplay = document.getElementById('resultDisplay');
            if (mainGameEntry) {
                resultDisplay.innerHTML = `Congratulations, ${playerName}! Your combined score is: ${combinedScore}`;

                //To write parts of below code snippet used stack overflow url: https://stackoverflow.com/questions/39565706/post-request-with-fetch-api
                // Send combined score to save_results.php
                try {
                    const response = await fetch('save_results.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ combinedScore: combinedScore })
                    });

                    // Handle response from save_results.php
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const result = await response.json();
                    console.log(result.message); // Handle success or error message
                } catch (error) {
                    console.error('Error saving results:', error);
                }
            } else {
                resultDisplay.innerHTML = 'Player not found or scores not available.';
            }
        }

        // Call showFinalResults when the page loads
        window.onload = showFinalResults;
    </script>
</body>
</html>
