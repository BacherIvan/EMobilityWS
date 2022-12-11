<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes, maximum-scale=1, minimum-scale=1, viewport-fit=cover">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="theme-color" content="#ffffff">
        <title> EMobility - Wir bewegen Südtirol</title>
        <!-- Javascript imports -->
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/entry--globals--global.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/entry--sections--main.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/entry--sections--sidenav.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/entry--sections--header.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/tk-internal-functions.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--cash-dom.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--lazysizes.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--lodash-es.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--animated-scroll-to.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/vendor--waypoints.js"></script>
        <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/webpack--runtime.js"></script>
        <!-- CSS imports -->
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Css/Frontend/globals--global.css">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Css/Frontend/globals--presets.css">
        <link media="print" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Css/Frontend/globals--print.css">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Css/Frontend/globals--vendors.css">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Css/Frontend/sections--main.css">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Css/Frontend/sections--sidenav.css">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Css/Frontend/sections--header.css">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Fonts/style.css">
        <link media="screen" rel="stylesheet" type="text/css" href="/Packages/Resources/Public/Icons/Icomoon/style.css">

        <!-- ICONS (apple-touchIcon,favicon) -->
    </head>
    <body data-hero-layout="full">
        <div id="EmoBILity" class="EmoBILity">
            <?php
                error_reporting(E_ALL);
                ini_set ('display_errors', 'On');
                include("./Packages/Resources/Private/Partials/Elements/Scroller.html");
                include("./Packages/Resources/Private/Sections/Sidenav.html");
                include("./Packages/Resources/Private/Sections/Header.php");
            ?>
        </div>
    </body>
</html>

