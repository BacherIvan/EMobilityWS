<?php
    class Eintrag{
        public $startzeit;
        public $entzeit;
        public $eintrag;
        public $vorname;
        public $nachname;

        public function __construct($startzeit, $endzeit, $vorname, $nachname, $eintrag){
            $this->startzeit = $startzeit;
            $this->entzeit = $endzeit;
            $this->vorname = $vorname;
            $this->nachname = $nachname;
            $this->eintrag = $eintrag;
        }
    }

    $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Tagebuch');

    if ($db->connect_errno) {
        die('Sorry - gerade gibt es ein Problem');
    }
    $stmt = $db->prepare("Select * from Eintrag natural join hatEintrag natural join Person where datum=?");
    $stmt->bind_param("s", $_GET['datum']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $eintrage = array();
        $i=0;
        while($row = $result->fetch_assoc()){
            $eintrag = new Eintrag($row['startzeit'], $row['endzeit'], $row['vorname'], $row['nachname'], $row['eintrag']);
            $eintrage[$i] = $eintrag;
            $i++;
        }
        echo json_encode($eintrage);
    }else{
        echo json_encode("Fehler");
    }

    $result->free();
    $db->close();
?>
