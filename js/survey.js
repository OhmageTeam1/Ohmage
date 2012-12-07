var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);

$(function() {
    
    $('#surveyTitle').focus();

    $('.formToggleBtn').click(function(e) {
        var $this = $(this);
        var toToggle = $this.attr('id').replace('Add', '').replace('Remove', '');
        $('#' + toToggle + 'Add').fadeToggle('slow');
        $('.' + toToggle + 'Input').slideToggle('slow');
        e.preventDefault();
    });

    $('#showSummary').change(function() {
        $('.summaryTextInput').slideToggle('slow');
        $('.editableSummaryInput').slideToggle('slow');
    });

    $('#surveyForm').submit(function(e) {
        var surveyData = {};

        // Extract all form data and show error to user if present
        surveyData['title'] = $('#surveyTitle').val();
        surveyData['description'] = false;
        // Check if field is hidden, and if so, don't include it
        if (!$('#surveyDescription').hasClass('hide')) {
            surveyData['description'] = $('#surveyDescription').val();
        }
        surveyData['introText'] = false;
        // Check if field is hidden, and if so, don't include it
        if (!$('.introTextInput').hasClass('hide')) {
            surveyData['introText'] = $('#surveyIntroText').val();
        }
        surveyData['submitText'] = $('#surveySubmitText').val();
        surveyData['showSummary'] = $('#showSummary').attr('checked') ? true : false;
        surveyData['summaryText'] = false;
        surveyData['editableSummary'] = false;
        if (surveyData['showSummary']) {
            surveyData['summaryText'] = $('#surveySummaryText').val();
            surveyData['editableSummary'] = $('#editSummary').attr('checked') ? true : false;
        }
        surveyData['anytime'] = $('#surveyAnytime').attr('checked') ? true : false;

        var success = campaignEditor.addSurvey(campaignWrapper['campaign'], surveyData);
        
        if (!success) {
            var errorAlert = '<div class="alert alert-error createSurveyError hide"><button class="close">&times;</button><strong>Error:</strong> A required field is missing!</div>';
            $(errorAlert).insertAfter('.newSurvey hr').slideToggle();
            if($('.createSurveyError').size() > 1) {
                $('.createSurveyError').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
            }
            e.preventDefault();
        } else {
            $.cookie('currentSurvey', campaignWrapper['campaign']['surveys']['survey'].length - 1);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
        }
    });
});