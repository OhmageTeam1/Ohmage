$(function() {
   $('#username').html("Logged in as " + $.cookie('username'));
   $('.logout-button').click(function () {
		var r = window.confirm("All unsaved data will be lost");
		if (r == true)
		{
			$.post("https://test.ohmage.org/app/user/logout", { client: "campaign-webapp", auth_token: $.cookie('authToken')});
			$.removeCookie('authToken');
			$.removeCookie('username');
			window.location.replace('login.php');
		}
   });
});
