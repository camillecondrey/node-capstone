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
	console.log(username, password);
	$.ajax({ 
		url: '/users/me', 
		type: 'GET',
		headers: {
			Authorization: "Basic "+ btoa(username+ ":"+ password)
		}, 
		
		 success: function(got) { 
			localStorage.headers = "Basic "+ btoa(username+ ":"+ password);
			window.location = 'profile.html';
		} 

	});
	console.log('help me out here buddy')
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