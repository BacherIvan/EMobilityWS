<?php
    class Eintrag{
        public $startzeit;
        public $endzeit;
        public $eintrag;
        public $vorname;
        public $nachname;

        public function __construct(){}
    }

    $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Tagebuch');

    if ($db->connect_errno) {
        die('Sorry - gerade gibt es ein Problem');
    }

    $result = $db->query('Select * from Eintrag natural join hatEintrag natural join Person where Eintrag.startzeit=' . $_GET['date'] .';');
    $eintrag = new Eintrag();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
            $eintrag->startzeit = $row['startzeit'];
            $eintrag->endzeit = $row['endzeit'];
            $eintrag->eintrag = $row['eintrag'];
            $eintrag->vorname = $row['vorname'];
            $eintrag->nachname = $row['nachname'];
            echo json_encode(get_object_vars($eintrag));
        }
    }else{
        return 1;
    }

    $result->free();
    $db->close();
?>
