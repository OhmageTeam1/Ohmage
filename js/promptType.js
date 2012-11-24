/*
Prompt type dropdown
*/
function displayPrompt() {
    
    var promptType = $('#groupPromptType').val();
    var isAnimate = true;
    $('#data').empty();
    $('#data').append('<h3>' + promptType + '</h3>');
    if (promptType == "Multiple Choice" || promptType == "Multiple Choice Custom") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p>Type each answer on the left box and its corresponding value on the right box, follow by a new line</p>');
        $('#data').append('<textarea type="text" placeholder="Answers" id="MultipleChoiceAnswer"></textarea>');
        $('#data').append('<textarea type="text" placeholder="Values" id="MultipleChoiceValue"></textarea>');
        });
    }
    else if (promptType == "Number") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p><input type="text" id="minNumber" placeholder="Min"/></p>');
        $('#data').append('<p><input type="text" id="maxNumber" placeholder="Max"/></p>');
        });
    }
    else if (promptType == "Photo") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p><input type="text" id="resPhoto" placeholder="Resolution"/></p>');
        });
    }
    else if (promptType == "Remote Activity") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p><input type="text" id="packageRemote" placeholder="Package"/></p>');
        $('#data').append('<p><input type="text" id="activityRemote" placeholder="Activity"/></p>');
        $('#data').append('<p><input type="text" id="actionRemote" placeholder="Action"/></p>');
        $('#data').append('<p><input type="text" id="autolaunchRemote" placeholder="Auto Launch"/></p>');
        $('#data').append('<p><input type="text" id="retriesRemote" placeholder="Retries"/></p>');
        $('#data').append('<p><input type="text" id="minrunRemote" placeholder="Min Run"/></p>');
        $('#data').append('<p><input type="text" id="inputRemote" placeholder="Input"/></p>');
        });
    }
    else if (promptType == "Single Choice" || promptType == "Single Choice Custom") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p>Type each answer follow by a new line</p>');
        $('#data').append('<textarea type="text" placeholder="Answers" id="SingleChoiceAnswer"></textarea>');
        $('#data').append('<textarea type="text" placeholder="Values" id="SingleChoiceValue"></textarea>');
        });
    }
    else if (promptType == "Text") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').append('<p><input type="text" id="minText" placeholder="Min"/></p>');
        $('#data').append('<p><input type="text" id="maxText" placeholder="Max"/></p>');
        });
    }
    else if (promptType == "Timestamp") {
        // doing nothing
        isAnimate = false;
    }
    else {
        isAnimate = false;
    }
    if (isAnimate) {
        $('#PromptBox').animate({'top':'160px'},500);
    }    
}