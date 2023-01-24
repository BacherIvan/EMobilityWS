<?php
    //Check Permission
    require("checkLogin.php");
    if((checkLogin($_COOKIE['uname'], $_COOKIE['pwd']))!= 0) {
        die("Keine Berechtigung");
    }

    class _Person {
        public $IDP;
        public $vorname;
        public $nachname;

        public function __construct($IDP, $vorname, $nachname){
            $this->IDP = $IDP;
            $this->vorname = $vorname;
            $this->nachname = $nachname;
        }
    }

    $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Tagebuch');

    if ($db->connect_errno) {
        die('Sorry - gerade gibt es ein Problem');
    }

    //Personen senden
    $result = $db->query("Select * from Person");
    if($result->num_rows > 0){
        $personen = array();
        $i=0;
        while($row = $result->fetch_assoc()){
            $person = new _Person($row['IDP'], $row['vorname'], $row['nachname']);
            $personen[$i] = $person;
            $i++;
        }
        echo json_encode($personen);
    } else{
        echo "Fehler";
    }
?>

