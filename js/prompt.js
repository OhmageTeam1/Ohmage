// overlay box script from : http://tympanus.net/codrops/2009/12/03/css-and-jquery-tutorial-overlay-with-slide-out-box/

var promptArray = new Array(); // array of JSON prompt
var typeArray = new Array(); // array of type (message, prompt, etc..)
var arrayIndex = 0; // array index
var isEdit = false;
var editIndex = 0;

function showValues() {
    $("#previousItem").empty();
    
    jQuery.each(promptArray, function(i, JSONvalue) {
        $("#previousItem").append("<tr>"
                                 + "<th>"
                                 + i + ":" + promptArray[i][0].value
                                 + "</th>"
                                 + "<th>"
                                 + '<a href="#newMessage" onclick="openAccordion(' + i + '); return false;" id="Edit">Edit</a>'
                                 + "</th>"
                                 + "<th>"
                                 + '<a href="#" onclick="deletePrompt(' + i + '); return false;" id="Delete">Delete</a>'
                                 + "</th>"
                                 + "</tr>");
        });
}
    
function openAccordion(index) {
    var obj = jQuery.parseJSON(promptArray[index]);
    $('#newMessage').collapse('show');
    //document.getElementById("newMessage").collapse('show');
    $('textarea#messageText').val(promptArray[index][0].value);
    document.getElementById("create message").innerHTML="Edit Message";
    isEdit = true;
    editIndex = index;
}
function deletePrompt(curr_index) {
    promptArray.splice(curr_index, 1);
    //index--;
    showValues();
}
function swapArrayElem(prompt, type, index_a, index_b) {
    var tmp = prompt[index_a];
    prompt[index_a] = prompt[index_b];
    prompt[index_b] = tmp;
    
    // swap type
    tmp = type[index_a];
    type[index_a] = type[index_b];
    type[index_b] = tmp;
}
function loadOverlay() {
    //loads popup only if it is disabled  
    if($("#bgPopup").data("state")==0){  
        $("#bgPopup").css({  
            "opacity": "0.7"  
        });  
        $("#bgPopup").fadeIn("medium");  
        $("#condition_container").fadeIn("medium");  
        $("#bgPopup").data("state",1);  
    }
}
function centerPopup(){  
    var winw = $(window).width();  
    var winh = $(window).height();  
    var popw = $('#condition_container').width();  
    var poph = $('#condition_container').height();  
    $("#condition_container").css({  
        "position" : "absolute",  
        "top" : winh/4-poph/2,  
        "left" : winw/4-popw/2  
    });  
}
function disablePopup(){  
    if ($("#bgPopup").data("state")==1){  
        $("#bgPopup").fadeOut("medium");  
        $("#condition_container").fadeOut("medium");  
        $("#bgPopup").data("state",0);  
    }  
}

// click the condition text box
function conditionClick() {
    centerPopup();
    
    // create drop down from prompt array
    $("#promptIDList").empty();
    jQuery.each(promptArray, function(i, JSONvalue) {
        var val = promptArray[i][0].value;
        $("#promptIDList").append("<option value=" + val + ">" + val + "</option>");
    });
    
    loadOverlay();
}
    
