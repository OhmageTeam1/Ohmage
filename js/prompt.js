// overlay box script from : http://tympanus.net/codrops/2009/12/03/css-and-jquery-tutorial-overlay-with-slide-out-box/

$(document).ready(function() {
	$('button').click(function() {
		// saving to JSON
	}); // end click
    
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
    
   
    $("select").change(displayPrompt);
    displayPrompt();
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