let playerName = '';
let score = 0;
let currentScenarioIndex = 0;
let timeRemaining = 60; 
let timerInterval;

// Story scenarios with choices
const scenarios = [
    {
        text: "You wake up in a mysterious forest. You can see two paths ahead. Do you take the left path or the right path?",
        choices: [
            { text: "Take the left path", nextScenario: 1 },
            { text: "Take the right path", nextScenario: 2 }
        ]
    },
    {
        text: "You encounter a friendly deer. Do you try to pet it or continue walking?",
        choices: [
            { text: "Pet the deer", nextScenario: 3 },
            { text: "Continue walking", nextScenario: 4 }
        ]
    },
    {
        text: "You stumble upon a dark cave. Do you enter the cave or walk around it?",
        choices: [
            { text: "Enter the cave", nextScenario: 5 },
            { text: "Walk around it", nextScenario: 6 }
        ]
    },
    {
        text: "The deer lets you pet it and leads you to a hidden treasure. You gain points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 7 } 
        ]
    },
    {
        text: "You realize the forest is dangerous and you need to find a way out. You gain points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 10 } 
        ]
    },
    {
        text: "Inside the cave, you find a sleeping dragon. Do you sneak away or take the treasure?",
        choices: [
            { text: "Sneak away", nextScenario: 8 },
            { text: "Take the treasure", nextScenario: 9 }
        ]
    },
    {
        text: "You safely walk around the cave and discover a path leading out of the forest. You gain  points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 10 } 
        ]
    },
    {
        text: "You go into some bushes and has to find your way back to safety. You gain points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 10 } 
        ]
    },
    {
        text: "The dragon wakes up and roars! You barely escape with your life. You gain points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 10 } 
        ]
    },
    {
        text: "You collect the treasure and become rich! Congratulations, you win!",
        choices: [
            { text: "End adventure", nextScenario: null }
        ]
    },
    {
        text: "You hear a rustling sound coming from the bushes. Do you investigate the sound or ignore it?",
        choices: [
            { text: "Investigate the sound", nextScenario: 11 },
            { text: "Ignore it and keep walking", nextScenario: 12 }
        ]
    },
    {
        text: "You discover a hidden village inhabited by friendly creatures. Do you stay and explore or continue your journey?",
        choices: [
            { text: "Stay and explore", nextScenario: 13 },
            { text: "Continue your journey", nextScenario: 14 }
        ]
    },
    {
        text: "You find a magical pond that grants wishes. Do you make a wish or leave the pond untouched?",
        choices: [
            { text: "Make a wish", nextScenario: 15 },
            { text: "Leave it untouched", nextScenario: 16 }
        ]
    },
    {
        text: " Deep into the forest, you come across a wise old owl. Do you ask for advice or ignore it?",
        choices: [
            { text: "Ask for advice", nextScenario: 17 },
            { text: "Ignore it", nextScenario: 18 }
        ]
    },
    {
        text: "You stumble upon a group of adventurers preparing for an expedition. Do you join them or continue alone?",
        choices: [
            { text: "Join the adventurers", nextScenario: 19 },
            { text: "Continue alone", nextScenario: 20 }
        ]
    },
    {
        text: "Wish brings you to a bridge, you encounter a troll demanding a riddle. Do you try to answer the riddle or attempt to cross the bridge anyway?",
        choices: [
            { text: "Answer the riddle", nextScenario: 21 },
            { text: "Cross the bridge anyway", nextScenario: 22 }
        ]
    },
    {
        text: "You find an ancient book on the ground. Do you read it or leave it behind?",
        choices: [
            { text: "Read the book", nextScenario: 23 },
            { text: "Leave it behind", nextScenario: 24 }
        ]
    },
    {
        text: "You ask the owl for advice and gain wisdom that helps you navigate the forest.",
        choices: [
            { text: "Ask to gain wisdom", nextScenario: 25 },
            { text: "Ask for a way out", nextScenario: 26 }
        ]
    },
    {
        text: "You decided to take a rest in the forest",
        choices: [
            { text: "Look around the forest", nextScenario: 27 },
            { text: "Wait for someone to come", nextScenario: 28 }
        ]
    },
    {
        text: "You come across a treasure chest guarded by a fierce beast. Do you fight the beast or try to sneak past it?",
        choices: [
            { text: "Fight the beast", nextScenario: 29 },
            { text: "Sneak past it", nextScenario: 30 }
        ]
    },
    {
        text: "You  discover a hidden path leading to more adventures. Do you follow the path or go back?",
        choices: [
            { text: "Follow the path", nextScenario: 31 },
            { text: "Go back", nextScenario: 32 }
        ]
    },
    {
        text: "You answer the riddle correctly and the troll lets you pass. You keep moving",
        choices: [
            { text: "Keep Moving", nextScenario: 33 }
        ]
    },
    {
        text: "You find yourself in a new realm! Congratulations, you win!",
        choices: [
            { text: "End adventure", nextScenario: null }
        ]
    },
    {
        text: "You read the book and cast a magic spell to go to a new realm",
        choices: [
            { text: "End adventure", nextScenario: null }

        ]
    },
    {
        text: "You make a wish for adventure and find yourself in a new realm! Congratulations, you win!",
        choices: [
            { text: "End adventure", nextScenario: null }
        ]
    },
    {
        text: "A magical mist surrounds you, granting you insight. You gain points!",
        choices: [
            { text: "Make a wish for adventure", nextScenario: 15 } 
        ]
    },
    {
        text: "Owl advice you to find the bridge to the new realm",
        choices: [
            { text: "Make a wish for adventure", nextScenario: 15 } 
        ]
    },
    {
        text: "You wander aimlessly, losing time.",
        choices: [
            { text: "Make a wish for adventure", nextScenario: 15 } 
        ]
    },
    {
        text: "You join some adventurers and embark on a quest together. You gain points!",
        choices: [
          { text: "Make a wish for adventure", nextScenario: 15 } 
        ]
    },
    {
        text: "You face the beast without allies. You gain points!",
        choices: [
            { text: "Make a wish for adventure", nextScenario: 15 } 
        ]
    },
    {
        text: "You get tired and wish to go back home soon.",
        choices: [
            { text: "Make a wish for adventure", nextScenario: 15 } 
        ]
    },
    {
        text: "You come across an ancient temple.",
        choices: [
            { text: "Make a wish for adventure", nextScenario: 15 } 
        ]
    },
    {
        text: "You meet a fairy who grants you a wish.",
        choices: [
            { text: "Make a wish for adventure", nextScenario: 15 } 
        ]
    },
    {
        text: "You collect the treasure and become rich! Congratulations, you win!",
        choices: [
            { text: "End adventure", nextScenario: null }
        ]

    }
];

