<?php
    //Check Permission
    require("checkLogin.php");
    if((checkLogin($_COOKIE['uname'], $_COOKIE['pwd']))!= 0) {
        die("Keine Berechtigung");
    }

    $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Tagebuch');

    if ($db->connect_errno) {
        die('Sorry - gerade gibt es ein Problem');
    }

    /*
     * Bei aufruf werden alle Personen gesendet (für dropdown)
     * PersonenIDs und Eintrag empfangen
     * Eintrag hinzufügen
     * EintragID auslesen und mit allen PersonenIDs in hatEintrag einfügen;
    */

    //eintrag einfügen
    $stmt = $db->prepare("Insert into Eintrag values(null, ?, ?, ?, ?)");
    $stmt->bind_param("ssss", $_GET['datum'], $_GET['startzeit'], $_GET['entzeit'], $_GET['eintrag']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        $ide = $db->query("SELECT MAX(IDE) FROM Eintrag");
        foreach ($_GET['persons'] as $p){
            $stmt = $db->prepare("Insert into hatEintrag values(?, ?)");
            $stmt-> bind_param("ii", $p, $ide);
            $stmt->execute();
        }

    }else{
        echo 1;
    }

    $result->free();
    $db->close();
?>
