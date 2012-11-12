$(document).ready(function() {
	$('button').click(function() {
		// saving to JSON
		
		// go to next page
		window.location.replace('prompt.php');
	}); // end click
    var label = $('#surveySummaryTextLabel').text();
    $('#showSummary').change(function() { 
        if (this.checked) {
            $('#surveySummaryText').removeAttr('disabled');
            $('#surveySummaryTextLabel').append('<span class="label label-info">Required</span>');
            $('#editSummary').removeAttr('disabled');
        }
        else {
            $('#surveySummaryText').attr('disabled', 'disabled');
            $('#surveySummaryTextLabel').html(label);
            $('#editSummary').attr('disabled', 'disabled');
        }
    });
}); // end ready