let playerName = '';
let score = 0;
let currentScenarioIndex = 0;
let timeRemaining = 60; // 60 seconds
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
        text: "The deer lets you pet it and leads you to a hidden treasure. You gain 10 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 7 }
        ]
    },
    {
        text: "You realize the forest is dangerous and you need to find a way out. You gain 5 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 7 }
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
        text: "You safely walk around the cave and discover a path leading out of the forest. You gain 5 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 7 }
        ]
    },
    {
        text: "You escape the dragon unnoticed and find your way back to safety. You gain 10 points!",
        choices: [
            { text: "End adventure", nextScenario: null }
        ]
    },
    {
        text: "The dragon wakes up and roars! You barely escape with your life. You gain 5 points!",
        choices: [
            { text: "End adventure", nextScenario: null }
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
            { text: "Investigate the sound", nextScenario: 10 },
            { text: "Ignore it and keep walking", nextScenario: 11 }
        ]
    },
    {
        text: "You discover a hidden village inhabited by friendly creatures. Do you stay and explore or continue your journey?",
        choices: [
            { text: "Stay and explore", nextScenario: 12 },
            { text: "Continue your journey", nextScenario: 13 }
        ]
    },
    {
        text: "You find a magical pond that grants wishes. Do you make a wish or leave the pond untouched?",
        choices: [
            { text: "Make a wish", nextScenario: 14 },
            { text: "Leave it untouched", nextScenario: 15 }
        ]
    },
    {
        text: "As you walk deeper into the forest, you come across a wise old owl. Do you ask for advice or ignore it?",
        choices: [
            { text: "Ask for advice", nextScenario: 16 },
            { text: "Ignore it", nextScenario: 17 }
        ]
    },
    {
        text: "You stumble upon a group of adventurers preparing for an expedition. Do you join them or continue alone?",
        choices: [
            { text: "Join the adventurers", nextScenario: 18 },
            { text: "Continue alone", nextScenario: 19 }
        ]
    },
    {
        text: "While crossing a bridge, you encounter a troll demanding a riddle. Do you try to answer the riddle or attempt to cross the bridge anyway?",
        choices: [
            { text: "Answer the riddle", nextScenario: 20 },
            { text: "Cross the bridge anyway", nextScenario: 21 }
        ]
    },
    {
        text: "You find an ancient book on the ground. Do you read it or leave it behind?",
        choices: [
            { text: "Read the book", nextScenario: 22 },
            { text: "Leave it behind", nextScenario: 23 }
        ]
    },
    {
        text: "You encounter a river blocking your path. Do you build a raft to cross it or look for a bridge?",
        choices: [
            { text: "Build a raft", nextScenario: 24 },
            { text: "Look for a bridge", nextScenario: 25 }
        ]
    },
    {
        text: "You find a lost puppy in the forest. Do you take it with you or leave it behind?",
        choices: [
            { text: "Take the puppy", nextScenario: 26 },
            { text: "Leave it behind", nextScenario: 27 }
        ]
    },
    {
        text: "You come across a treasure chest guarded by a fierce beast. Do you fight the beast or try to sneak past it?",
        choices: [
            { text: "Fight the beast", nextScenario: 28 },
            { text: "Sneak past it", nextScenario: 29 }
        ]
    },
    
    {
        text: "You investigate the sound and discover a hidden path leading to more adventures. Do you follow the path or go back?",
        choices: [
            { text: "Follow the path", nextScenario: 30 },
            { text: "Go back", nextScenario: 31 }
        ]
    },
    {
        text: "You continue walking and find a clearing with a beautiful view. Do you take a moment to enjoy it or keep moving?",
        choices: [
            { text: "Enjoy the view", nextScenario: 32 },
            { text: "Keep moving", nextScenario: 33 }
        ]
    },
    {
        text: "You decide to stay and explore the village. You learn about their secrets and gain 15 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 34 }
        ]
    },
    {
        text: "You continue your journey and find a magical creature that offers to guide you. Do you accept the help or decline?",
        choices: [
            { text: "Accept the help", nextScenario: 35 },
            { text: "Decline", nextScenario: 36 }
        ]
    },
    {
        text: "You make a wish for adventure and find yourself in a new realm! Congratulations, you win!",
        choices: [
            { text: "End adventure", nextScenario: null }
        ]
    },
    {
        text: "You leave the pond untouched, and a magical mist surrounds you, granting you insight. You gain 10 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 37 }
        ]
    },
    {
        text: "You ask the owl for advice and gain wisdom that helps you navigate the forest. You gain 5 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 38 }
        ]
    },
    {
        text: "You ignore the owl and wander aimlessly, losing time. You gain no points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 39 }
        ]
    },
    {
        text: "You join the adventurers and embark on a quest together. You gain 20 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 40 }
        ]
    },
    {
        text: "You continue alone and face challenges without allies. You gain 5 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 41 }
        ]
    },
    {
        text: "You answer the riddle correctly and the troll lets you pass, rewarding you with 10 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 42 }
        ]
    },
    {
        text: "You try to cross the bridge and the troll blocks your way, forcing you to find another route.",
        choices: [
            { text: "Continue the adventure", nextScenario: 43 }
        ]
    },
    {
        text: "You read the ancient book and discover powerful spells! You gain 15 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 44 }
        ]
    },
    {
        text: "You leave the book behind, but it whispers secrets to you as you walk away. You gain no points.",
        choices: [
            { text: "Continue the adventure", nextScenario: 45 }
        ]
    },
    {
        text: "You build a raft and manage to cross the river safely! You gain 10 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 46 }
        ]
    },
    {
        text: "You look for a bridge and discover a hidden path leading to more adventures. You gain 5 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 47 }
        ]
    },
    {
        text: "You take the puppy and it becomes your loyal companion, helping you through challenges! You gain 10 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 48 }
        ]
    },
    {
        text: "You leave the puppy behind, feeling a sense of loss. You gain no points.",
        choices: [
            { text: "Continue the adventure", nextScenario: 49 }
        ]
    },
    {
        text: "You fight the beast bravely and claim the treasure! You gain 20 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 50 }
        ]
    },
    {
        text: "You sneak past the beast and find a secret passage leading out of the forest. You gain 15 points!",
        choices: [
            { text: "Continue the adventure", nextScenario: 51 }
        ]
    }
];


// Event listeners for starting the game and saving scores
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('save-score').addEventListener('click', saveScore);

// Start the game
// Start the game
async function startGame() {
    playerName = document.getElementById('player-name').value;
    
    if (playerName) {
        // Store player name in localStorage
        localStorage.setItem('playerName', playerName);  // Save player name to localStorage
        
        // Hide player info input and show scoreboard
        document.getElementById('player-info').classList.add('hidden');
        document.getElementById('scoreboard').classList.remove('hidden');
        
        // Initialize score and scenario index
        score = 0;
        currentScenarioIndex = 0; 
        document.getElementById('score').textContent = score; // Initialize score display
        
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
        score += 5; // Example: Each choice gives 5 points
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
        
        // Redirect after a short delay (e.g., 3 seconds)
        setTimeout(() => {
            window.location.href = "banana.html"; // Change to your actual HTML file
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
