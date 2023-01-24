<?php
    function checkLogin($user, $pwd){
        $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Login');

        if ($db->connect_errno) {
            die('Sorry - gerade gibt es ein Problem');
        }

        $stmt = $db->prepare("Select * from Admin where usr=?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if($row['pwd'] == $pwd){
                return 0; //Erfolgreich eingeloggt
            }else {
                return 2; //Falsches Passwort
            }
        } else {
            return 1; //Benutzer existiert nicht
        }

        $result->free();
        $db->close();
    }
?>
