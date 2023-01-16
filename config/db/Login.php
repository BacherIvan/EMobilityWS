<?php

if(isset($_POST['uname']) && isset($_POST['pwd'])) {
    $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Login');

    if ($db->connect_errno) {
        die('Sorry - gerade gibt es ein Problem');
    }

    $result = $db->query('Select * from Admin where usr="' . $_POST['uname'] . '"');

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($_POST['pwd'] == $row['pwd']) {?>
            <script type="text/javascript">
                window.open('admin.php', '_blank');
            </script>
        <?php } else {
            echo '<span>Falsches Passwort!</span>';
        }
    } else {
        echo '<span>Benutzername existiert nicht!</span>';
    }
    $result->free();
    $db->close();
}

?>
