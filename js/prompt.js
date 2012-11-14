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
    $('#boxclose').click(function(){
        $('#MultipleChoiceBox').animate({'top':'-300px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
    })
    $('#NumberOK').click(function(){
        $('#NumberBox').animate({'top':'-300px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
    })
    
}); // end ready