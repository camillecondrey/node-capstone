var MOCK_LIST_ITEM_UPDATES = {
	"listItemUpdates": [
		{
			"id": "1111111",
			"name": "Ween ticket",
			"description": "for red rocks concert",
			"url": " ",
			"price": "$20.00",
			"dateAdded": "4.12.17"
		},
		{
			"id": "2222222",
			"name": "silverware",
			"description": "",
			"url": " ",
			"price": "$30.00",
			"dateAdded": "4.12.17"
		},
		{
			"id": "3333333",
			"name": "dress",
			"description": "for sister's wedding",
			"url": " ",
			"price": "$100.00",
			"dateAdded": "4.12.17"
		},
		{
			"id": "4444444",
			"name": "open toe shoes",
			"description": "need for spring",
			"url": " ",
			"price": "$40.00",
			"dateAdded": "4.12.17"
		},

	]
}

function addList(list){
	console.log('Adding list ');
	$.ajax({
		method: 'POST',
		url: '/list',
		data: JSON.stringify(list),
		success: function(data) {
			getAndDisplayListUpdates();
			console.log('xxx');
			window.location = 'profile.html';
		},
		dataType: 'json',
    	contentType: 'application/json'
	});
}

function addListItem(product) {
  console.log('Adding list item');
  $.ajax({
    method: 'POST',
    url: '/items',
    data: JSON.stringify(product),
    success: function(data) {
      getAndDisplayListItemUpdates();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function deleteListItem(productId) {
  console.log('Deleting list item `' + productId + '`');
  $.ajax({
    url: SHOPPING_LIST_URL + '/' + productId,
    method: 'DELETE',
    success: getAndDisplayListItemUpdates
  });
}

function updateListItem(product) {
  console.log('Updating list item `' + product.id + '`');
  $.ajax({
    url:  + '/' + product.id,
    method: 'PUT',
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayListItemUpdates()
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}


function getRecentListUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_LIST_ITEM_UPDATES)}, 1);
}

// var newItem = '<div class="item">' +
//        	'<h3>' + $('item-name').val() + '</h3>'
//        	+ '<p>' + $('input[description]').val() + '</p>'
//        	+ '<p>' + $('input[url]').val() + '</p>' + '<p>' + $('input[price]').val() + '</p>' 
//        	+ '<button class="check">Check</button><button class="delete">Remove</button></div>'

 // const newItem = `<div class="item">
 //       		<h3>$('item-name').val()</h3>
 //       	</div>`	

      	

function displayListItemUpdates(data) {
	
	for (index in data.listItemUpdates) {
		var html = `<div class="item">` +
       	`<h3>` + $('#item-name').val() + '</h3>'
       	+ '<p>' + data.listItemUpdates[index].description + '</p>'
       	+ '<p>' + data.listItemUpdates[index].url + '</p>' + '<p>' + data.listItemUpdates[index].price + '</p>' 
       	+ '<button class="check">Check</button><button class="delete">Remove</button></div>'
       $('.list-items').append(html);
   }
}

function displayListUpdates(data) {
    for (index in data.listUpdates) {
       $('.list-section').append(
        // '<p>' + data.listUpdates[index].text + '</p>');
  `<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-block">
        <h3 class="card-title">` + $('#list-name').val() + `</h3>
        <p class="card-text">` + $('#list-name').val() + `</p>
        <a href="lists.html" class="btn btn-primary">View List</a>
      </div>
    </div>
  </div>`);
    }
}

function handleListItemAdd() {

  $('.form-box').submit(function(e) {
    e.preventDefault();
    if (!$('#item-name').val()){
    	alert('Please enter item name');
    }
    else {
	    var newItem = {
				name: $('item-name').val(),
				description: $('item-description').val(),
				url: $('item-url').val(),
				price: $('item-price').val()
	} 
	    addListItem(newItem)
    }
  });
	$('.list-info').submit(function(e){
		e.preventDefault();
		if (!$('#list-name').val()) {
			alert('Please enter list name');
		}
		else {
		var newList = { 
				name: $('#list-name').val(), 
				description: $('#list-name').val() 
			}
		addList(newList)	
		}
	});

}

function getAndDisplayListItemUpdates() {
	getRecentListUpdates(displayListItemUpdates);
}

function getAndDisplayListUpdates() {
	getRecentListUpdates(displayListUpdates);
}


$(function() {
	handleListItemAdd();
	getAndDisplayListItemUpdates();
});








// function populateItem(){
// 	var name = $('input[name]').val();
// 	var description = $('input[description]').val();
// 	var url = $('input[url]').val();
// 	var price = $('input[price]').val();
// 	if (!name){
// 		alert('Please include item name');
// 	}
	

	
// }




// var itemTemplate = (
// 	`<div class="item">
// 	<p>${data.listItemUpdates[index].name}</p>
// 	<p>${data.listItemUpdates[index].description}</p>
// 	<p>${data.listItemUpdates[index].price}</p>
// 	</div>`)

// var itemTemplate = 
// `<div class="item">` +
//        	`<h3>` + data.listItemUpdates[index].name + '</h3>'
//        	+ '<p>' + data.listItemUpdates[index].description + '</p>'
//        	+ '<p>' + data.listItemUpdates[index].url + '</p>' + '<p>' + data.listItemUpdates[index].price + '</p>' 
//        	+ '<button class="check">Check</button><button class="delete">Remove</button></div>'


var listTemplate = (
	'<div class="list">' + 
	'<input class="item-name" placeholder="item name"></input>'
	+ '<input class="decription" placeholder="item description"></input>'
	+ '<input class="url" placeholder="link to product"></input>'
	+ '<input class="price" placeholder="price"></input></div>');

$('.new-item').click(function(){
	var html = $(listTemplate);
	event.preventDefault();
	$('.form-box').removeClass('hidden');
})