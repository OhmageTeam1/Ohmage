<!DOCTYPE HTML>
<?php
    session_start(); 
    include('notice.php');
    require_once('authorize.php');
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
        <script type="text/javascript" src="js/campaign.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
    </head>
    <body>
        <?php
            include('navbar.php');
        ?>
        <div class="container">
            <div class="row">
                <div class="offset1 span10 content">
                    <div class="box-rounded box-dark">
                        <h1>Campaign Editor <small>Choose a campaign, or create a new one.</small></h1>
                        <div class="existing-campaigns">
                            <hr>
                            <h3>Edit an Existing Campaign</h3>
                            <form class="form-horizontal">
                                <div class="control-group">
                                    <label class="control-label" for="campaignTitle">Campaign</label>
                                    <div class="controls">
                                        <select class="campaign-select"></select>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="submit" id="edit-campaign" class="btn btn-primary">Edit Campaign</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div>
                            <hr>
                            <form class="form-horizontal" id="campaign-form">
                                <h3>Create a New Campaign</h3>
                                <div class="control-group">
                                    <label class="control-label" for="campaignTitle">Campaign Title*</label>
                                    <div class="controls">
                                        <input type="text" class="input-xlarge" id="campaignTitle" placeholder="Campaign Title" />
                                        <i class="help-icon icon-question-sign" data-content="Content" data-original-title="The name of your campaign." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>                           
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="submit" id="create-campaign" class="btn btn-primary">Create Campaign</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>