// Event listeners for starting the game and saving scores
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('save-score').addEventListener('click', saveScore);

// Start the game
async function startGame() {
    playerName = document.getElementById('player-name').value;
    
    if (playerName) {
        // Store player name in localStorage
        localStorage.setItem('playerName', playerName);  
        
        // Hide player info input and show scoreboard
        document.getElementById('player-info').classList.add('hidden');
        document.getElementById('scoreboard').classList.remove('hidden');
        
        // Initialize score and scenario index
        score = 0;
        currentScenarioIndex = 0; 
        document.getElementById('score').textContent = score; 
        
        displayScenario(); // Show the first scenario
        await startCountdown(); // Start the countdown timer
    } else {
        alert("Please enter your name");
    }
}

function endGame() {
    // Logic to end the game
    document.getElementById('scenario').textContent = "Thank you for playing! Your final score is: " + score;
    document.getElementById('choices').classList.add('hidden');
}

// Display the current scenario and choices
function displayScenario() {
    const scenario = scenarios[currentScenarioIndex];
    document.getElementById('scenario').textContent = scenario.text;
    document.getElementById('choices').innerHTML = ''; // Clear previous choices
    scenario.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice.nextScenario);
        document.getElementById('choices').appendChild(button);
    });
    document.getElementById('scenario').classList.remove('hidden');
    document.getElementById('choices').classList.remove('hidden');
}

// Handle player choices
function makeChoice(nextScenarioIndex) {
    const scenario = scenarios[currentScenarioIndex];
    // Update score based on the choice made
    if (nextScenarioIndex !== null) {
        score += 5; 
        currentScenarioIndex = nextScenarioIndex; // Move to the next scenario
        displayScenario(); // Display the next scenario
        document.getElementById('score').textContent = score; // Update displayed score
    } else {
        // End of adventure
        clearInterval(timerInterval); 
        document.getElementById('scenario').textContent = "Thank you for playing! Your final score is: " + score;
        document.getElementById('choices').classList.add('hidden');
    }
}

// Save score locally
function saveScore() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    
    // Check if player already exists and update score
    const existingPlayerIndex = scores.findIndex(entry => entry.name === playerName);
    
    if (existingPlayerIndex !== -1) {
        // Update score if player already exists
        scores[existingPlayerIndex].score = score;
        scores[existingPlayerIndex].mainGameScore = score; // Store main game score
    } else {
        // Add new player if they don't exist
        scores.push({ name: playerName, score: score, mainGameScore: score });
        localStorage.setItem('playerName', playerName); // Store the playerName in localStorage
    }

    // Save updated scores back to local storage
    localStorage.setItem('scores', JSON.stringify(scores));
    updateLeaderboard(scores); // Update the leaderboard display

    checkTopScores(scores);
}

function checkTopScores(scores) {
    // Sort scores by highest score
    scores.sort((a, b) => b.score - a.score);

    // Get the player's score
    const playerScore = scores.find(entry => entry.name === playerName).score;

    // Check if the player's score is among the top 5
    if (scores.length <= 5 || playerScore >= scores[4].score) {
        // Display message in the HTML
        document.getElementById("message").innerHTML = "You’ve unlocked a challenge! Solve the banana equations to reveal the hidden treasure!";
        
        // Redirect after a short delay 
        setTimeout(() => {
            window.location.href = "banana.html";
        }, 3000);
    }
}

// Update leaderboard display
function updateLeaderboard(scores) {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear previous leaderboard entries
    
    // Sort scores by highest score
    scores.sort((a, b) => b.score - a.score);
    
    // Display scores without duplicates
    scores.forEach(entry => {
        leaderboardList.innerHTML += `<p>${entry.name} - ${entry.score}</p>`;
    });
    
    // Show leaderboard section
    document.getElementById('leaderboard').classList.remove('hidden');
}

async function startCountdown() {
    // Fetch current time from API
    try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC');
        const data = await response.json();
        const currentTime = new Date(data.datetime);
        
        // Set end time
        const endTime = new Date(currentTime.getTime() + timeRemaining * 1000);
        
        timerInterval = setInterval(() => {
            const now = new Date();
            const remainingTime = Math.ceil((endTime - now) / 1000);

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                document.getElementById('timer').textContent = "Time's up!";
                alert("Time's up! You lost the game!");
                endGame();
            } else {
                document.getElementById('time').textContent = remainingTime;
            }
        }, 1000);
    } catch (error) {
        console.error("Error fetching time:", error);
    }
}
