var state = {
	id: null,
	list: null
}

var LISTS_URL = '/lists/';


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
    contentType: 'application/json',
    headers: {
			authorization: localStorage.headers
		}
  });
}

function getMetaData(product) {
  console.log('get meta data');

  $.ajax({
    method: 'POST',
    url: LISTS_URL + 'metadata',
    data: JSON.stringify({
    	url: product.url
    }),
    success: function(data) {
    	console.log(data);

    	if (product.description) {
    		product.description = product.description
    	} 

    	else if (data.general && data.general.title) {
    		product.description = data.general.title
    	}
  
    	else if (data.openGraph && data.openGraph.description) {
    		product.description = data.openGraph.description
    	}

    	if (data.general && data.general.title) {
    		product.title = data.general.title
    	}
    	else if (data.twitter && data.twitter.title) {
    		product.title = data.twitter.title
    	}
    	else if (data.openGraph && data.openGraph.title) {
    		product.title = data.openGraph.title
    	}


    	if (data.twitter && data.twitter.image) {
    		product.image = data.twitter.image
    	}

    	else if (data.openGraph && data.openGraph.image.url) {
    		product.image = data.openGraph.image.url
    	}

    	if (data.openGraph && data.openGraph.availability) {
    		product.availability = data.openGraph.availability
    	}

    	if (!product.image) {
    		$('#image').addClass('hidden');
    	}

      addListItem(product);
    },
    dataType: 'json',
    contentType: 'application/json',
    headers: {
			authorization: localStorage.headers
		}
  });
}




function deleteListItem(productId) {
  console.log('Deleting list item');
  var item = state.list.items.filter(function(item){
  	return item._id != productId
  })
  state.list.items = item 
  $.ajax({
    url: LISTS_URL + state.id,
    method: 'PUT',
    data: JSON.stringify(state.list),
    dataType: 'json',

    success: getAndDisplayListItemUpdates,
    contentType: 'application/json',
    headers: {
			authorization: localStorage.headers
		}

  });
  console.log('test');
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
    contentType: 'application/json',
    headers: {
			authorization: localStorage.headers
		}
  });
}


function getRecentListUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_LIST_ITEM_UPDATES)}, 1);
}

var newItemTemplate = 
`<div class="item">

<span id="trash-can" class="glyphicon glyphicon-trash"></span>


       	<h3 id="item-name"></h3>
       	<p id="item-description"></p>
       	<a href="" target="_blank" id="item-url"></a>
       	<p class="item-price" id="item-price"></p> 
       	<img id="image" src="">
       	<p id="availability"></p>
      

</div>`



      	

function getAndDisplayListItemUpdates() {
	
	console.log('displaying items')
	
	$.getJSON(LISTS_URL + state.id, function(list) {
 		state.list = list 
 	$('.list-name').html(list.name);
 		
 		var itemElement = list.items.map(function(item){
	 	var element = $(newItemTemplate);
	 	
	 	var a = document.getElementById('item-url');
	 	a.href = item.url

	 

	 	
	 	element.attr('id', item._id);
	 	element.find('#item-name').append(item.name);
	 	element.find('#item-description').append(item.description);
	 	element.find('#item-url').append('Link to Product Page').attr('href', item.url);
	 	element.find('#image').attr('src', item.image);	
	 	element.find('#availability').append(item.availability);
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
	    

	    getMetaData(newItem)
    }
  });
}



function handleListItemDelete() {
console.log('removing list item');
	$('.list-items').on('click', '#trash-can', function(e){
		e.preventDefault();
		deleteListItem(
			$(e.currentTarget).closest('.item').attr('id'));
			
	});
}



	






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

$(function() {
	$('.check').click(function(){
	event.preventDefault();
	$(e.currentTarget).closest('#item-name').addClass('line-thru');
})
});

$('.logout').click(function() {
  window.location = 'index.html';
});