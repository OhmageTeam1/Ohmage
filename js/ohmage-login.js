$(function() {
    $("#login-form").submit(function() {
        var $this = $(this);
        var inputUsername = $this.find("#inputUsername").val();
        var inputPassword = $this.find("#inputPassword").val();
        $.post("https://test.ohmage.org/app/user/auth_token", { user: inputUsername, password: inputPassword, client: "campaign-webapp" }, function(data) {
            var authResponse = $.parseJSON(data);
            if (authResponse.result == "success") {
                $.cookie("auth_token", authResponse.token);
        $.post("https://test.ohmage.org/app/user/auth_token", { user: inputUsername, password: inputPassword, client: "campaign-webapp" }, function(response) {
            if (response.result == "success") {
                $.cookie("auth_token", response.token);
				var url = window.location.href.replace('/login.html', ''); 
                window.location = url + "/campaign.html";
            }
            else {
				$(".alert").alert('close');
                $('<div class="alert alert-block alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>' + response.errors[0].text + '</div>').prependTo('.content');
            }
        }, "json");
        return false;
    });
});