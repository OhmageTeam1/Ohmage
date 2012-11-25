<!DOCTYPE HTML>
<?php
    session_start();
    if(isset($_COOKIE['authToken']))
    {
            header('Location: campaign.php');
            exit();
    }
    include('notice.php');
?>
<html>
    <head>
        <title>Ohmage - Please log in.</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/login.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/ohmage-login.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
    </head>
    <body class="login-body">
        <div class="container">
            <div class="row">
                <div class="offset1 span10 centered content">
                    <?php
                        getNotice();
                    ?>
                    <div class="box-rounded box-dark">
                        <a href="http://www.ohmage.org"><img src="img/ohmage-logo.png"></a>
                        <h1>Campaign Authoring</h1>
                        <br>
                        <p>Please login to create or edit your Ohmage campaigns.</p>
                        <form class="form-horizontal" id="login-form">
                            <div class="control-group">
                                <input type="text" id="inputUsername" placeholder="Username">
                            </div>
                            <div class="control-group">
                                <input type="password" id="inputPassword" placeholder="Password">
                            </div>
                            <div class="control-group">
                                <button type="submit" class="btn btn-primary btn-large">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>
