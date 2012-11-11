$(document).ready(function() {
	$('button').click(function() {
		// saving to JSON
		var title = $('#campaignTitle').val();
		var campaign = {title:title};
	}); // end click
}); // end ready