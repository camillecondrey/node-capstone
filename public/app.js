// var MOCK_LIST_UPDATES = {
// 	"listUpdates": [
// 		{
// 			"id": "1111111",
// 			"name": "pants",
// 			"description": "need these for beach trip",
// 			"price": "$20.00",
// 			"dateAdded": "4.12.17"
// 		},
// 		{
// 			"id": "2222222",
// 			"name": "silverware",
// 			"description": "",
// 			"price": "$30.00",
// 			"dateAdded": "4.12.17"
// 		},
// 		{
// 			"id": "3333333",
// 			"name": "dress",
// 			"description": "for sister's wedding",
// 			"price": "$100.00",
// 			"dateAdded": "4.12.17"
// 		},
// 		{
// 			"id": "4444444",
// 			"name": "open toe shoes",
// 			"description": "need for spring",
// 			"price": "$40.00",
// 			"dateAdded": "4.12.17"
// 		},

// 	]
// }

var MOCK_LIST_UPDATES = {
	"listUpdates": [
	{
		"id": "1111111",
		"title": "Summer clothes",
		"description": " ",

	},

	{
		"id": "2222222",
		"title": "Stuff I need from Target",
		"description": " ",

	},

	{
		"id": "3333333",
		"title": "Camping Trip",
		"description": "stuff I need for July 4th camping trip"
	},

	{
		"id": "4444444",
		"title": "Concert Tickets to purchase"
		"description": "upcoming Red Rocks season"
	}]
	}


function getRecentListUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_LIST_UPDATES)}, 1);
}

function displayListUpdates(data) {
    for (index in data.listUpdates) {
       $('.list-section').append(
        // '<p>' + data.listUpdates[index].text + '</p>');
  `<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-block">
        <h3 class="card-title">` + data.listUpdates[index].title + `</h3>
        <p class="card-text">` + data.listUpdates[index].description + `</p>
        <a href="#" class="btn btn-primary">View List</a>
      </div>
    </div>
  </div>`);
    }
}

function getAndDisplayListUpdates() {
	getRecentListUpdates(displayListUpdates);
}

$(function() {
	getAndDisplayListUpdates();
})