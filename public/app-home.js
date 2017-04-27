$(function() {
	$('.sign-up-form').on('submit', function(event) {
		event.preventDefault();
		signUp($('#username').val(), $('#sign-up-password').val());
	})
})

$(function () {
	$('.log-in-form').on('submit', function(event) {
		event.preventDefault();
		logIn($('#email').val(), $('#password').val());
	});
})


function signUp (username, password) {
	console.log('creating user account');
	$.ajax({ 
		url: '/users', 
		type: 'POST', 
		data: JSON.stringify({username, password}), 
		contentType: 'application/json', success: function(got) { 
			localStorage.headers = "Basic "+ btoa(username+ ":" + password)
			window.location = 'profile.html';
		} 
	});
}

function logIn (username, password) {
	console.log('logging user in');
	$.ajax({ 
		url: '/users/me', 
		type: 'GET',
		headers: {
			authorization: "Basic "+ btoa(username+ ":"+ password)
		}, 
		data: JSON.stringify({username, password}), 
		contentType: 'application/json'
		, success: function(got) { 
			localStorage.headers = "Basic "+ btoa(username+ ":"+ password);
			window.location = 'profile.html';
		} 
	});
}

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