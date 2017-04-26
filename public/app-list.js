var MOCK_LIST_ITEM_UPDATES = {
	"listItemUpdates": [
		{
			"id": "1111111",
			"name": "pants",
			"description": "need these for beach trip",
			"price": "$20.00",
			"dateAdded": "4.12.17"
		},
		{
			"id": "2222222",
			"name": "silverware",
			"description": "",
			"price": "$30.00",
			"dateAdded": "4.12.17"
		},
		{
			"id": "3333333",
			"name": "dress",
			"description": "for sister's wedding",
			"price": "$100.00",
			"dateAdded": "4.12.17"
		},
		{
			"id": "4444444",
			"name": "open toe shoes",
			"description": "need for spring",
			"price": "$40.00",
			"dateAdded": "4.12.17"
		},

	]
}

function getRecentListUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_LIST_ITEM_UPDATES)}, 1);
}

function displayListItemUpdates(data) {
	for (index in data.listItemUpdates) {
       $('.list-items').append(
       	`<p>` + data.listItemUpdates[index].name + '</p>'
       	+ '<p>' + data.listItemUpdates[index].description + '</p>'
       	+ '<p>' + data.listItemUpdates[index].url + '</p>' + '<p>' + data.listItemUpdates[index].price + '</p>' );
   }
}


function getAndDisplayListItemUpdates() {
	getRecentListUpdates(displayListUpdates);
}

$(function() {
	getAndDisplayListItemUpdates();
})


var listTemplate = (
	'<div class="list">' + 
	'<input class="item-name" placeholder="item name"></input>'
	+ '<input class="decription" placeholder="item description"></input>'
	+ '<input class="url" placeholder="link to product"></input>'
	+ '<input class="price" placeholder="price"></input></div>');

$('.new-item').click(function(){
	var html = $(listTemplate);
	event.preventDefault();
	$('.next-item').append(html);
})