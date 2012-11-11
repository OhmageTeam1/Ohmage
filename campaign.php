<!DOCTYPE HTML>
<?php
    session_start(); 
    include('notice.php');
    include('authorize.php');
    authorizeUser();
?>
<html>
    <head>
        <title>Create Campaign</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/campaign.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/navbar.js"></script>
    </head>
    <body>
        <?php
            include('navbar.php');
        ?>
        <div class="container">
            <div class="row">
                <div class="offset1 span10 centered content">
                    <div class="hero-unit">
                        <h1>Ohmage Campaign Editor</h1>
                        <br/>
                        <form class="form-horizontal" id="campaign-form">
                            <div class="control-group">
                                <label for="campaignTitle">
                                    Campaign Title
                                    <span class="label label-info">Required</span>
                                </label>
                                <input type="text" id="campaignTitle" placeholder="Campaign Title" />
                            </div>                           
                            <div class="control-group">
                                <button type="button" class="btn btn-primary" data-toggle="button">Create Campaign</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
