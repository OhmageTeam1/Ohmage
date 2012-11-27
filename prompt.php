<!DOCTYPE HTML>
<html>
    <head>
        <title>Create Prompt</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery-ui-1.9.1.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/navbar.css" rel="stylesheet" type="text/css"/>
        <link href="css/prompt.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.9.0.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/json2xml.js"></script>
        <script type="text/javascript" src="js/promptType.js"></script>
        <script type="text/javascript" src="js/prompt.js"></script>
        <script type="text/javascript" src="js/XMLProcessor.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
        <script type="text/javascript" src="js/vkbeautify.0.99.00.beta.js"></script>
        <script type="text/javascript" src="js/breadcrumb.js"></script>

        
    </head>
    <body>
		<?php
            include('navbar.php');
            require_once('authorize.php');
        ?>
        <div class="container">
            <div class="breadcrumbsNav">
                <ul class="breadcrumb">
                    <li id="homeBreadcrumb"><i class="icon-home"></i> <a href="campaign.php">Campaigns</a> <span class="divider"><i class="icon-chevron-right"></i></span></li>
                    <li id="campaignBreadcrumb"><a href="survey.php"></a> <span class="divider"><i class="icon-chevron-right"></i></span></li>
                    <li id="surveyBreadcrumb" class="active"></li>
                </ul>
            </div>
            <div class="row">
                <div class="well span2">
                    <h2>Number of Questions</h2>
                    <p id="numQuestion">0</p>
                    <p><button type="button" class="btn btn-primary" id="viewXML">View XML</button></p> 
                    <div class="overlay" id="overlayXML" style="display:none;"></div>
                        <div class="OverlayBox" id="XMLBox">
                            <div class="controls" >
                                <h3>XML</h3>
                                <textarea type="text" placeholder="XML" id="XMLdata"></textarea>
                            </div>
                            <div class="control-group">
                                <button type="button" class="btn btn-primary" data-toggle="button" id="XMLBoxOK">OK</button>
                            </div>
                        </div>
                    
                </div>
                <div class="well span9 content">
					<img src="img/ohmage-logo.png">
                    <h2>Previous Items</h2>
                    <table>
                        <div class="previousItems" id="previousItem">
                            PREVIOUSLY ADDED ITEMS HERE
                        </div>
                    </table>
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
                                        <hr>
                                        <form class="form-horizontal" id="message-form">
                                            <div class="control-group">
                                                <label class="control-label" for="messageID">Message ID*</label>
                                                <div class="controls">
                                                    <textarea name="id" id="messageID" placeholder="Message ID"></textarea>
                                                    <i class="help-icon icon-question-sign" data-original-title="A unique identifier for this message." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            <div class="control-group">
                                                <label class="control-label" for="messageText">Message Text*</label>
                                                <div class="controls">
                                                    <textarea name="messageText" id="messageText" placeholder="Message Text"></textarea>
                                                    <i class="help-icon icon-question-sign" data-original-title="The text to be displayed to the user." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            <div class="control-group">
                                                <label class="control-label" for="condition">Condition</label>
                                                <div class="controls">
                                                    <input type="text" name="condition" id="conditionMessage" placeholder="Click to edit conditions" />
                                                    <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the message is displayed or not." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            <div class="control-group">
                                                <button type="submit" class="btn btn-primary" id="create message" value="Create Message">Create Message</button>
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
												<label class="control-label" for="promptID">Prompt ID*</label>
                                                <div class="controls">
                                                    <input type="text" name="id" id="promptID" placeholder="Prompt ID" />
                                                    <i class="help-icon icon-question-sign" data-original-title="A unique identifier for the prompt." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            
											<div class="control-group">
												<label class="control-label" for="displayLabel">Display Label*</label>
                                                <div class="controls">
                                                    <input type="text" name="displayLabel" id="displayLabel" placeholder="Display Label" />
                                                    <i class="help-icon icon-question-sign" data-original-title="The user-friendly name of this prompt used in visualizations." rel="tooltip" data-placement="right"></i>
                                                </div>
											</div>
                                            
											<div class="control-group">
												<label class="control-label" for="displayType">Display Type*</label>
                                                <div class="controls">
                                                    <select name="displayType" id="displayType">
                                                        <option value="None">Please choose a display type</option>
                                                        <option value="Measurement">Measurement</option>
                                                        <option value="Event">Event</option>
                                                        <option value="Count">Count</option>
                                                        <option value="Category">Category</option>
                                                        <option value="Metadata">Metadata</option>
                                                    </select>
                                                    <i class="help-icon icon-question-sign" data-original-title="The type of the data being collected, which must be one of measurement, event, count, category, or metadata." rel="tooltip" data-placement="right"></i>
                                                </div>
											</div>
                                            
											<div class="control-group">
												<label class="control-label" for="promptText">Prompt Text*</label>
                                                <div class="controls">
                                                    <textarea type="text" name="promptText" id="promptText" placeholder="Prompt Text"></textarea>
                                                    <i class="help-icon icon-question-sign" data-original-title="The text to display to the user when prompting them to respond." rel="tooltip" data-placement="right"></i>
                                                </div>
											</div>
                                            
											<div class="control-group">
												<label class="control-label" for="abbreviatedText">Abbreviated Text*</label>
                                                <div class="controls">
                                                    <textarea type="text" name="abbreviatedText" id="abbreviatedText" placeholder="Abbreviated Text"></textarea>
                                                    <i class="help-icon icon-question-sign" data-original-title="An abbreviated version of the prompt text for use in situations where space is limited or for display purposes." rel="tooltip" data-placement="right"></i>
                                                </div>
											</div>
                                            
											<div class="control-group">
												<label class="control-label" for="promptType">Prompt Type*</label>
                                                <div class="controls">
                                                    <select name="promptType" id="groupPromptType">
                                                        <option value="None">Please choose a prompt type</option>
                                                        <option value="Multiple Choice">Multiple Choice</option>
                                                        <option value="Multiple Choice Custom">Multiple Choice Custom</option>
                                                        <option value="Number">Number</option>
                                                        <option value="Photo">Photo</option>
                                                        <option value="Remote Activity">Remote Activity</option>
                                                        <option value="Single Choice">Single Choice</option>
                                                        <option value="Single Choice Custom">Single Choice Custom</option>
                                                        <option value="Text">Text</option>
                                                        <option value="Timestamp">Timestamp</option>
                                                    </select>
                                                    <i class="help-icon icon-question-sign" data-original-title="Choose type of your prompt" rel="tooltip" data-placement="right"></i>
                                                </div>
                                                <div class="controls">
                                                    
                                                    <div>
                                                        <p></p>
                                                        <p><textarea name="properties" id="addedPrompt" readonly></textarea></p>
                                                    </div>
                                                </div>
                                                <!-- Overlay window section -->
                                                
                                                <div class="overlay" id="overlay" style="display:none;"></div>
 
                                                <div class="OverlayBox" id="PromptBox">
                                                    <div class="data" id="data">
                                                    </div>
                                                    <div class="control-group">
                                                        <button type="button" class="btn btn-primary" data-toggle="button" id="PromptBoxOK">OK</button>
                                                    </div>
                                                </div>
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
                                                                <label class="control-label" for="default">Default</label>
                                                                <div class="controls">
                                                                    <input type="text" name="default" id="default" placeholder="Default" />
                                                                    <i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>
                                                                </div>
                                                            </div>
                                                            <div class="control-group">
                                                                <label class="control-label" for="condition">Condition</label>
                                                                <div class="controls">
                                                                    <input type="text" name="condition" id="condition" onclick="conditionClick()" placeholder="Click to edit conditions" />
                                                                    <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the prompt is displayed or not." rel="tooltip" data-placement="right"></i>
                                                                </div>
                                                                <div id="condition_container">
                                                                    <table>
                                                                        <tr>
                                                                            <td><input type="radio" name="condType" style="vertical-align: middle" value="Simple" checked="checked"></td>
                                                                            <td>Simple</td>
                                                                            <td><input type="radio" name="condType" style="vertical-align: middle" value="Advance"></td>
                                                                            <td>Advance</td>
                                                                        </tr>
                                                                    </table>
                                                                    <p> </p>
                                                                    <div id="condType">
                                                                        <select id="promptIDList">
                                                                        </select>
                                                                        <select id="operator">
                                                                            <option value="==">&#61;</option>
                                                                            <option value="!=">&#33;&#61;</option>
                                                                            <option value="<">&#60;</option>
                                                                            <option value="<=">&#60;&#61;</option>
                                                                            <option value=">">&#62;</option>
                                                                            <option value=">=">&#62;&#61;</option>
                                                                        </select>
                                                                        <input type="text" id="conditionValue" placeholder="value"/>
                                                                    </div>
                                                                    <p><button type="button" class="btn btn-primary" id="saveCondition">Save Condition</button></p>
                                                                </div>
                                                                <div id="bgPopup"></div>
                                                                <!--<input type="text" name="Condition" id="Condition" placeholder="Condition" /> -->
                                                            </div>
                                                            <div class="control-group">
                                                                <label class="checkbox">
                                                                <input type="checkbox" name="skippable" id="skippable">
                                                                Can this survey be skippable?
                                                                </label>
                                                            </div> 
                                                            
                                                            <div class="control-group">
                                                                <label class="control-label" id="skipLabelLabel">Skip Label</label>
                                                                <div class="controls">
                                                                    <input type="text" name="skipLabel" id="skipLabel" placeholder="Skip Label" disabled="disable"/>
                                                                </div>
                                                            </div>
                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
											<div class="control-group">
												<button type="submit" class="btn btn-primary" id="add prompt">Add Prompt</button>
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
                                        <form class="form-horizontal" id="repeatable-form">
                                            <div class="control-group">
                                                <label class="control-label" for="idRepeatable">Repeatable set ID*</label>
                                                <div class="controls">
                                                    <input type="text" name="idRepeatable" id="idRepeatable" placeholder="ID"/>
                                                    <i class="help-icon icon-question-sign" data-original-title="A unique identifier for the repeatable set." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="control-group">
                                                <label class="control-label" for="terminationQuestion">Termination Question*</label>
                                                <div class="controls">
                                                    <input type="text" name="terminationQuestion" id="terminationQuestion" placeholder="Termination Question"/>
                                                    <i class="help-icon icon-question-sign" data-original-title="The text to be displayed to the user to allow them to choose to repeat the set." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="control-group">
                                                <label class="control-label" for="terminationTrueLabel">Termination True Label*</label>
                                                <div class="controls">
                                                    <input type="text" name="terminationTrueLabel" id="terminationTrueLabel" placeholder="Termination True Label"/>
                                                    <i class="help-icon icon-question-sign" data-original-title="The text indicating that the user does not wish to repeat the set." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="control-group">
                                                <label class="control-label" for="terminationFalseLabel">Termination False Label*</label>
                                                <div class="controls">
                                                    <input type="text" name="terminationFalseLabel" id="terminationFalseLabel" placeholder="Termination False Label"/>
                                                    <i class="help-icon icon-question-sign" data-original-title="The text indicating that the user does wish to repeat the set." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="control-group">
                                                <label class="checkbox">
                                                <input type="checkbox" name="terminationSkipEnabled" id="terminationSkipEnabled">
                                                Show Termination Skip button?
                                                </label>
                                            </div> 
                                            <div class="control-group">
                                                <label class="control-label" id="terminationSkipLabel">Skip Label</label>
                                                <div class="controls">
                                                    <input type="text" name="terminationSkipLabel" id="terminationSkipLabel" placeholder="Skip Label" disabled="disable"/>
                                                </div>
                                            </div>
                                            
                                            <div class="control-group">
                                                <label class="control-label" for="condition">Condition</label>
                                                <div class="controls">
                                                    <input type="text" name="Condition" id="conditionRepeatable" placeholder="Click to edit conditions" />
                                                    <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the repeatable set is displayed or not." rel="tooltip" data-placement="right"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="control-group">
                                                <label class="control-label"for="choose">Choose prompts to add to the repeatable set</label>
                                                <div class="controls">
                                                    <select id="repeatPromptList">
                                                    </select>
                                                    <a href="#" id="addPromptRepeatable">Add</a>
                                                    <p></p>
                                                    <p><textarea name="promptsRepeatablt" id="promptsRepeatablt" readonly></textarea></p>
                                                </div>
                                            </div>
                                            <div class="control-group">
                                                <button type="submit" class="btn btn-primary" id="create repeatable" value="Create Repeatble">Create Repeatable Set</button>
                                            </div>
                                        </form>
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

