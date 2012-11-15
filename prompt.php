<!DOCTYPE HTML>
<html>
    <head>
        <title>Create Prompt</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/campaign.css" rel="stylesheet" type="text/css"/>
        <link href="css/prompt.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/prompt.js"></script>
    </head>
    <body>
		<?php
            include('navbar.php');
            require_once('authorize.php');
        ?>
        <div class="container">
            
            <div class="row">
                <div class="well span2">
                    <h2>Number of Questions</h2>
                    <p>0</p>
                </div>
                <div class="well span9 content">
					<img src="img/ohmage-logo.png">
                    <div class="previousItems">
                        <h2>Previous Items</h2>
                        PREVIOUSLY ADDED ITEMS HERE
                    </div>
                    <hr/>
                    <div class="addNewItem">
                        <h2>Add a New Item</h2>
                        <div class="accordion" id="addNewItemAccordion">
                            <div class="accordion-group">
                                <div class="accordion-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newMessage">
                                        Create a new message.
                                    </a>
                                </div>
                                <div id="newMessage" class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        <form class="form-horizontal" id="message-form">
                                            <div class="control-group">
                                                <label for="messageText">
                                                Message Text
                                                <span class="label label-info">Required</span>
                                                </label>
                                                <textarea id="messageText" placeholder="Message Text"></textarea>
                                            </div>
                                            <div class="control-group">
                                                <button type="submit" class="btn btn-primary">Create Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-group">
                                <div class="accordion-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newPrompt">
                                        Create a new prompt.
                                    </a>
                                </div>
                                <div id="newPrompt" class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        <form class="form-horizontal" id="campaign-form">
											<div class="control-group">
												<label for="displayLabel">
													Display Label
													<span class="label label-info">Required</span>
												</label>
												<input type="text" id="displayLabel" placeholder="Display Label" />
											</div>
											<div class="control-group">
												<label for="displayType">
													Display Type
													<span class="label label-info">Required</span>
												</label>
                                                <select>
                                                    <option value="None">Please choose a display type</option>
                                                    <option value="Measurement">Measurement</option>
                                                    <option value="Event">Event</option>
                                                    <option value="Count">Count</option>
                                                    <option value="Category">Category</option>
                                                    <option value="Metadata">Metadata</option>
                                                </select>
												
											</div>
											<div class="control-group">
												<label for="promptText">
													Prompt Text
													<span class="label label-info">Required</span>
												</label>
												<textarea type="text" id="promptText" placeholder="Prompt Text"></textarea>
											</div>
											<div class="control-group">
												<label for="abbreviatedText">
													Abbreviated Text
													<span class="label label-info">Required</span>
												</label>
												<textarea type="text" id="abbreviatedText" placeholder="Abbreviated Text"></textarea>
											</div>
											<div class="control-group">
												<label for="promptType">
													Prompt Type
													<span class="label label-info">Required</span>
												</label>
												
                                                <select id="groupPromptType">
                                                    <option value="None">Please choose a prompt type</option>
                                                    <option value="Multiple Choice">Multiple Choice</option>
                                                    <option value="Multiple Choice Custom">Multiple Choice Custom</option>
                                                    <option value="Number">Number</option>
                                                    <option value="Photo">Photo</option>
                                                    <option value="Remote Activity">Remote Activity</option>
                                                    <option value="Single Choice ">Single Choice</option>
                                                    <option value="Single Choice Custom">Single Choice Custom</option>
                                                    <option value="Text">Text</option>
                                                    <option value="Timestamp">Timestamp</option>
                                                </select>
                                                
												<!--
												<input type="radio" name="groupPromptType" id="Multiple Choice" value="Multiple Choice">Multiple Choice<br>
												<input type="radio" name="groupPromptType" id="Multiple Choice Custom" value="Multiple Choice Custom"> Multiple Choice Custom<br>
												<input type="radio" name="groupPromptType" id="Number" value="Number"> Number<br>
												<input type="radio" name="groupPromptType" id="Photo" value="Photo"> Photo<br>
												<input type="radio" name="groupPromptType" id="Remote Activity" value="Remote Activity"> Remote Activity<br>
												<input type="radio" name="groupPromptType" id="Single Choice" value="Single Choice"> Single Choice<br>
												<input type="radio" name="groupPromptType" id="Single Choice Custon" value="Single Choice Custon"> Single Choice Custon<br>
												<input type="radio" name="groupPromptType" id="Text" value="Text"> Text<br>
												<input type="radio" name="groupPromptType" id="Timestamp" value="Timestamp"> Timestamp<br>
                                                -->
                                                <!-- Overlay window section -->
                                                <div class="overlay" id="overlay" style="display:none;"></div>
 
                                                <div class="MultipleChoiceBox" id="MultipleChoiceBox">
                                                    <a class="boxclose" id="boxclose"></a>
                                                    <div class="data" id="data">
                                                    </div>
                                                    <div class="control-group">
                                                        <button type="button" class="btn btn-primary" data-toggle="button" id="MultipleChoiceOK">OK</button>
                                                    </div>
                                                </div>
                                                <div class="NumberBox" id="NumberBox">
                                                    <h2>Number</h2>
                                                    <p> Minumum value
                                                    <input type="number" placeholder="0"></input>
                                                    </p>
                                                    <p> Maximum value
                                                    <input type="number" placeholder="100"></input>
                                                    </p>
                                                    <div class="control-group">
                                                        <button type="button" class="btn btn-primary" data-toggle="button" id="NumberOK">OK</button>
                                                    </div>
                                                </div>
                                                
											</div>
											
											<div class="control-group">
												<label for="properties">
													Properties
													<span class="label label-info">Required</span>
												</label>
												<textarea type="text" id="properties" placeholder="Properties"></textarea>
											</div>
                                            
                                            <div class="accordion" id="OptionalSection">
                                                <div class="accordion-group">
                                                    <div class="accordion-heading">
                                                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#OptionalSection" href="#newSection">
                                                        Open Optional Section
                                                        </a>
                                                    </div>
                                                    <div id="newSection" class="accordion-body collapse in">
                                                        <div class="accordion-inner">
                                                            <div class="control-group">
                                                                <label for="default">
                                                                Default
                                                                </label>
                                                                <input type="text" id="default" placeholder="Default" />
                                                            </div>
                                                            <div class="control-group">
                                                                <label for="condition">
                                                                Condition
                                                                </label>
                                                                <input type="text" id="condition" placeholder="Condition" />
                                                            </div>
                                                            <div class="control-group">
                                                                <label class="checkbox">
                                                                <input type="checkbox" id="skippable" value="">
                                                                Can this survey be skippable?
                                                                </label>
                                                            </div> 
                                                            <div class="control-group">
                                                                <label id="skipLabelLabel">
                                                                Skip Label
                                                                </label>
                                                                <input type="text" id="skipLabel" placeholder="Skip Label" disabled="disable"/>
                                                            </div>
                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
											<div class="control-group">
												<button type="button" class="btn btn-primary" data-toggle="button">Add Prompt</button>
											</div>
											</form>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-group">
                                <div class="accordion-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newRepeatableSet">
                                        Create a new repeatable set.
                                    </a>
                                </div>
                                <div id="newRepeatableSet" class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        NEW REPEATABLE SET FORM
                                    </div>
                                </div>
                            </div>
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

