<!DOCTYPE html>
<html lang="de">
    <header id="EBIL-section--header" class="EBIL-section" data-id="header" data-scrolling="0" data-menu-open="0" data-hero-layout="full">
        <div class="EBIL-section__wrap">

            <div class="EBIL-section__left">
                <!-- Logo -->
                <a href="/" title="Emobility" target="_top" class="EBIL-section__logo GTM--click-event" data-gtm-action="header logo" data-gtm-category="click header">
                    <div class="EBIL-section__logo__item EBIL-section__logo__item--large">
                        <img src="/Packages/Resources/Public/Images/logo/EmoBILityLogo.png" alt="Emobility Logo" title="Emobility Logo">
                    </div>
                </a>
            </div>

            <div class="EBIL-section__right">
                <!-- Main menu trigger -->
                <?php
                    include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Elements/MainMenuTrigger.html";
                ?>
            </div>

            <div class="EBIL-section__menu">
                <?php
                    include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Menus/MainMenu.html";
                ?>
            </div>
            <!-- ICON FÜR GESCHÜTZEN BEREICH HIER EINSETZEN -->
        </div>
    </header>
</html>
