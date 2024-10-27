<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Check if the username already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);

    if ($stmt->rowCount() > 0) {
        // Username already exists, redirect to register.html with an error message
        header("Location: register.html?error=username_taken");
        exit();
    } else {
        // Username is unique, proceed with registration
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        
        if ($stmt->execute([$username, $password])) {
            header("Location: login.html");
            exit();
        } else {
            echo "Error during registration.";
        }
    }
}
?>
