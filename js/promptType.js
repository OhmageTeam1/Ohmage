$(function() {
    $('#multiChoiceSubmit').click(function() {
        var answers = $('#multiChoiceAnswer').val().replace('\r\n', '\n').split('\n');
        var values = $('#multiChoiceValue').val().replace('\r\n', '\n').split('\n');

        var properties = "";
        for (var i = 0; i < answers.length; ++i) {
            if (i < values.length) {
                properties += answers[i] + ':' + values[i] + '\n';
            } else {
                properties += answers[i] + ':\n'
            }
        }

        $('#addedPrompt').val(properties);

        $('#multiChoiceAnswer').val('');
        $('#multiChoiceValue').val('');
        $('#multiChoiceModal').modal('hide');
    });

    $('#singleChoiceSubmit').click(function() {
        var answers = $('#singleChoiceAnswer').val().replace('\r\n', '\n').split('\n');
        var values = $('#singleChoiceValue').val().replace('\r\n', '\n').split('\n');

        var properties = "";
        for (var i = 0; i < answers.length; ++i) {
            if (i < values.length) {
                properties += answers[i] + ':' + values[i] + '\n';
            } else {
                properties += answers[i] + ':\n'
            }
        }

        $('#addedPrompt').val(properties);

        $('#singleChoiceAnswer').val('');
        $('#singleChoiceValue').val('');
        $('#singleChoiceModal').modal('hide');
    });

    $('#numberSubmit').click(function() {
        var minNum = $('#minNumber').val();
        var maxNum = $('#maxNumber').val();
        var properties = "min:" + minNum + "\n" + "max:" + maxNum;

        $('#addedPrompt').val(properties);

        $('#minNumber').val('');
        $('#maxNumber').val('');
        $('#numberModal').modal('hide');
    });

    $('#photoSubmit').click(function() {
        var resolution = $('#maxRes').val();
        var properties = "resolution:" + resolution;

        $('#addedPrompt').val(properties);

        $('#maxRes').val('');
        $('#photoModal').modal('hide');
    });

    $('#textSubmit').click(function() {
        var min = $('#minTextLength').val();
        var max = $('#maxTextLength').val();
        var properties = "Min:" + min + "\n" + "Max:" + max;

        $('#addedPrompt').val(properties);

        $('#minTextLength').val('');
        $('#maxTextLength').val('');
        $('#textModal').modal('hide');
    });

    $('#remoteActivitySubmit').click(function() {
        var pack = $('#packageRemote').val();
        var activity = $('#activityRemote').val();
        var action = $('#actionRemote').val();
        var auto = $('#autolaunchRemote').val();
        var retry = $('#retriesRemote').val();
        var min = $('#minrunRemote').val();
        var input = $('#inputRemote').val();
        var properties = "Package:" + pack + "\n"
                      + "Activity:" + activity + "\n"
                      + "Action:" + action + "\n"
                      + "Auto:" + auto + "\n"
                      + "Retry:" + retry + "\n"
                      + "Min run:" + min + "\n"
                      + "Input:" + input + "\n"  

        $('#addedPrompt').val(properties);

        $('#packageRemote').val('');
        $('#activityRemote').val('');
        $('#actionRemote').val('');
        $('#autolaunchRemote').val('');
        $('#retriesRemote').val('');
        $('#minrunRemote').val('');
        $('#inputRemote').val('');
        $('#remoteActivityModal').modal('hide');
    });



});