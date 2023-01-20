<?php
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
    $id = $db->query("SELECT MAX(IDE) FROM Eintrag");
    $stmt = $db->prepare("Insert into Eintrag values(null, ?, ?, ?, ?)");
    $stmt->bind_param("ssss", $_GET['datum'], $_GET['startzeit'], $_GET['entzeit'], $_GET['eintrag']);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result) {
        echo 0;
    }else{
        echo 1;
    }

    $result->free();
    $db->close();
?>
