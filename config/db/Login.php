<?php
    if(isset($_POST['uname']) && isset($_POST['pwd'])) {
        $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Login');

        if ($db->connect_errno) {
            die('Sorry - gerade gibt es ein Problem');
        }
        $user = $_POST['uname'];
        $pwd = $_POST['pwd'];
        $result = $db->query("Select * from Admin where usr='$user");

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if($row['pwd'] == $pwd){
                return 0; //Erfolgreich eingeloggt
            }else{
                return 2; //Falsches Passwort
            }
        } else {
            return 1; //Benutzer existiert nicht
        }
        $result->free();
        $db->close();
    }
?>
