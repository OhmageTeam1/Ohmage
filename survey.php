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
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/navbar.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/survey.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
        <script type="text/javascript" src="js/form-helper.js"></script>
        <script type="text/javascript" src="js/json2xml.js"></script>
        <script type="text/javascript" src="js/campaign-editor.js"></script>
    </head>
    <body>
		<?php
            include('navbar.php');
        ?>
        <div class="container">
            <div class="row">
                <div class="offset1 span10 content">
                    <div class="box-rounded box-dark">
                        <h1>Campaign Details <small>Create a new survey, or edit an existing one.</small></h1>
                        <div class="new-survey">
                            <hr>
                            <form class="form-horizontal" id="survey-form">

                                <div class="control-group">
                                    <label class="control-label" for="surveyTitle">Title*</label>
                                    <div class="controls">
                                        <input type="text" id="surveyTitle" placeholder="Survey Title" />
                                        <i class="help-icon icon-question-sign" data-original-title="The name of your survey." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <button type="button" class="form-toggle-btn btn btn-primary pull-right"><span class="action-add">Add</span><span class="action-remove hide">Remove</span> Survey Description</button>
                                <div class="control-group">
                                    <label class="control-label hide" for="surveyDescription">Desciption </label>
                                    <div class="controls hide">
                                        <textarea id="surveyDescription" class="" placeholder="Survey Description"></textarea>
                                        <i class="help-icon icon-question-sign" data-original-title="What is your survey about?" rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <button type="button" class="form-toggle-btn btn btn-primary pull-right"><span class="action-add">Add</span><span class="action-remove hide">Remove</span> Intro Text</button>
                                <div class="control-group">
                                    <label class="control-label hide" for="surveyIntroText">Intro Text</label>
                                    <div class="controls hide">
                                        <textarea id="surveyIntroText" placeholder="Survey Intro Text"></textarea>
                                        <i class="help-icon icon-question-sign" data-original-title="Text to display to the user before they begin the survey." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="surveySubmitText">Submit Text*</label>
                                    <div class="controls">
                                        <textarea id="surveySubmitText" placeholder="Survey Submit Text"></textarea>
                                        <i class="help-icon icon-question-sign" data-original-title="Text to display to the user after they complete the survey." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>     

                                <button type="button" class="form-toggle-btn btn btn-primary pull-right survey-summary"><span class="action-add">Add</span><span class="action-remove hide">Remove</span> Summary Text</button>
                                <div class="control-group">
                                    <label class="control-label hide" id="surveySummaryTextLabel">Summary Text*</label>
                                    <div class="controls hide">
                                        <textarea id="surveySummaryText" placeholder="Survey Summary Text"></textarea>
                                        <i class="help-icon icon-question-sign" data-original-title="Text to show to the user at the summary screen." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <div class="control-group hide">
                                    <div class="controls">
                                        <label class="checkbox">
                                            <input type="checkbox" id="editSummary" value="">
                                            Editable Summary
                                            <i class="help-icon icon-question-sign" data-original-title="Can the user edit their responses while viewing the summary?" rel="tooltip" data-placement="right"></i>
                                        </label>
                                    </div>
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
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>