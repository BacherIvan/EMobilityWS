<?php
    if(!isset($_COOKIE['uname']) || !isset($_COOKIE['pwd'])){
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
    <script type="text/javascript" async src="/Packages/Resources/Public/JavaScript/webpack--runtime.js"></script>
    <link rel="icon" type="image/png" sizes="16x16" href="/Packages/Resources/Public/Images/logo/favicon.png">
</head>

<section id="EBIL-section--admin" class="EBIL-section" data-id="admin" data-hero-layout="full">
    <div class="EBIL-section__wrap">
        <div class="EBIL-section__admin-menu">
            <ul class="EBIL-section__admin-menu__lvl EBIL-section__admin-menu__lvl--0">
                <li class="EBIL-section__admin-menu__item EBIL-section__admin-menu__item--lvl-0 EBIL-section__admin-menu__item--first JS-anchor">
                    <a href="/" class="EBIL-section__admin-menu__link EBIL-section__admin-menu__link--lvl-0 " target="_top" title="Home">
                        <div class="EBIL-section__admin-menu__number">
                            <span class=""> 01 </span>
                        </div>
                        <span class="EBIL-section__admin-menu__title EBIL-section__admin-menu__title--lvl-0"> Home </span>
                    </a>
                </li>
                <li class="EBIL-section__admin-menu__item EBIL-section__admin-menu__item--lvl-0 JS-anchor JS-act" data-target="c50">
                    <a class="EBIL-section__admin-menu__link EBIL-section__admin-menu__link--lvl-0" target="_top" title="Tabebuch">
                        <div class="EBIL-section__admin-menu__number">
                            <span class=""> 02 </span>
                        </div>
                        <span class="EBIL-section__admin-menu__title EBIL-section__admin-menu__title--lvl-0"> Tagebuch </span>
                    </a>
                </li>
                <li class="EBIL-section__admin-menu__item EBIL-section__admin-menu__item--lvl-0 JS-anchor" data-target="c51">
                    <a class="EBIL-section__admin-menu__link EBIL-section__admin-menu__link--lvl-0 " target="_top" title="Auto">
                        <div class="EBIL-section__admin-menu__number">
                            <span class=""> 03 </span>
                        </div>
                        <span class="EBIL-section__admin-menu__title EBIL-section__admin-menu__title--lvl-0"> Auto </span>
                    </a>
                </li>
        </div>
        <div class="EBIL-section__tagebuch JS-act" id="c50">
            <div class="EBIL-section__neuer-eintrag">
                <span>Neuer Eintrag</span>
            </div>
            <div class="EBIL-section__eintrag-wrap">
                <div id="JS-eintrag"></div>
            </div>
        </div>
        <div class="EBIL-section__auto" id="c51">
            <span>AUTOOO....FOCK DU</span>
        </div>
    </div>
</section>
</html>

