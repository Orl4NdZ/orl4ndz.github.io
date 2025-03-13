<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST["first-name"]);
    $lastName = htmlspecialchars($_POST["last-name"]);
    $email = htmlspecialchars($_POST["email"]);
    $password = $_POST["new-password"]; // NON SICURA, dovrà essere criptata
    $accountType = isset($_POST["account-type"]) ? $_POST["account-type"] : "N/A";
    $age = isset($_POST["age"]) ? (int)$_POST["age"] : 0;
    $referrer = $_POST["referrer"] ?? "Non specificato";
    $bio = htmlspecialchars($_POST["bio"] ?? "");
    $termsAccepted = isset($_POST["terms-and-conditions"]);

    // Validazione semplice
    if (!$termsAccepted) {
        echo "Devi accettare i termini e condizioni.";
        exit;
    }

    // Salva i dati (solo esempio, andrebbe in un database)
    echo "<h2>Registrazione completata con successo!</h2>";
    echo "<p>Nome: $firstName $lastName</p>";
    echo "<p>Email: $email</p>";
    echo "<p>Tipo di account: $accountType</p>";
    echo "<p>Età: $age</p>";
    echo "<p>Origine: $referrer</p>";
    echo "<p>Bio: $bio</p>";

    // Gestione file immagine
    if (!empty($_FILES["file"]["name"])) {
        $uploadDir = "uploads/";
        $uploadFile = $uploadDir . basename($_FILES["file"]["name"]);

        if (move_uploaded_file($_FILES["file"]["tmp_name"], $uploadFile)) {
            echo "<p>Foto profilo caricata con successo! <a href='$uploadFile'>Visualizza</a></p>";
        } else {
            echo "<p>Errore nel caricamento della foto.</p>";
        }
    }
} else {
    echo "Accesso non autorizzato!";
}
?>
