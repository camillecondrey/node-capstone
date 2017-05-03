var listTemplate = 
`<div class="card w-75">
  <div class="card-block">
    <p class="card-title"></p>
    
    <p class="card-text"></p>
    
    <button class="view-list">View List</button>
  </div>
</div>`


var listAddTemplate = 
`<form id="add-list-form" class="card w-75">
	  <div class="card-block">
	  	<form class="list-add-form">
	  	<label>List Name</label>
	    <input id="list-name" class="card-title" placeholder="required"></input>
	    <!-- <p class="item-count">8 items</p> -->
	    <label>List Description
	    <input id="list-description" class="card-text" placeholder="optional"></input>
	    <button type="submit" class="add-items">Add Items</button>
	  </div>
</form>`




var LISTS_URL = '/lists';

//third
// function createListPage() {
//   console.log('creating list')
//   $.getJSON(LISTS_URL, function(lists) {
//     console.log('Rendering lists');
//     getAndDisplayLists(lists);
// 	})	
// }    



//first
$('.create').click(function(){
	var html = $(listAddTemplate);
	console.log('testingggg');
	event.preventDefault();
	html.on('submit', function(event) {
		event.preventDefault();
		let list = {
			name: $('#list-name').val(),
			description: $('#list-description').val()
		}
		addList(list);
	})
	$('.list-section').append(html);
})


//fourth
 function getAndDisplayLists() {
 	console.log('displaying list');
 	$.getJSON(LISTS_URL, function(lists) {
 		
 	var listElement = lists.map(function(list){
	 	var element = $(listTemplate);
	 	element.attr('id', list._id);
	 	element.find('.card-title').html(list.name);
	 	element.find('.card-text').html(list.description);	
	 	element.find('.view-list').click(function(){
	 		window.location = 'lists.html?id=' + list._id;
	 	})
 	
 	return element;
	 });
 $('.list-section').html(listElement);	
});
}





//second
function addList(list) {
  console.log('Adding list');
  $.ajax({
    method: 'POST',
    url: LISTS_URL,
    data: JSON.stringify(list),
    success: function(data) {
    	getAndDisplayLists();	
      
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function deleteList(listId) {
  console.log('Deleting list');
  $.ajax({
    url: LISTS_URL + '/' + listId,
    method: 'DELETE',
    success: getAndDisplayLists
  });
}


function updateList(list) {
  console.log('Updating list');
  $.ajax({
    url: LISTS_URL + '/' + list.id,
    method: 'PUT',
    data: list,
    success: function(data) {
      getAndDisplayLists();
    }
  });
}


function handleListAdd() {
  $('#list-add-form').submit(function(e) {
    e.preventDefault();
    
    addList({
      name: $(e.currentTarget).find('#list-name').val(),
      ingredients: $(e.currentTarget).find('#list-description').val()
    });
  });
}






$(function() {
  getAndDisplayLists();
  handleListAdd();
});