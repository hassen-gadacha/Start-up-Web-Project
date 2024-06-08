<?php
// Récupérer les valeurs du formulaire
$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$phoneNumber = $_POST['phone-number'];
$email = $_POST['email'];
$address = $_POST['address'];
$gender = $_POST['gender'];
$vipLevel = $_POST['vip-level'];

// Vérifier si les champs obligatoires sont remplis
if (empty($firstName) || empty($lastName) || empty($email) || empty($vipLevel)) {
    echo "Veuillez remplir tous les champs obligatoires.";
    exit;
}

// Connexion à la base de données MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "users";

try {
    // Créer une connexion PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    // Configurer le mode d'erreur PDO sur Exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Créer la table VIPMembers si elle n'existe pas déjà
    $sqlCreateTable = "CREATE TABLE IF NOT EXISTS VIPMembers (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        phone_number VARCHAR(20),
        email VARCHAR(100) NOT NULL,
        address VARCHAR(200),
        gender ENUM('homme', 'femme'),
        vip_level VARCHAR(20) NOT NULL
    )";
    $conn->exec($sqlCreateTable);

    // Vérifier si l'email est déjà utilisé
    $stmt = $conn->prepare("SELECT * FROM VIPMembers WHERE email=:email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "L'adresse email est déjà utilisée. Veuillez utiliser une adresse email différente.";
        header("location: ../vip-registration.html");
        exit;
    }

    // Insérer les données dans la table VIPMembers
    $stmt = $conn->prepare("INSERT INTO VIPMembers (first_name, last_name, phone_number, email, address, gender, vip_level) 
        VALUES (:firstName, :lastName, :phoneNumber, :email, :address, :gender, :vipLevel)");
    $stmt->bindParam(':firstName', $firstName);
    $stmt->bindParam(':lastName', $lastName);
    $stmt->bindParam(':phoneNumber', $phoneNumber);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':vipLevel', $vipLevel);
    $stmt->execute();

    echo "Le formulaire a été soumis avec succès. Vous êtes maintenant un membre VIP.";
    header("location: ../index.html");
    exit;
} catch (PDOException $e) {
    // Afficher un message d'erreur
    echo "Une erreur s'est produite lors de la soumission du formulaire: " . $e->getMessage();
}

$conn = null;
?>
