<?php
    if(isset($_GET['uname']) && isset($_GET['pwd'])) {
        $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Login');

        if ($db->connect_errno) {
            die('Sorry - gerade gibt es ein Problem');
        }
        $user = $_GET['uname'];
        $pwd = $_GET['pwd'];
        $result = $db->query("Select * from Admin where usr='$user'");
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if($row['pwd'] == $pwd){
                $arr = ['statusCode'=>'0'];
                echo json_encode($arr); //Erfolgreich eingeloggt
            }else {
                $arr = ['statusCode'=>'2'];
                echo json_encode($arr); //Falsches Passwort
            }
        } else {
            $arr = ['statusCode'=>'1'];
            echo json_encode($arr); //Benutzer existiert nicht
        }
        $result->free();
        $db->close();
    }
?>
