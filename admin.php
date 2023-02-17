<?php
    //Check Permission
    require("./config/db/checkLogin.php");
    if((checkLogin($_COOKIE['uname'], $_COOKIE['pwd']))!= 0) {
        die("Keine Berechtigung");
    }
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes, maximum-scale=1, minimum-scale=1, viewport-fit=cover">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="theme-color" content="#ffffff">
        <title>Admin</title>
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Css/Frontend/sections--admin.css">
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/entry--globals--global.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/entry--sections--admin.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/tk-internal-functions.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--cash-dom.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--lazysizes.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--progressbar-js.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--lodash-es.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--shifty.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--flatpickr.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/webpack--runtime.js"></script>
        <link rel="icon" type="image/png" sizes="16x16" href="/Packages/Resources/Public/Images/logo/favicon.png">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Icons/Icomoon/style.css">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Fonts/style.css">
        <link rel="stylesheet" type="text/css" href="Packages/Resources/Public/Css/Frontend/flatpickr.css">
        <link rel="stylesheet" type="text/css" href="Packages/Resources/Public/Css/Frontend/flatpickr_light.css">
    </head>
    <body data-hero-layout="full">
        <section id="EBIL-section--admin" class="EBIL-section" data-id="admin" data-new-entry="0" data-person-required="0" data-date-time-required="0" data-text-required="0" data-entry-success="0" data-hero-layout="full">
            <div class="EBIL-section__wrap">
                <?php
                    include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Menus/AdminMenu.html";
                    include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Sections/NewEntry.html";
                    include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Sections/Tagebuch.html";
                    include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Sections/Auto.php";
                ?>
            </div>
        </section>
    </body>
</html>

