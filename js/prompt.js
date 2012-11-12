$(document).ready(function() {
	$('button').click(function() {
		// saving to JSON
	}); // end click
    
    $("input:radio[name=groupPromptType]").click(function() {
        var value = $(this).val();
        if (value == 'Multiple Choice') {
            $('#overlay').fadeIn('fast',function(){
            $('#MultipleChoiceBox').animate({'top':'160px'},500);
            });
        }
    });
    $('#boxclose').click(function(){
        $('#MultipleChoiceBox').animate({'top':'-300px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
    });
}); // end ready