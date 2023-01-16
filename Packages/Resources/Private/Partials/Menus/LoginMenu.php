<html lang="de">
    <div id="JS-login" class="EBIL-section__login">
        <form class="EBIL-section__login__content EBIL-section__animate" action="" method="post">
            <div class="EBIL-section__login-wrap">
                <div class="EBIL-section__image ">
                    <img src="/Packages/Resources/Public/Images/_custom/avatar.png" alt="Avatar">
                </div>
                <div class="EBIL-section__container">
                    <label class="EBIL-section__lbl" for="uname"><b>Username</b></label>
                    <input class="EBIL-section__input" type="text" placeholder="Enter Username" name="uname" required>

                    <label class="EBIL-section__lbl" for="psw"><b>Password</b></label>
                    <input class="EBIL-section__input" type="password" placeholder="Enter Password" name="pwd" required>

                    <button class="EBIL-section__button JS-login-button" type="submit">Login</button>
                    <label>
                        <input class="EBIL-section__checkbox" type="checkbox" checked="checked" name="remember">Remember me
                    </label>
                </div>
                <div class="EBIL-section__login-failed">
                    <span id="JS-displayError"></span>

                </div>
            </div>
        </form>
    </div>
</html>
