// overlay box script from : http://tympanus.net/codrops/2009/12/03/css-and-jquery-tutorial-overlay-with-slide-out-box/

var promptArray = new Array(); // array JSON prompt
var index = 0; // array index
var isEdit = false;
var editIndex = 0;

function openAccordion(index) {
        var obj = jQuery.parseJSON(promptArray[index][0]);
        $('.collapse').collapse('show');
        $('textarea#messageText').val(promptArray[index][0].value);
        document.getElementById("create message").innerHTML="Edit Message";
        isEdit = true;
        editIndex = index;
}

$(document).ready(function() {
    
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
    
    // Show prompt at the top of the page
    
    
    $('#Edit').click(function() {
        alert('Edit');
    });
    
    function showValues() {
        $("#previousItem").empty();
        jQuery.each(promptArray, function(index, JSONvalue) {
            $("#previousItem").append("<tr>"
                                      + "<th>"
                                      + index + ":" + promptArray[index][0].value
                                      + "</th>"
                                      + "<th>"
                                      //+ '<button type="button" id="Edit">Edit</button>' 
                                      + '<a href="#newMessage" onclick="openAccordion(' + index + '); return false;" id="Edit">Edit</a>'
                                      + "</th>"
                                      + "</tr>");
        });
    }
    
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
      });
    };
    

    var fields = $('#message-form').serializeArray();
    // submit message and save to JSON object
    $('#message-form').submit(function(event) {
		// saving to JSON
        //alert('test');
        if (isEdit == false) { // create
            event.preventDefault();
            promptArray[index] = ($(this).serializeArray());
            index++;
            console.log(promptArray);
            $(this).clearForm();
            $('.collapse').collapse();
            showValues();
        }
        else { // edit, not create
            event.preventDefault();
            promptArray[editIndex] = ($(this).serializeArray());
            $(this).clearForm();
            $('.collapse').collapse();
            //reset value
            isEdit = false;
            document.getElementById("create message").innerHTML="Create Message";
            showValues();
        }
        
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
        $('#MultipleChoiceBox').animate({'top':'-300px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
    })
    $('#MultipleChoiceOK').click(function(){
        var test = $("textarea#MultipleChoiceQuestion").val();
        alert(test);
        $('#NumberBox').animate({'top':'-300px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
    })
    
}); // end ready