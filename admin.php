<?php
    if(!isset($_COOKIE['usr']) || !isset($_COOKIE['pwd'])){
        die("Keine Berechtigung");
    }

?>

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
            <li><a href="#auto">Auto</a></li>
        </ul>
    </div>

</section>
</html>

