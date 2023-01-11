<html lang="de">
    <div id="JS-login" class="EBIL-section__login">
        <form class="EBIL-section__login__content EBIL-section__animate" action="" method="post">
            <div class="EBIL-section__image ">
                <img src="/Packages/Resources/Public/Images/_custom/avatar.png" alt="Avatar">
            </div>
            <div class="EBIL-section__container">
                <label for="uname"><b>Username</b></label>
                <input class="EBIL-section__input" type="text" placeholder="Enter Username" name="uname" required>

                <label for="psw"><b>Password</b></label>
                <input class="EBIL-section__input" type="password" placeholder="Enter Password" name="pwd" required>

                <button class="EBIL-section__button" type="submit">Login</button>
                <label>
                    <input class="EBIL-section__checkbox" type="checkbox" checked="checked" name="remember">Remember me
                </label>
            </div>
            <?php
                if(isset($_POST['uname']) && isset($_POST['pwd'])) {
                    $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Login');

                    if ($db->connect_errno) {
                        die('Sorry - gerade gibt es ein Problem');
                    }

                    $result = $db->query('Select * from Admin where usr="' . $_POST['uname'] . '"');

                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        if ($_POST['pwd'] == $row['pwd']) {
                            $URL = "./Packages/Resources/Private/Sections/admin.php";
                            echo "<script type='text/javascript'>document.location.href='{$URL}';</script>";
                            echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
                            //echo "Erfolgreich angemeldet!";
                        } else {
                            echo "Falsches Passwort!";
                        }
                    } else {
                        echo "Benutzername existiert nicht!";
                    }
                    $result->free();
                    $db->close();
                }
            ?>
        </form>
    </div>
</html>
