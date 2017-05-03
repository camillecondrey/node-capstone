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
		"title": "Concert Tickets to purchase",
		"description": "upcoming Red Rocks season"
	}
	]
	}

function addList(list) {
  console.log('Adding new list');
  $.ajax({
    method: 'POST',
    url: '/list',
    data: JSON.stringify(recipe),
    success: function(data) {
      getAndDisplayRecipes();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}	


function getRecentListUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_LIST_UPDATES)}, 1);
}

function displayListUpdates(data) {
    for (index in data.listUpdates) {
       $('.list-section').append(
        // '<p>' + data.listUpdates[index].text + '</p>');
  // `<div class="row">
  // <div class="col-sm-6">
  //   <div class="card" id="list-card">
  //     <div class="card-block">
  //       <h3 class="card-title">` + data.listUpdates[index].title + `</h3>
  //       <p class="card-text">` + data.listUpdates[index].description + `</p>
  //       <a href="lists.html" class="btn btn-primary">View List</a>
  //     </div>
  //   </div>
  // </div>`


  // `<div class="list-card">
  //       <h3 class="list-name">` + data.listUpdates[index].title + `</h3>
  //       <p class="list-description">` + data.listUpdates[index].title + `</p>
  //       <a href="tbd" class="view-list">View List</a>
  //   </div>`    

//     `<div class="centered">
 
//             <section class="cards">
                 
//                 <article class="card">
//                    <h3 class="list-name">`+ data.listUpdates[index].title +`</h3>
//                    <p class="list-description">` + data.listUpdates[index].title + `</p>
//                 </article><!-- /card-one -->
 

 
//             </section>
// </div>`

`<div class="card w-75">
  <div class="card-block">
    <p class="card-title">` + data.listUpdates[index].title + `</p>
    <p class="item-count">8 items</p>
    <p class="card-text">` + data.listUpdates[index].title + `</p>
    <button class="view-list">View List</button>
  </div>
</div>`





  );
    }
}

function getAndDisplayListUpdates() {
	getRecentListUpdates(displayListUpdates);
}

$(function() {
	getAndDisplayListUpdates();
})