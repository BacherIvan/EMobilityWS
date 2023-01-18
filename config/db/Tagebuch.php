<?php
    $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Tagebuch');

    if ($db->connect_errno) {
        die('Sorry - gerade gibt es ein Problem');
    }

    $result = $db->query('Select * from Eintrag natural join hatEintrag natural join Person where Eintrag.startzeit=' . $_GET['date'] .';');

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
            echo $row['vorname'] .' '.  $row['nachname'] .', '. $row['startzeit'] .' - ' . $row['endzeit'] .'<br>';
            echo $row['eintrag'] . '<br><br>';
        }
    }else{
        return 1;
    }

    $result->free();
    $db->close();
?>
