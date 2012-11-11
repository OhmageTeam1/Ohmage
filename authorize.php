<?php
	function authorize_user() {
		if(!isset($_COOKIE['auth_token'])) {
			header('Location: login.html');
			exit();
		}
	}
?>