<?php


include 'config.php';
//parts of the code taken from Coding Forums url: https://www.thecodingforums.com/threads/how-to-login-using-pdo.973146/
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        header("Location: game.php");
        exit();
    }
    else {
        echo "Invalid username or password.";
    }
}
?>
