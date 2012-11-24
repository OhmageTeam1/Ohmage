/*
Prompt type dropdown
*/
function displayPrompt() {
    $('#data').empty();
    var promptType = $('#groupPromptType').val();
    if (promptType == "Multiple Choice") {
        $('#overlay').fadeIn('fast',function(){
        $('#data').empty();
        $('#data').append('<h3>Multiple Choice</h3>');
        $('#data').append('<p><input type="text" id="questionText" placeholder="Question ?"/></p>');
        $('#data').append('<p>Type each answer follow by a new line</p>');
        $('#data').append('<textarea type="text" placeholder="Answers" id="MultipleChoiceQuestion"></textarea>');
        $('#PromptBox').animate({'top':'160px'},500);
        });
    }
}