var state = {
	id: null,
	list: null
}

var LISTS_URL = '/lists/';

//first
function addListItem(product) {
  console.log('Adding list item');
  state.list.items.push(product)
  $.ajax({
    method: 'PUT',
    url: LISTS_URL + state.id,
    data: JSON.stringify(state.list),
    success: function(data) {
      getAndDisplayListItemUpdates();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function deleteListItem(productId) {
  console.log('Deleting list item');

  $.ajax({
    url: LISTS_URL + state.id,
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

var newItemTemplate = 
`<div class="item">
       	<h3 id="item-name"></h3>
       	<p id="item-description"></p>
       	<p id="item-url"></p>
       	<p id="item-price"></p> 
       	<button class="check">Check</button><button class="delete">Remove</button>
</div>`

      	
//second
function getAndDisplayListItemUpdates() {
	
	console.log('displaying items')
	
	$.getJSON(LISTS_URL + state.id, function(list) {
 		state.list = list 
 	$('.list-name').html(list.name);
 		
 		var itemElement = list.items.map(function(item){
	 	var element = $(newItemTemplate);
	 	
	 	element.attr('id', item.id);
	 	element.find('#item-name').append(item.name);
	 	element.find('#item-description').append(item.description);
	 	element.find('#item-url').append(item.url);	
	 	element.find('#item-price').append(item.price);		
	 	return element;
 	});
 	$('.list-items').html(itemElement);	
 })
}

function handleListItemAdd() {

  $('.form-box').submit(function(e) {
    e.preventDefault();
    if (!$('#item-name').val()){
    	alert('Please enter item name');
    }
    else {
	    var newItem = {
				name: $('#item-name').val(),
				description: $('#item-description').val(),
				url: $('#item-url').val(),
				price: $('#item-price').val()
	} 
	    addListItem(newItem)
    }
  });
}

function handleListItemDelete() {
console.log('removing list');
	$('.list-items').on('click', '.delete', function(e){
		e.preventDefault();
		deleteListItem(
			$(e.currentTarget).closest('.item').attr('id'));
			
	});
}



// 	$('.delete').submit(function(e) {
// 		e.preventDefault();
// 		deleteListItem(item)
// 	})
// };


//may have to comment this out?
// function getAndDisplayListUpdates() {
// 	getRecentListUpdates(displayListUpdates);
// }


$(function() {
	state.id =location.search.split("id=")[1]
	handleListItemDelete();
	handleListItemAdd();
	getAndDisplayListItemUpdates();
});

$(function() {
	$('.list-submit').click(function(){
	 		window.location = 'profile.html?id=' 

})
});


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

