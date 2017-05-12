var state = {
	id: null,
	list: null
}


var listTemplate = 

`<div class="card col span_1_of_3">
  <div class="card-block">
   
    
    <span id="trash-can" class="glyphicon glyphicon-trash"></span>
   
    <p class="card-title"></p>
    
    <p class="card-text"></p>
    
    <button class="view-list">View/Edit List</button>
  </div>
</div>`


var listAddTemplate = 
`<form id="add-list-form" class="card w-75">
	  <div class="card-block">
	  	<form class="list-add-form">
	  	<label>List Name:</label>
	    <input id="list-name" class="card-title input" placeholder="required"></input>
	  
	    <label>List Description:</label>
	    <input id="list-description" class="card-text input" placeholder="optional"></input>
	    <button type="submit" class="add-items">Create List</button>
	  </div>
</form>`




var LISTS_URL = '/lists';

  


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
	$('.create-list-section').append(html);
})


$('.logout').click(function() {
	window.location = 'index.html';
});




 function getAndDisplayLists() {
 	console.log('displaying list');
 	$.ajax({
    method: 'GET',
    url: LISTS_URL,
    
    success: function(data) {
    	var listElement = data.map(function(list){
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
      
    },
    headers: {
			Authorization: localStorage.headers
		}
	});
    
 }






function addList(list) {
  console.log('Adding list');
  $.ajax({
    method: 'POST',
    url: LISTS_URL,
    data: JSON.stringify(list),
    success: function(data) {
    	getAndDisplayLists();	
      
    },
    headers: {
			Authorization: localStorage.headers
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
 
    dataType: 'json',
    success: getAndDisplayLists,
    contentType: 'application/json',
    headers: {
			Authorization: localStorage.headers
		}
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


function handleListDelete() {
	console.log('removing list');
	$('.list-section').on('click', '#trash-can', function(e){
		e.preventDefault();
		deleteList(
			$(e.currentTarget).closest('.card').attr('id'));
	} );
}





$(function() {
  getAndDisplayLists();
  handleListAdd();
  handleListDelete();
});

