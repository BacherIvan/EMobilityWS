<!DOCTYPE html>
<html lang="de">
<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0px;
        overflow: hidden;
        background-color: black;
    }

    li {
        float: left;
    }

    li a {
        display: block;
        color: blue;
        font-size:20px;
        text-align: center;
        padding: 10px 20px;
        text-decoration: none;
    }
    .active{
        background-color: gray;
        color: white;
    }
    li a:hover {
        background-color: green;
        color: white;
    }
</style>
<section id="EBIL-section--admin" class="EBIL-section" data-id="admin" data-hero-layout="full">
    <div class="EBIL-section__wrap">
        <ul>
            <li><a class="active" href="#home">Tagebuch</a></li>
            <li><a href="#">Auto</a></li>
        </ul>
    </div>
        <?php
            $db = new mysqli('localhost', 'root', 'Schlecht69!', 'Tagebuch');

            if ($db->connect_errno) {
                die('Sorry - gerade gibt es ein Problem');
            }

            $result = $db->query('Select * from Eintrag natural join hatEintrag natural join Person;');

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()){
                    //print_r($row);
                    echo $row['vorname'] .' '.  $row['nachname'] .', '. $row['startzeit'] .' - ' . $row['endzeit'] .'<br>';
                    echo $row['eintrag'] . '<br><br>';
                }
            }
            $result->free();
            $db->close();
        ?>
</section>
</html>

