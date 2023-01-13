<!DOCTYPE html>
<html lang="de">
    <header id="EBIL-section--header" class="EBIL-section" data-id="header" data-scrolling="0" data-menu-open="0" data-login-open="0" data-login-error="0" data-hero-layout="full">
        <div class="EBIL-section__wrap">
            <div class="EBIL-section__left">
                <a href="/" title="Emobility" target="_top" class="EBIL-section__logo GTM--click-event" data-gtm-action="header logo" data-gtm-category="click header">
                    <div class="EBIL-section__logo__item EBIL-section__logo__item--large">
                        <img src="/Packages/Resources/Public/Images/logo/LogoWeiss.png" alt="Emobility Logo" title="Emobility Logo">
                    </div>
                </a>
            </div>

            <div class="EBIL-section__right">
                <?php
                    include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Elements/MainMenuTrigger.html";
                ?>
                <div class="EBIL-section__right__item JS-login-menu-trigger">
                    <i class="EBIL-icon EBIL-icon--1 EBIL-icon--lock-closed"></i>
                    <i class="EBIL-icon EBIL-icon--2 EBIL-icon--close"></i>
                </div>
            </div>

            <div class="EBIL-section__menu">
                <?php
                    include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Menus/MainMenu.html";
                ?>
            </div>

            <?php
                include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Menus/LoginMenu.php";
            ?>
        </div>
    </header>
</html>
