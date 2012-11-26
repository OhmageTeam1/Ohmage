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
        <link href="css/survey.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/survey.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
        <script type="text/javascript" src="js/json2xml.js"></script>
        <script type="text/javascript" src="js/campaign-editor.js"></script>
    </head>
    <body>
		<?php
            include('navbar.php');
        ?>
        <div class="container">
            <div class="row">
                <div class="span3">
                    <div class="boxRounded boxDark">
                        <div class="addPropertiesBox centered">
                            <h2 class="muted">Optional Properties</h2>
                            <hr>
                            <button type="button" class="formToggleBtn btn btn-primary" id="descriptionAdd"><i class="icon-plus icon-white"></i> Add Description</button>
                            <button type="button" class="formToggleBtn btn btn-primary" id="introTextAdd"><i class="icon-plus icon-white"></i> Add Introduction Text</button>
                            <button type="button" class="formToggleBtn btn btn-primary" id="summaryTextAdd"><i class="icon-plus icon-white"></i> Add Summary Text</button>
                        </div>
                    </div>
                </div>
                <div class="span9 content">
                    <div class="boxRounded boxDark">
                        <h1>Campaign Details <small>Create a new survey, or edit an existing one.</small></h1>
                        <div class="new-survey">
                            <hr>
                            <form class="form-horizontal" id="survey-form">
                                <div class="control-group">
                                    <label class="control-label" for="surveyTitle">Title <i class="icon-asterisk"></i></label>
                                    <div class="controls">
                                        <input type="text" id="surveyTitle" />
                                        <i class="help-icon icon-question-sign" data-original-title="The name of your survey." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <div class="descriptionInput hide">
                                    <button type="button" class="formToggleBtn btn btn-danger pull-right btn-small" id="descriptionRemove"><i class="icon-remove icon-white"></i> Remove</button>
                                    <div class="control-group">
                                        <label class="control-label" for="surveyDescription">Desciption </label>
                                        <div class="controls">
                                            <textarea id="surveyDescription" class="" placeholder="Enter the description of your survey here..."></textarea>
                                            <i class="help-icon icon-question-sign" data-original-title="What is your survey about?" rel="tooltip" data-placement="right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="introTextInput hide">
                                    <button type="button" class="formToggleBtn btn btn-danger pull-right btn-small" id="introTextRemove"><i class="icon-remove icon-white"></i> Remove</button>
                                    <div class="control-group">
                                        <label class="control-label" for="surveyIntroText">Intro Text</label>
                                        <div class="controls">
                                            <textarea id="surveyIntroText" placeholder="Text to display to the user before they begin the survey..."></textarea>
                                            <i class="help-icon icon-question-sign" data-original-title="Text to display to the user before they begin the survey." rel="tooltip" data-placement="right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="surveySubmitText">Submit Text <i class="icon-asterisk"></i></label>
                                    <div class="controls">
                                        <textarea id="surveySubmitText" placeholder="Text to display to a user upon survey completion..."></textarea>
                                        <i class="help-icon icon-question-sign" data-original-title="Text to display to the user after they complete the survey." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>     

                                <div class="summaryTextInput hide">
                                    <div class="control-group">
                                        <button type="button" class="formToggleBtn btn btn-danger pull-right btn-small" id="summaryTextRemove"><i class="icon-remove icon-white"></i> Remove</button>
                                        <label class="control-label" id="surveySummaryTextLabel">Summary Text <i class="icon-asterisk"></i></label>
                                        <div class="controls">
                                            <textarea id="surveySummaryText" placeholder="Enter your survey summary text here..."></textarea>
                                            <i class="help-icon icon-question-sign" data-original-title="Text to show to the user at the summary screen." rel="tooltip" data-placement="right"></i>
                                        </div>
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