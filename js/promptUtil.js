/***
    A collection of utiliti function for prompt pages
***/

/*
    This function will update after each change (add/edit):
        - number of question
        - the previous item section 
        - the list of prompt in repeatable set
*/
function update() {
    $("#previousItem").empty();
    $("#repeatPromptList").empty();
    
    var length = promptXMLArray.length;
    
    // update number of question
    $("#numQuestion").text(length);

    // get the id of each prompt in the prompt array and update them in the previous section
    jQuery.each(promptXMLArray, function(i, value) {
        var xml = $.parseXML(promptXMLArray[i]);
        var id = $(xml).find("id").text();
        var link = "#";
        if (typeArray[i] == "message") {
            link = "#newMessage";
        }
        else if (typeArray[i] == "prompt") {
            link = "#newPrompt";
        }
        // update previous prompt section
        $("#previousItem").append("<tr onmouseover='' style='cursor: pointer;'>"
                                 + "<th>"
                                 + i + ":" + id
                                 + "</th>"
                                 + "<th>"
                                 + '<a href="' + link + '" onclick="openAccordion(' + i + '); return false;" id="Edit">Edit</a>'
                                 + "</th>"
                                 + "<th>"
                                 + '<a href="#" onclick="deletePrompt(' + i + '); return false;" id="Delete">Delete</a>'
                                 + "</th>"
                                 + "</tr>");
                                 
        // update the list of prompt in repeatable set
        $("#repeatPromptList").append("<option value=" + id + ">" + id + "</option>");    
        });
}

/*
    This function will open corresonding accordion. It is called when authors click
    "Edit" link in the previous prompt section
    Input: an array index to determine if it's a message/prompt/repeatable
*/
function openAccordion(index) { 
    if (typeArray[index] == "message") {
        var xml = $.parseXML(promptXMLArray[index]);
        $('#newMessage').collapse('show');
        
        //get data from XML object
        $xml = $(xml);
        var id = $xml.find("id").text();
        var messageText = $xml.find("messageText").text();
        var condition = $xml.find("condition").text();
        
        // parse data back to form
        $('#messageID').val(id);
        $('#messageText').val(messageText);
        $('#conditionMessage').val(condition);
        
        document.getElementById("create message").innerHTML="Edit Message";
        isEdit = true;
        editIndex = index;
    }
    else if (typeArray[index] == "prompt") {
        var xml = $.parseXML(promptXMLArray[index]);
        $('#newPrompt').collapse('show');
        
        // get data from XML object
        $xml = $(xml);
        var id = $xml.find("id").text();
        var displayLabel = $xml.find("displayLabel").text();
        console.log(displayLabel);
        var displayType = $xml.find("displayType").text();
        var promptText = $xml.find("promptText").text();
        var abbreviatedText = $xml.find("abbreviatedText").text();
        var promptType = $xml.find("promptType").text();
        var defaultValue = $xml.find("default").text();
        var condition = $xml.find("condition").text();
        var skippable = $xml.find("skippable").text();
        var skipLabel = $xml.find("skipLabel").text();
        // properties
        var properties = ""
        $(xml).find('property').each(function(){
            var label = $(this).find('label').text();
            var value = $(this).find('value').text();
            properties = label + ":" + value + '\n';
        });
        
        // parse data back to form
        $('#promptID').val(id);
        $('#displayLabel').val(displayLabel);
        $('#displayType').val(displayType);
        $('#promptText').val(promptText);
        $('#abbreviatedText').val(abbreviatedText);
        $('#groupPromptType').val(promptType);
        $('#default').val(pDefault);
        $('#condition').val(condition);
        if (skippable == "on") {
            $('#skippable').prop('checked', true);;
        }
        $('#skipLabel').val(skipLabel);
        $('#addedPrompt').val(properties);
        
        document.getElementById("add prompt").innerHTML="Edit Prompt";
        isEdit = true;
        editIndex = index;
    }
}

/*
    Delete a prompt from the previous prompt section. Called when click "delete" in the previous prompt section
*/
function deletePrompt(curr_index) {
    promptXMLArray.splice(curr_index, 1);
    update();
}

/*
    Swap 2 prompt in the prompt array, also swap in the type array. Called when changing position of prompt
    in previous prompt section
    Input:
        - promptArr: the prompt array
        - typeArr: prompt type array
        - index_a, index_b: 2 index for swapping
*/
function swapArrayElem(promptArr, typeArr, index_a, index_b) {
    // swap data
    var tmp = promptArr[index_a];
    promptArr[index_a] = promptArr[index_b];
    promptArr[index_b] = tmp;
    
    // swap type
    tmp = typeArr[index_a];
    typeArr[index_a] = typeArr[index_b];
    typeArr[index_b] = tmp;
}

