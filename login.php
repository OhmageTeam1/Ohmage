<!DOCTYPE HTML>
<html>
    <head>
        <title>Ohmage - Please log in.</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/campaign.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/ohmage-login.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="offset1 span10 centered content">
                    <?php
                        if(isset($_POST['auth_fail'])) {
                            echo "<div class='alert alert-error'>You must be logged in to do this!</div>";
                        }
                    ?>
                    <div class="hero-unit">
                        <img src="img/ohmage-logo.png">
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
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
