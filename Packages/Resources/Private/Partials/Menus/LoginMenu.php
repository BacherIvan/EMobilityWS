<html lang="de">
    <div id="JS-login" class="EBIL-section__login">
        <form class="EBIL-section__login__content EBIL-section__animate" action="">
            <div class="EBIL-section__login-wrap">
                <div class="EBIL-section__image ">
                    <img src="/Packages/Resources/Public/Images/_custom/avatar-min.webp" alt="Avatar">
                </div>
                <div class="EBIL-section__container">
                    <label class="EBIL-section__lbl" for="uname"><b>Username</b></label>
                    <input id="JS-username" class="EBIL-section__input" type="text" placeholder="Enter Username" name="uname" required>

                    <label class="EBIL-section__lbl" for="psw"><b>Password</b></label>
                    <input id="JS-password" class="EBIL-section__input" type="password" placeholder="Enter Password" name="pwd" required>

                    <button id="JS-button" class="EBIL-section__button JS-login-button" type="button">Login</button>
                </div>
                <div class="EBIL-section__login-failed">
                    <span id="JS-displayError"></span>
                </div>
            </div>
        </form>
    </div>
</html>
