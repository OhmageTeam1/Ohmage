$(function() {
   $('#username').html("Logged in as " + $.cookie('username'));
   $('.logout-button').click(function () {
        if (confirm("Are you sure you want to log out? All unsaved data will be lost.")) {
            $.post("https://test.ohmage.org/app/user/logout", { client: "campaign-webapp", auth_token: $.cookie('authToken')});
            $.removeCookie('authToken');
            $.removeCookie('username');
            window.location.replace('login.php');
        }
   });
});
