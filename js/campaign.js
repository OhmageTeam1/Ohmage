$(function() {
    // Get existing campaigns
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

    // Privacy State Button
    $('#runningStateBtn').click(function(button) {
        var $this = $(this);
        $this.toggleClass('btn-success btn-danger');
        if ($this.html() === 'Running') {
            $this.html('Stopped');
        } else {
            $this.html('Running')
        }
        button.preventDefault();
    });

    // Running State Button
    $('#privacyStateBtn').click(function(button) {
        var $this = $(this);
        $this.toggleClass('btn-success btn-danger');
        if ($this.html() === 'Shared') {
            $this.html('Private');
        } else {
            $this.html('Shared')
        }
        button.preventDefault();
    });

    // Create Campaign Button
    $('#create-campaign').click(function(button) {
        var title = $('#campaignTitle').val();
        var campaignWrapper = {
            'privacyState': $('#privacyStateBtn').html(),
            'runningState': $('#runningStateBtn').html(),
            'campaign': campaignEditor.createCampaign(title)
        };

        localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
    });
});