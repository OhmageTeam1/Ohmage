// overlay box script from : http://tympanus.net/codrops/2009/12/03/css-and-jquery-tutorial-overlay-with-slide-out-box/

var promptXMLArray = new Array(); // array of XML prompt
var promptArray = new Array(); // array of JSON prompt
var typeArray = new Array(); // array of type (message, prompt, etc..)
var arrayIndex = 0; // array index
var isEdit = false;
var editIndex = -1;

var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);
   
$(document).ready(function() {
    $('#groupPromptType').val("None");
    $( "#previousItem" ).disableSelection();
    $('.collapse').collapse();
    $("select#groupPromptType").change(displayPrompt);
    displayPrompt();
    
    /*
    Condition text box
    */
    $("#saveCondition").click(function(){
        var value = $('input:radio[name=condType]:checked').val();
        var condition = "";
        if (value == "Simple") {     
            // save to condition text box
            var promptID = $('#promptIDList').val();
            var operator = $('#operator').val();
            var val = $('#conditionValue').val();
            condition = promptID + " " + operator + " " + val;         
        }
        else { // advance
            condition = $('#advanceCondition').val();
        }
        var result = $('#saveCondition').val();
        console.log(result);
        $('#' + result).val(condition);
        
        // close the overlay box and reset values
        $('#ConditionBox').animate({'top':'-300px'},500,function(){
            $('#promptIDList').empty();
            $('#saveCondition').val('condition');
            $('#overlay').fadeOut('fast');
        });
        
    });
    $("input:radio[name=condType]").click(function() {
        var value = $(this).val();
        if (value == "Advance") {
            $("#condType").empty();
            $("#condType").append("<input type='text' id='advanceCondition' placeholder='Input condition' />");
        }
        else {
            $("#condType").empty();
            $("#condType").append("<select id='promptIDList'>" + 
                                  "</select>" +
                                  "<select id='operator' width='70'  style='width: 70px'>" +
                                  "<option value='=='>&#61;</option>" +
                                  "<option value='!='>&#33;&#61;</option>" +
                                  "<option value='<'>&#60;</option>" +
                                  "<option value='<='>&#60;&#61;</option>" +
                                  "<option value='>'>&#62;</option>" +
                                  "<option value='>='>&#62;&#61;</option>" +
                                  "</select>" +
                                  "<input type='text' id='conditionValue' placeholder='value'/>");
            // create drop down from prompt array
            $("#promptIDList").empty();
            jQuery.each(promptXMLArray, function(i, JSONvalue) {
                var xml = $.parseXML(promptXMLArray[i]);
                var val = $(xml).find("id").text();
                $("#promptIDList").append("<option value=" + val + ">" + val + "</option>");
            });
        }
    });
    
    /*
    Previous item section
    */
    $( "#previousItem" ).sortable({
			start: function(event, ui) {
                ui.item.startPos = ui.item.index();
            },
            stop: function(event, ui) {
                swapArrayElem(promptXMLArray, typeArray, ui.item.startPos, ui.item.index());
                update();
            }
    });
   
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
    
    // submit message and save to JSON object
    $('#message-form').submit(function(event) {
        event.preventDefault();
        var $this = $(this);
        if (isEdit == false) { // create
            
            temp = ($this.serializeArray());
            
            typeArray.push("message");
            
            var temp2 = JSON.stringify($('#message-form').serializeObject());
            text = "<message>" + json2xml(jQuery.parseJSON(temp2), "")  + "</message>";
            xml = text;
            promptXMLArray.push(xml);
            
            $this.clearForm();
            $('.collapse').collapse();
            update();
        }
        else { // edit, not create
            // check if user try to create while edit (click edit prompt but then open create message section)
            if (typeArray[editIndex] != "message") {
                alert("Cannot create new items while in edit mode");
            }
            else {
                
                
                var temp2 = JSON.stringify($('#message-form').serializeObject());
                text = "<message>" + json2xml(jQuery.parseJSON(temp2), "")  + "</message>";
                xml = text;
                promptXMLArray[editIndex] = xml;
                
                $this.clearForm();
                $('.collapse').collapse();
                
                //reset value
                document.getElementById("create message").innerHTML="Create Message";
                isEdit = false;
                editIndex = -1; 
            }                     
            update();
        }
        
	}); // end click
   
    
    // submit prompt and save to JSON object
    $('#campaign-form').submit(function(event) {
        event.preventDefault();
		// saving to JSON
        if (isEdit == false) { // create
            event.preventDefault();
            temp = ($(this).serializeArray());
            
            typeArray.push("prompt");
            
            var temp2 = JSON.stringify($('#campaign-form').serializeObject());
            text = "<prompt>" + json2xml(jQuery.parseJSON(temp2), "")  + "</prompt>";
            
            var xml = $.parseXML(text); 
            var promptType = $('#groupPromptType').val();
            xml = addProperties(text, promptType);
            xml = $.XMLtoStr(xml);
            xml=xml.replace(/(&lt;)/g,"<").replace(/(&gt;)/g,">");
            promptXMLArray.push(xml);    
           
            $(this).clearForm();
            $('.collapse').collapse();
            update();            
        }
        else { // edit, not create
            
            // check if user try to create while edit (click edit prompt but then open create message section)
            if (typeArray[editIndex] != "prompt") {
                
                alert("Cannot create new items while in edit mode");
            }
            else {              
                var temp2 = JSON.stringify($('#campaign-form').serializeObject());      
                text = "<prompt>" + json2xml(jQuery.parseJSON(temp2), "")  + "</prompt>";
                
                var xml = $.parseXML(text); 
                var promptType = $('#groupPromptType').val();
                xml = addProperties(text, promptType);
                xml = $.XMLtoStr(xml);
                xml=xml.replace(/(&lt;)/g,"<").replace(/(&gt;)/g,">");
                promptXMLArray[editIndex] = xml;
                
                $(this).clearForm();
                $('.collapse').collapse();
                
                //reset value
                isEdit = false;
                editIndex = -1;  
                document.getElementById("add prompt").innerHTML="Add Prompt";
            }       
            update();
        }
	}); // end click
     
    /*
        Click Ok on the Prompt type overlay window
    */
    $('#PromptBoxOK').click(function(){
        $('#addedPrompt').empty();
        var promptType = $('#groupPromptType').val();
        var header = promptType + "\n";
        if (promptType == "Multiple Choice" || promptType == "Multiple Choice Custom") {
            var text, value;
            text = $('#MultipleChoiceAnswer').val(); 
            text = text.replace("\r\n", "\n"); 
            text = text.split("\n");
            value = $('#MultipleChoiceValue').val(); 
            value = value.replace("\r\n", "\n"); 
            value = value.split("\n");
            
            lenText = text.length;
            lenVal = value. length;
            var answers = "";
            for (i = 0; i < lenText; i++)
            {
               if (i < lenVal) {
                answers += text[i] + ":" + value[i] + "\n";               
               }
               else {
                answers += text[i] + ":" + "\n";  
               }
            }
        }
        else if (promptType == "Number") {
            var min = $('#minNumber').val();
            var max = $('#maxNumber').val();
            var answers = "min:" + min + "\n" + "max:" + max;
        }
        else if (promptType == "Photo") {
            var res = $('#resPhoto').val();
            var answers = "Resolution:" + res;
        }
        else if (promptType == "Remote Activity") {
            var pack = $('#packageRemote').val();
            var activity = $('#activityRemote').val();
            var action = $('#actionRemote').val();
            var auto = $('#autolaunchRemote').val();
            var retry = $('#retriesRemote').val();
            var min = $('#minrunRemote').val();
            var input = $('#inputRemote').val();
            var answers = "Package:" + pack + "\n"
                          + "Activity:" + activity + "\n"
                          + "Action:" + action + "\n"
                          + "Auto:" + auto + "\n"
                          + "Retry:" + retry + "\n"
                          + "Min run:" + min + "\n"
                          + "Input:" + input + "\n"           
        }
        else if (promptType == "Single Choice" || promptType == "Single Choice Custom") {
            var text, value;
            text = $('#SingleChoiceAnswer').val(); 
            text = text.replace("\r\n", "\n"); 
            text = text.split("\n");
            value = $('#SingleChoiceValue').val(); 
            value = value.replace("\r\n", "\n"); 
            value = value.split("\n");
            
            lenText = text.length;
            lenVal = value. length;
            var answers = "";
            for (i = 0; i < lenText; i++)
            {
               if (i < lenVal) {
                answers += text[i] + ":" + value[i] + "\n";               
               }
               else {
                answers += text[i] + ":" + "\n";  
               }
            }
        }
        else if (promptType == "Text") {
            var min = $('#minText').val();
            var max = $('#maxText').val();
            var answers = "Min:" + min + "\n" + "Max:" + max;  
        }
        $('#addedPrompt').val(answers);
        
        $('#PromptBox').animate({'top':'-300px'},500,function(){
            $('#data').empty();
            $('#overlay').fadeOut('fast');
        });       
    })
    
    /*
        ViewXML button
    */
    $('#viewXML').click(function(){
        $('#XMLdata').empty();
        var smlString = "";
        xmlString = createXMLString(promptXMLArray);
        $('textarea#XMLdata').css('height', '400px');
        $('textarea#XMLdata').css('width', '500px');
        $('textarea#XMLdata').val(vkbeautify.xml(xmlString));
        $('#XMLBox').animate({'top':'160px'},500);
    });
    $('#XMLBoxOK').click(function(){
        $('#XMLBox').animate({'top':'-300px'},500,function(){
            $('#XMLdata').empty();
            $('#overlayXML').fadeOut('fast');
            $('textarea#XMLdata').css('height', '50px');
            $('textarea#XMLdata').css('width', '50px');
        });
    });
    
    // Submit Button
    //TODO
    $('#submit').click(function(e) {
        // go through prompt array to get their data
        // then create prompt using campaign editor functions and save to storage
        jQuery.each(promptXMLArray, function(i, value) {
            if (typeArray[i] == "message") {
                console.log(value);
                var xml = $.parseXML(value);
                
                //get data from XML message object
                $xml = $(xml);
                var id = $xml.find("id").text();
                var messageText = $xml.find("messageText").text();
                var condition = $xml.find("condition").text();
                
                // call campaign edirot function here
                // TO DO
            }
            else if (typeArray[i] == "prompt") {
                // get data from XML object
                $xml = $(xml);
                var id = $xml.find("id").text();
                var displayLabel = $xml.find("displayLabel").text();
                var displayType = $xml.find("displayType").text();
                var promptText = $xml.find("promptText").text();
                var abbreviatedText = $xml.find("abbreviatedText").text();
                var promptType = $xml.find("promptType").text();
                var defaultValue = $xml.find("default").text();
                var condition = $xml.find("condition").text();
                var skippable = $xml.find("skippable").text();
                var skipLabel = $xml.find("skipLabel").text();
                // properties
                // need fix depend on how the campaign editor function handle properties
                var properties = ""
                $(xml).find('property').each(function(){
                    var label = $(this).find('label').text();
                    var value = $(this).find('value').text();
                    properties = label + ":" + value + '\n';
                });
                
                // call campaign edirot function here
                // TODO
            }
            else if (typeArray[i] == "repeatable") {
                // TODO
            }
        });
    });
}); // end ready