$(function() {
	$('.sign-up-form').on('submit', function(event) {
		event.preventDefault();
		signUp($('#username').val(), $('#sign-up-password').val());
	});
}

function() {
	$('.log-in-form').on('submit', function(event) {
		event.preventDefault();
		logIn($('#email').val(), $('#password').val());
	});

}


function signUp (username, password) {
	$.ajax({ url: '/users', 
		type: 'POST', 
		data: JSON.stringify({username, password}), 
		contentType: 'application/json', success: function(got) { 
			localStorage.headers = "Basic "+ btoa(username+ ":" + password);
		} 
	});
}

function logIn (username, password) {
	$.ajax({ url: '/me', 
		type: 'POST',
		headers: {
			authorization: "Basic "+ btoa(username+ ":"+ password)
		} 
		data: JSON.stringify({username, password}), 
		contentType: 'application/json', success: function(got) { 
			localStorage.headers = "Basic "+ btoa(username+ ":"+ password);
		} 
	});
}
)
// function addProduct () {
// 	$.ajax({ url: '/me', 
// 		type: 'POST',
// 		headers: {
// 			authorization: localStorage.headers
// 		} 
// 		data: JSON.stringify({username, password}), 
// 		contentType: 'application/json', success: function(got) { 
// 		} 
// 	});
// }