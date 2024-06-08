<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les valeurs saisies dans le formulaire
    $username = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];
}

// Informations de connexion à la base de données
$servername = "localhost";  // Remplacez par le nom de votre serveur MySQL
$usernameDB = "root";  // Remplacez par votre nom d'utilisateur MySQL
$passwordDB = "";  // Remplacez par votre mot de passe MySQL
$database = "users";  // Remplacez par le nom de votre base de données MySQL

try {
    // Créer une connexion PDO
    $conn = new PDO("mysql:host=$servername;dbname=$database", $usernameDB, $passwordDB);

    // Configurer le mode d'erreur PDO sur Exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Créer la table si elle n'existe pas déjà
    $sql_create_table = "CREATE TABLE IF NOT EXISTS users (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(50) NOT NULL
    )";
    $conn->exec($sql_create_table);
    echo "La table 'users' a été créée avec succès ou elle existe déjà.<br><br>";

    // Vérifier si l'email est déjà utilisé
    $stmt = $conn->prepare("SELECT * FROM users WHERE email=:email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "L'adresse email est déjà utilisée. Veuillez utiliser une adresse email différente.";
        header("Location: ../index.html");
    } else {
        // Insérer les données dans la table users
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        // Démarrer une session et stocker les informations de l'utilisateur
        session_start();
        $_SESSION['email'] = $email;
        header("Location: ../index.html");
        exit();
    }
} catch (PDOException $e) {
    // Afficher un message d'erreur
    echo "Erreur lors de la connexion à la base de données: " . $e->getMessage();
}

$conn = null;
?>
