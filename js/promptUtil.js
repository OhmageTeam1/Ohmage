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

    // loop through prompt array and get the id
    jQuery.each(promptXMLArray, function(i, value) {
        var xml = $.parseXML(promptXMLArray[i]);
        var id = $(xml).find("id").text();
        var link = "#";
        if (typeArray[i] == "message") {
            link = "#newMessage";
        }
        else if (typeArray[i] == "message") {
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
        var displayType = $xml.find("displayType").text();
        var promptText = $xml.find("promptText").text();
        var abbreviatedText = $xml.find("abbreviatedText").text();
        var promptType = $xml.find("promptType").text();
        var pDefault = $xml.find("default").text();
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
        console.log(promptType);
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
    var tmp = promptArr[index_a];
    promptArr[index_a] = promptArr[index_b];
    promptArr[index_b] = tmp;
    
    // swap type
    tmp = typeArr[index_a];
    typeArr[index_a] = typeArr[index_b];
    typeArr[index_b] = tmp;
}

/* 
    Open condtion overlay box. Called when click on any condition text box
*/
function openConditionBox(id) {
    // create a prompt list drop down from prompt array
    console.log(id);
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