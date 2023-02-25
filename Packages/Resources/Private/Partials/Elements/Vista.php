<html lang="de">
    <div class="EBIL-section__vista JS-vista" data-hero-layout="full">
        <div class="EBIL-section__vista__slide">
            <div class="EBIL-section__vista__item EBIL-section__vista__item--image">
                <img src="/Packages/Resources/Public/Images/_custom/HeroImage1.jpeg" alt="Berge">
            </div>
        </div>
        <div class="EBIL-section__vista__slide">
            <div class="EBIL-section__vista__item EBIL-section__vista__item--image">
                <img src="/Packages/Resources/Public/Images/_custom/HeroImage7.jpeg" alt="Winterlandschaft">
            </div>
        </div>
        <div class="EBIL-section__vista__slide">
            <div class="EBIL-section__vista__item EBIL-section__vista__item--image">
                <img src="/Packages/Resources/Public/Images/_custom/HeroImage6.jpeg" alt="Lichtung">
            </div>
        </div>
        <div class="EBIL-section__vista__slide">
            <div class="EBIL-section__vista__item EBIL-section__vista__item--image">
                <img src="/Packages/Resources/Public/Images/_custom/HeroImage4.jpeg" alt="See">
            </div>
        </div>
    </div>
    <?php
        // Arrows + Nav (Dots) + Pagination
        include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Elements/Slider/Arrows.html";
        include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Elements/Slider/Nav.html";
        include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Elements/Slider/Pagination.html";

        // Scroller
        include $_SERVER["DOCUMENT_ROOT"] . "/Packages/Resources/Private/Partials/Elements/Slider/Scroller.html";
    ?>
    <div class="EBIL-section__overlay"></div>
</html>
