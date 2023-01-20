<?php
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

/*
 * Bei aufruf werden alle Personen gesendet (für dropdown)
 * PersonenIDs und Eintrag empfangen
 * Eintrag hinzufügen
 * EintragID auslesen und mit allen PersonenIDs in hatEintrag einfügen;
*/

//Personen senden
$result = $db->query("Select * from Person");
if($result->num_rows > 0){
    $personen = array();
    $i=0;
    while($row = $result->fetch_assoc()){
        $person = new Person($row['IDP'], $row['vorname'], $row['nachname']);
        $personen[$i] = $person;
        $i++;
    }
    echo json_encode($personen);
}
?>
<?php
