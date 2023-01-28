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

    // Datum senden
    $result = $db->query("Select distinct datum from Eintrag");
    if($result->num_rows > 0){
        $dates = array();
        $i = 0;
        while($row = $result->fetch_assoc()){
            $dates[$i] = $row;
            $i++;
        }
        echo json_encode($dates);
    } else{
        echo "Fehler";
    }
    $result->free();
    $db->close();
?>

