<div class="accordion-group">
    <div class="accordion-heading">
        <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newMessage">
            Add a new message
        </a>
    </div>
    <div id="newMessage" class="accordion-body collapse">
        <div class="accordion-inner newMessage">
            <hr>
            <form class="form-horizontal" id="messageForm">
                <div class="control-group">
                    <label class="control-label" for="messageText">Message <i class="icon-asterisk"></i></label>
                    <div class="controls">
                        <textarea name="messageText" id="messageText" placeholder="The message to display to the user."></textarea>
                        <i class="help-icon icon-question-sign" data-original-title="The message to display to the user." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="condition">Condition</label>
                    <div class="controls">
                        <input type="text" name="condition" id="conditionMessage" onclick="openConditionBox('conditionMessage')" placeholder="Click to edit conditions" />
                        <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the message is displayed or not." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <button type="submit" class="btn btn-primary" id="createMessage">Create Message</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>