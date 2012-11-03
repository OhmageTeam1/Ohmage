$(function() {
    $("#login-form").submit(function() {
        var $this = $(this);
        var inputUsername = $this.find("#inputUsername").val();
        var inputPassword = $this.find("#inputPassword").val();
        $.post("https://test.ohmage.org/app/user/auth_token", { user: inputUsername, password: inputPassword, client: "campaign-webapp" }, function(data) {
            var authResponse = $.parseJSON(data);
            if (authResponse.result == "success") {
                $.cookie("auth_token", authResponse.token);
            }
            else {
                $('<div class="alert alert-error">WRONG PASSWORD, YO</div>').prependTo('.content');
            }
        });
        return false;
    });
	
	$('.dropdown-toggle').dropdown(function() (
		$('.z).text() = 'Change';
		return false;
	));
});