<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les valeurs saisies dans le formulaire
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

    // Vérifier les identifiants de connexion
    $stmt = $conn->prepare("SELECT * FROM users WHERE email=:email AND password=:password");
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        // Démarrer une session et stocker les informations de l'utilisateur
        session_start();
        $_SESSION['email'] = $email;

        // Rediriger l'utilisateur vers la page d'accueil
        header("Location: ../index.html");
        exit();
    } else {
        // Afficher un message d'erreur et rediriger l'utilisateur vers la page d'accueil
        echo "Adresse email ou mot de passe incorrect. Veuillez réessayer.";
        header("Location: ../index.html");
        exit();
    }
} catch (PDOException $e) {
    // Afficher un message d'erreur
    echo "Erreur lors de la connexion à la base de données: " . $e->getMessage();
}

$conn = null;
?>
