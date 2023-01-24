<?php
    require("checkLogin.php");
    if(isset($_GET['uname']) && isset($_GET['pwd'])) {
        $arr = ['statusCode' => checkLogin($_GET['uname'], $_GET['pwd'])];
        echo json_encode($arr);
    }
?>
