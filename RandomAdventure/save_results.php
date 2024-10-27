<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(['message' => 'User not logged in.']);
    exit();
}

// Database connection
$host = 'localhost';
$db = 'game_db';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    http_response_code(500); // Internal server error
    echo json_encode(['message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if combinedScore is set and is an integer
if (isset($data['combinedScore']) && is_int($data['combinedScore'])) {
    $combinedScore = (int)$data['combinedScore']; // Ensure it's treated as an integer
    $userId = $_SESSION['user_id']; 

    // Update the score in the database
    $stmt = $conn->prepare("UPDATE users SET scores = ? WHERE id = ?");
    $stmt->bind_param("ii", $combinedScore, $userId); // "ii" for two integers

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Score updated successfully.']);
    } else {
        echo json_encode(['message' => 'Failed to update score: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['message' => 'Invalid combined score provided.']);
}

$conn->close();
