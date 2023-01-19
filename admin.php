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
        console.log("HAAAAALO");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var rows = JSON.parse(xhttp.responseText);
                //const table = document.createElement("table");

                for (const item of rows) {
                    document.getElementById("JS-vorname").innerHTML = item["vorname"];
                    document.getElementById("JS-nachname").innerHTML = item["nachname"];
                    document.getElementById("JS-startzeit").innerHTML = item["startzeit"];
                    document.getElementById("JS-entzeit").innerHTML = item["entzeit"];
                    document.getElementById("JS-eintrag").innerHTML = item["eintrag"];
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
        <span id="JS-vorname"></span>
        <span id="JS-nachname"></span>
        <span id="JS-startzeit"></span>
        <span id="JS-entzeit"></span>
        <span id="JS-eintrag"></span>
    </div>

</section>
</html>

