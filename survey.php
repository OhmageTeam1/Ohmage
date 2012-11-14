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
        <script type="text/javascript" src="js/survey.js"></script>
    </head>
    <body>
		<?php
            include('navbar.php');
        ?>
        <div class="container">
            <div class="row">
                <div class="offset1 span10 content">
                    <div class="hero-unit">
						<img src="img/ohmage-logo.png">
                        <h1>Survey Editor</h1>
                        <br/>
                        <form class="form-horizontal" id="survey-form">
                            <div class="control-group">
                                <label for="surveyTitle">
								Survey Title 
								<span class="label label-info">Required</span>
								</label>
                                <input type="text" id="surveyTitle" placeholder="Survey Title" />
                            </div>
                            <div class="control-group">
                                <label for="surveyDescription">Survey Desciption </label>
                                <textarea id="surveyDescription" placeholder="Survey Description"></textarea>
                            </div>
                            <div class="control-group">
                                <label for="surveyIntroText">Survey Intro Text </label>
                                <textarea id="surveyIntroText" placeholder="Survey Intro Text"></textarea>
                            </div>
                            <div class="control-group">
                                <label for="surveySubmitText">
								Survey Submit Text
								<span class="label label-info">Required</span>
								</label>
                                <textarea id="surveySubmitText" placeholder="Survey Submit Text"></textarea>
                            </div>            
                            <div class="control-group">
                                <label class="checkbox">
                                    <input type="checkbox" id="showSummary" value="">
                                    Show summary text?
                                </label>
                            </div>
                            <div class="control-group">
                                <label id="surveySummaryTextLabel">Survey Summary Text </label>
                                <textarea id="surveySummaryText" placeholder="Survey Summary Text" disabled="disable" ></textarea>
                            </div>         
                            <div class="control-group">
                                <label class="checkbox">
                                    <input type="checkbox" id="editSummary" value="" disabled="disable">
                                    Can the user edit their responses while viewing the summary?
                                </label>
                            </div> 
                            <div class="control-group">
                                <label class="checkbox">
                                    <input type="checkbox" id="surveyAnytime" value="">
                                    Can this survey be taken at any time?
                                </label>
                            </div>                          
                            <div class="control-group">
                                <button type="button" class="btn btn-primary" data-toggle="button">Create Survey</button>
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