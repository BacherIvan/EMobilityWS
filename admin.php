<?php
    if(!isset($_COOKIE['uname']) || !isset($_COOKIE['pwd'])){
        die("Keine Berechtigung");
    }

?>

<!DOCTYPE html>
<html lang="de">
<head>
    <title>Admin</title>
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
    <script>
        class Eintrag{

        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var rows = JSON.parse(xhttp.responseText);
                //const table = document.createElement("table");
                //var i=1;
                for (const item of rows) {
                    const span = document.getElementById('JS-eintrag');
                    const text = document.createTextNode(item['vorname'] + ' ' + item['nachname'] + '<br>' + item['startzeit'] + ' - ' + item['endzeit'] + '<br>' + item['eintrag']);
                    span.appendChild(text);

                }
            }
        };
        xhttp.open("GET", "/config/db/Tagebuch.php?datum=" + "2022-11-21");
        xhttp.send(null);
    </script>
    <link rel="icon" type="image/png" sizes="16x16" href="/Packages/Resources/Public/Images/logo/favicon.png">
</head>

<section id="EBIL-section--admin" class="EBIL-section" data-id="admin" data-hero-layout="full">
    <div class="EBIL-section__wrap">
        <ul>
            <li><a class="active" href="#home">Tagebuch</a></li>
            <li><a href="#auto">Auto</a></li>
        </ul>
        <div id="JS-eintrag"></div>
    </div>

</section>
</html>

