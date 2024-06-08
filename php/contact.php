<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les valeurs saisies dans le formulaire
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
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
    $sql_create_table = "CREATE TABLE IF NOT EXISTS contact (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        phone INT(8) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subjects VARCHAR(50) NOT NULL,
        messages VARCHAR(500) NOT NULL
    )";
    $conn->exec($sql_create_table);
    echo "La table 'contact' a été créée avec succès ou elle existe déjà.<br><br>";

    // Préparer la requête d'insertion
    $sql = "INSERT INTO contact (username, phone, email, subjects, messages) VALUES (:username, :phone, :email, :subjects, :messages)";
    $stmt = $conn->prepare($sql);

    // Binder les valeurs aux paramètres de la requête
    $stmt->bindParam(':username', $name);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':subjects', $subject);
    $stmt->bindParam(':messages', $message);

    // Exécuter la requête d'insertion
    $stmt->execute();

    // Démarrer une session et stocker les informations de l'utilisateur
    session_start();
    $_SESSION['email'] = $email;

    // Rediriger l'utilisateur vers la page d'accueil
    header("Location: ../index.html");
    exit();
} catch(PDOException $e) {
    // Afficher un message d'erreur et rediriger l'utilisateur vers la page d'accueil
    echo "Erreur lors de la connexion à la base de données: " . $e->getMessage();
    header("Location: ../index.html");
    exit();
}

$conn = null;
?>