$(document).ready(function() {

    /*
    Condition text box section
    */
    $("#bgPopup").data("state",0);  
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
        $('#condition').val(condition);
        disablePopup();
        
    });
    $("input:radio[name=condType]").click(function() {
        var value = $(this).val();
        if (value == "Advance") {
            $("#condType").empty();
            $("#condType").append("<input type='text' name='Condition' id='advanceCondition' placeholder='Input condition' />");
        }
        else {
            $("#condType").empty();
            $("#condType").append("<select id='promptIDList'>" + 
                                  "</select>" +
                                  "<select id='operator'>" +
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
            jQuery.each(promptArray, function(i, JSONvalue) {
                var val = promptArray[i][0].value;
                $("#promptIDList").append("<option value=" + val + ">" + val + "</option>");
            });
        }
    });
    
    /*
    Previous item area
    */
    $( "#previousItem" ).sortable({
			start: function(event, ui) {
                ui.item.startPos = ui.item.index();
            },
            stop: function(event, ui) {
                console.log("Start position: " + ui.item.startPos);
                console.log("New position: " + ui.item.index());
                swapArrayElem(promptArray, typeArray, ui.item.startPos, ui.item.index());
                console.log(promptArray);
                console.log(typeArray);
                showValues();
            }
    });
    $( "#previousItem" ).disableSelection();
    $('.collapse').collapse();
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
    
    /*
    function displayPrompt() {
        $('#data').empty();
        var promptType = $('#groupPromptType').val();
        if (promptType == "Multiple Choice") {
            $('#overlay').fadeIn('fast',function(){
            $('#data').empty();
            $('#data').append('<h2>Multiple Choice</h2>');
            $('#data').append('<p>Type each question follow by a new line</p>');
            $('#data').append('<textarea type="text" placeholder="Question" id="MultipleChoiceQuestion"></textarea>');
            $('#MultipleChoiceBox').animate({'top':'160px'},500);
            });
        }
    }
    */
    // This function wiil clear (reset) the form
    // credit goes to: http://www.learningjquery.com/2007/08/clearing-form-data
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
    
    // submit message and save to JSON object
    $('#message-form').submit(function(event) {
		// saving to JSON
        //alert('test');
        if (isEdit == false) { // create
            event.preventDefault();
            temp = ($(this).serializeArray());
            promptArray.push(temp);
            typeArray.push("message");
            console.log(promptArray);
            console.log(typeArray);
            $(this).clearForm();
            $('.collapse').collapse();
            showValues();
        }
        else { // edit, not create
            event.preventDefault();
            temp = ($(this).serializeArray());
            promptArray[editIndex] = temp;
            $(this).clearForm();
            $('.collapse').collapse();
            //reset value
            isEdit = false;
            document.getElementById("create message").innerHTML="Create Message";
            showValues();
        }
        
	}); // end click
   
    // submit prompt and save to JSON object
    $('#campaign-form').submit(function(event) {
        
		// saving to JSON
        if (isEdit == false) { // create
            event.preventDefault();
            temp = ($(this).serializeArray());
            console.log(temp);
            promptArray.push(temp);
            typeArray.push("prompt");
            console.log(promptArray);
            console.log(typeArray);
            $(this).clearForm();
            $('.collapse').collapse();
            showValues();            
        }
        /*
        else { // edit, not create
            event.preventDefault();
            temp = ($(this).serializeArray());
            promptArray[editIndex] = temp[0];
            $(this).clearForm();
            $('.collapse').collapse();
            //reset value
            isEdit = false;
            document.getElementById("create message").innerHTML="Create Message";
            showValues();
        }
        */
	}); // end click
    
    $("select").change(displayPrompt);
    displayPrompt();
    //showValues();
    /*
    This section is for reference, please do not delete it
    $("input:radio[name=groupPromptType]").click(function() {
        var value = $(this).val();
        if (value == 'Multiple Choice') {
            $('#overlay').fadeIn('fast',function(){
            $('#MultipleChoiceBox').animate({'top':'160px'},500);
            });
        }
        else if (value == 'Number') {
            $('#overlay').fadeIn('fast',function(){
            $('#NumberBox').animate({'top':'160px'},500);
            });
        }
        else if (value == 'Single Choice') {
          
        }
    });
    */
    $('#boxclose').click(function(){
        $('#PromptBox').animate({'top':'-300px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
    })
    $('#PromptBox').click(function(){
        $('#PromptBox').animate({'top':'-300px'},500,function(){
            $('#data').empty();
            $('#overlay').fadeOut('fast');
        });
    })
    
    
    
    
}); // end ready