/*
    This function creates the prompt box base on the prompt type. Called when choose the prompt type from the drop down box
*/
function displayPrompt() {
    
    var promptType = $('#groupPromptType').val();
    var isAnimate = true; 
    $('#data').empty();
    $('#data').append('<h3>' + promptType + '</h3>');
    if (promptType == "Multiple Choice" || promptType == "Multiple Choice Custom") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p>Type each answer on the left box and its corresponding value on the right box, follow by a new line</p>');
        $('#data').append('<textarea type="text" placeholder="Answers" id="MultipleChoiceAnswer"></textarea>');
        $('#data').append('<textarea type="text" placeholder="Values" id="MultipleChoiceValue"></textarea>');
        });
    }
    else if (promptType == "Number") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p><input type="text" id="minNumber" placeholder="Min"/></p>');
        $('#data').append('<p><input type="text" id="maxNumber" placeholder="Max"/></p>');
        });
    }
    else if (promptType == "Photo") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p><input type="text" id="resPhoto" placeholder="Resolution"/></p>');
        });
    }
    else if (promptType == "Remote Activity") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p><input type="text" id="packageRemote" placeholder="Package"/></p>');
        $('#data').append('<p><input type="text" id="activityRemote" placeholder="Activity"/></p>');
        $('#data').append('<p><input type="text" id="actionRemote" placeholder="Action"/></p>');
        $('#data').append('<p><input type="text" id="autolaunchRemote" placeholder="Auto Launch"/></p>');
        $('#data').append('<p><input type="text" id="retriesRemote" placeholder="Retries"/></p>');
        $('#data').append('<p><input type="text" id="minrunRemote" placeholder="Min Run"/></p>');
        $('#data').append('<p><input type="text" id="inputRemote" placeholder="Input"/></p>');
        });
    }
    else if (promptType == "Single Choice" || promptType == "Single Choice Custom") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p>Type each answer follow by a new line</p>');
        $('#data').append('<textarea type="text" placeholder="Answers" id="SingleChoiceAnswer"></textarea>');
        $('#data').append('<textarea type="text" placeholder="Values" id="SingleChoiceValue"></textarea>');
        });
    }
    else if (promptType == "Text") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p><input type="text" id="minText" placeholder="Min"/></p>');
        $('#data').append('<p><input type="text" id="maxText" placeholder="Max"/></p>');
        });
    }
    else if (promptType == "Timestamp") {
        // doing nothing
        isAnimate = false; // no need for overlay window
    }
    else {
        isAnimate = false;
    }
    if (isAnimate) {
        $('#PromptBox').animate({'top':'160px'},500);
    }    
}

/* 
    Open condtion overlay box. Called when click on any condition text box
*/
function openConditionBox(id) {
    // create a prompt list drop down from prompt array
    $("#promptIDList").empty();                      
    jQuery.each(promptXMLArray, function(i, JSONvalue) {
        var xml = $.parseXML(promptXMLArray[i]);
        var val = $(xml).find("id").text();
        $("#promptIDList").append("<option value=" + val + ">" + val + "</option>");
    });
    $('#saveCondition').val(id);
    $('#ConditionBox').animate({'top':'160px'},500);
}

/*
    This function wiil clear (reset) the form. Called after click submit/edit on the form
    credit goes to: http://www.learningjquery.com/2007/08/clearing-form-data
*/
$.fn.clearForm = function() {
  return this.each(function() {
    var type = this.type, tag = this.tagName.toLowerCase();
    if (tag == 'form')
      return $(':input',this).clearForm();
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = '';
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    else if (tag == 'select')
      this.selectedIndex = -1;
    //special cases
    $('#skipLabel').attr('disabled', 'disabled');
    $('#skipLabelLabel').html(skipLabel);
  });
};

/*
    This function wiil serialize object into JSON form
    credit goes to: stackoverflow
*/
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (this.name != 'condType') {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        }
    });
    return o;
};

/*
    Saves the form to be cleared (after a setTimeout delay)
*/
function formCallback(form){
    return function() {
        form.clearForm();
    }
}

// Removes the survey item from the previous items list
function deleteItemCallback(item) {
    return function() {
        item.remove();
    }
}

function surveyItemError(text) {
    var errorAlert = '<div class="alert alert-error createItemError hide"><button class="close">&times;</button><strong>Error:</strong> ' + text + '</div>';
    $(errorAlert).prependTo('.addNewItem').slideToggle();
    if($('.createItemError').size() > 1) {
        $('.createItemError').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
    }
}

function deepCopy(source) {
    var newObject = (source instanceof Array) ? [] : {};
    for (i in source) {
        if (source[i] && typeof source[i] == "object") {
            newObject[i] = deepCopy(source[i]);
        } else {
            newObject[i] = source[i];
        } 
    }
    return newObject;
}