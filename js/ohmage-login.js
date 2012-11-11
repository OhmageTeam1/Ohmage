$(function() {
    $("#login-form").submit(function() {
        var $this = $(this);
        var inputUsername = $this.find("#inputUsername").val();
        var inputPassword = $this.find("#inputPassword").val();
        $.post("https://test.ohmage.org/app/user/auth_token", { user: inputUsername, password: inputPassword, client: "campaign-webapp" }, function(response) {
            if (response.result == "success") {
                $.cookie("auth_token", response.token);
                window.location.href('campaign.html'); 
            }
            else {
                var errorAlert = '<div class="alert alert-block alert-error hide"><button class="close">&times;</button><strong>Login Failed: </strong>' + response.errors[0].text + '</div>';
                $(errorAlert).prependTo('.content').slideToggle();
            }
        }, "json");
        return false;
    });
});