<!DOCTYPE HTML>
<html>
    <head>
        <title>Create Prompt</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery-ui-1.9.1.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/campaign.css" rel="stylesheet" type="text/css"/>
        <link href="css/prompt.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.9.0.min.js"></script>
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
                                        <form class="form-horizontal" id="message-form">
                                            <div class="control-group">
                                                <label for="messageText">
                                                Message Text
                                                <span class="label label-info">Required</span>
                                                </label>
                                                <textarea name="messageText" id="messageText" placeholder="Message Text"></textarea>
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
												<label for="promptID">
												Prompt ID
												<span class="label label-info">Required</span>
												</label>
												<input type="text" name="id" id="Prompt ID" placeholder="Prompt ID" />
											</div>
											<div class="control-group">
												<label for="displayLabel">
												Display Label
												<span class="label label-info">Required</span>
												</label>
												<input type="text" name="Display Label" id="Display Label" placeholder="Display Label" />
											</div>
											<div class="control-group">
												<label for="displayType">
													Display Type
													<span class="label label-info">Required</span>
												</label>
                                                <select name="Display Type">
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
												<textarea type="text" name="Prompt Text" id="Prompt Text" placeholder="Prompt Text"></textarea>
											</div>
											<div class="control-group">
												<label for="abbreviatedText">
													Abbreviated Text
													<span class="label label-info">Required</span>
												</label>
												<textarea type="text" name="Abbreviated Text" id="Abbreviated Text" placeholder="Abbreviated Text"></textarea>
											</div>
											<div class="control-group">
												<label for="promptType">
													Prompt Type
													<span class="label label-info">Required</span>
												</label>
                                                <select name="Prompt Type" id="groupPromptType">
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
												<textarea type="text" name="Properties" id="Properties" placeholder="Properties"></textarea>
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
                                                                <input type="text" name="Default" id="Default" placeholder="Default" />
                                                            </div>
                                                            <div class="control-group">
                                                                <label for="condition">
                                                                Condition
                                                                </label>
                                                                <input type="text" name="Condition" id="condition" onclick="conditionClick()" placeholder="Click to edit conditions" />
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
                                                                <label id="skipLabelLabel">
                                                                Skip Label
                                                                </label>
                                                                <input type="text" name="skipLabel" id="skipLabel" placeholder="Skip Label" disabled="disable"/>
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

