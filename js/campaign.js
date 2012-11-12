$(function() {
    $.post("https://test.ohmage.org/app/user_info/read", { auth_token: $.cookie('authToken'), client: "campaign-webapp" },
        function(response) {
            if(response.result === "success"){
                var campaignCount = 0;
                $.each(response.data[$.cookie('username')].campaigns, function(index, val) {
                    $('.campaign-select').append('<option value="' + index + '">' + val + "</option>");
                    campaignCount++;
                });
                if(campaignCount === 0) {
                    $('.existing-campaigns').remove();
                }
            }
        }, "json");

    $('#create-campaign').click(function(button) {
        var title = $('#campaignTitle').val();
        var campaign = {title:title};
        window.location.replace('survey.php');
        button.preventDefault();
    });
});