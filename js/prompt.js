var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);
var tempSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
   
$(function() {
    $("#groupPromptType").change(function() {
        $this = $(this);
        console.log($this.val());
        switch ($this.val()) {
            case 'multi_choice':
            case 'multi_choice_custom':
                $('#multiChoiceModal').modal('show');
                break;
            case 'single_choice':
            case 'single_choice_custom':
                $('#singleChoiceModal').modal('show');
                break;
            case 'number':
                $('#numberModal').modal('show');
                break;
            case 'photo':
                $('#photoModal').modal('show');
                break; 
            case 'remote_activity':
                $('#remoteActivityModal').modal('show');
                break;
            case 'text':
                $('#textModal').modal('show');
                break;
            case 'timestamp':
                // Timestamp modal is not needed.  Do nothing.
                break;                
            default:
                break;
        }
    });

    $('#previousItemsSortable').sortable({
        start: function(event, ui) {
            $(ui.item).data('startIndex', ui.item.index());
        },
        stop: function(event, ui) {
            campaignEditor.shiftSurveyItems($(ui.item).data('startIndex'), ui.item.index());
        }
    }).disableSelection();

    $('#saveSurvey').click(function(e) {
        if (confirm('Are you sure you wish to save this survey?')) {
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
        } else {
            e.preventDefault();
        }
    }) 

    /*
    $('#groupPromptType').val("None");
    $( "#previousItem" ).disableSelection();
    $("select#groupPromptType").change(displayPrompt);
    displayPrompt();
    */

    $('#messageConditionBtn').click(function() {
        $('#conditionSource').val('message');
        $('#advancedCondition').val($(this).prev().val());
        $('#conditionModal').modal('show');
    });

    // Condition toggle button
    $('#conditionToggle').click(function(){
        var $this = $(this);
        if ($this.text() === 'Simple') {
            $this.text('Advanced');
            $('#conditionType').val('advanced');
        } else {
            $this.text('Simple');
            $('#conditionType').val('simple');
        }
        $this.toggleClass('btn-inverse');
        $('#simpleCondition').toggle();
        $('#advancedCondition').toggle();
    });

    /*
    var skipLabel = $('#skipLabelLabel').text();
    $('#skippable').change(function() { 
        if (this.checked) {
            $('#skipLabel').removeAttr('disabled');
            $('#skipLabelLabel').append('<span class="label label-info">Required</span>');
        }
        else {
            $('#skipLabel').attr('disabled', 'disabled');
            $('#skipLabelLabel').html(skipLabel);
        }
    });
    */

    $('#previousItemsSortable').on('click', 'button.deleteItem', function() {
        $parent = $(this).parent();
        var index = $('#previousItemsSortable li').index($parent);
        $parent.slideUp('fast');
        setTimeout(deleteItemCallback($parent), 200);
        campaignEditor.deleteItem(index);
    });

    function setupEditMessage (message) {
        var itemId = message['id'];
        $('#editMessageId').val(itemId);
        $('#messageText').val(message['messageText']);
        if (message['condition']) $('#messageCondition').val(message['condition']);

        $('#createMessage').text('Edit Message');
        $('#cancelMessageEdit').toggle();

        $('#newPrompt').collapse('hide');
        $('#newRepeatableSet').collapse('hide');
        $('#newMessage').collapse('show');
    }

    $('#previousItemsSortable').on('click', 'button.editItem', function() {
        $parent = $(this).parent();
        var currentSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
        var index = $('#previousItemsSortable li').index($parent);
        var item = currentSurvey['contentList'][''][index]

        if (item['message']) {
            setupEditMessage(item['message']);
        } else if (item['prompt']) {

        } else if (item['repeatableSet']) {

        } else {

        }
    });


    // Save message to campaignWrapper object
    $('#messageForm').submit(function(event) {
        var $this = $(this);

        // get form data
        var messageData = $this.serializeObject();
        var itemIndex;
        if (messageData['editMessageId']) {
            var messageId = parseInt(messageData['editMessageId']);
            itemIndex = campaignEditor.surveyItemIndexes(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']).indexOf(messageId);
            campaignEditor.addMessage(messageData, itemIndex);
        } else {
            itemIndex = campaignEditor.addMessage(messageData); 
        }

        if (itemIndex === false) {
            surveyItemError('Some required fields are missing!')
            event.preventDefault();
            return;
        }
        addMessageToPrevItems(itemIndex);

        // cleanup code
        $('#editMessageId').val('');
        $('#createMessage').text('Create Message');
        $('#cancelMessageEdit').hide();
        $('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
        $('#newMessage').collapse('hide');
        setTimeout(formCallback($this), 150);
        event.preventDefault();
	});
   
    
    // submit prompt and save to JSON object
    $('#promptForm').submit(function(event) {
        var $this = $(this);

        var promptData = $this.serializeObject();
        var promptType = promptData['promptType'];
        var itemIndex;
        properties = addProperties(promptData, promptType);
        if (promptData['editPromptId']) {
            var promptId = parseInt(messageData['editPromptId']);
            itemIndex = campaignEditor.surveyItemIndexes(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']).indexOf(promptId);
            campaignEditor.addPrompt(
                campaignWrapper['campaign'], 
                $.cookie('currentSurvey'), 
                promptData['displayLabel'],
                promptData['displayType'],
                promptData['promptText'],
                promptData['abbreviatedText'],
                promptData['promptType'],
                promptData['default'],
                promptData['condition'],
                promptData['skippable'] === "on",
                promptData['skipLabel'],
                properties,
                itemIndex
           );
        } else {
            itemIndex = campaignEditor.addPrompt(
                campaignWrapper['campaign'], 
                $.cookie('currentSurvey'), 
                promptData['displayLabel'],
                promptData['displayType'],
                promptData['promptText'],
                promptData['abbreviatedText'],
                promptData['promptType'],
                promptData['default'],
                promptData['condition'],
                promptData['skippable'] === "on",
                promptData['skipLabel'],
                properties
           );
        } 

        if (itemIndex === false) {
            surveyItemError('Some required fields are missing!')
            event.preventDefault();
            return;
        } else {
            switch (promptType) {
                case "multi_choice":
                case "multi_choice_custom":
                    addMultipleChoiceToPrevItem(itemIndex);
                    break;
                case "number":
                    addNumberToPrevItem(itemIndex);
                    break;
                case "photo":
                    addPhotoToPrevItem(itemIndex);
                    break;
                case "remote_activity":
                    addRemoteToPrevItem(itemIndex);
                    break;
                case "single_choice":
                case "single_choice_custom":
                    addSingleChoiceToPrevItem(itemIndex);
                    break;
                case "text":
                    addTextToPrevItem(itemIndex)
                    break;
                case "timestamp":
                    addTimestampToPrevItem(itemIndex)
                    break;
                default:
                    console.log('Error, unknown prompt type found.');
                    break;
            }
        }

        // cleanup code
        $('#editPromptId').val('');
        $('#createPrompt').text('Create Prompt');
        $('#cancelPromptEdit').hide();
        $('.createItemError').slideToggle('slow',function() { $(this).alert('close')});
        $('#newPrompt').collapse('hide');
        setTimeout(formCallback($this), 150);
        event.preventDefault();
	});

    $('#viewXML').click(function() {
        var xml = json2xml({'survey': campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]});
        $('#surveyXml').text(vkbeautify.xml(xml));
        $('#xmlModal').modal('show');
    })
});
