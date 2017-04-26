const mongoose = require('mongoose');
// const uuid = require('uuid');
const bcrypt = require('bcryptjs')

mongoose.Promise = global.Promise;

const productSchema = mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	url: {type: String},
	price: {type: Number}, 
	// image: {type: `${}`}
});

const listSchema = mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String}

});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  // lists: {
  // 	products: [productSchema]
  // }
  products: [productSchema] 
});

UserSchema.methods.apiRepr = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(isValid => isValid);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};


function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}


// const List = {
//   create: function(name, description) {
//     console.log('Creating new list');
//     const list = {
//       name: name,
//       id: uuid.v4(),
//       description: description
//     };
//     this.lists.push(list);
//     return list;
//   },
//   get: function() {
//     console.log('Retrieving list');
//     return Object.keys(this.lists).map(key => this.lists[key]);
//   },
//   delete: function(id) {
//     console.log(`Deleting list \`${id}\``);
//     delete this.lists[id];
//   },
//   update: function(updatedList) {
//     console.log(`Deleting list \`${updatedList.id}\``);
//     const {id} = updatedList;
//     if (!(id in this.lists)) {
//       throw StorageException(
//         `Can't update list \`${id}\` because doesn't exist.`)
//     }
//     this.lists[updatedList.id] = updatedList;
//     return updatedList;
//   }
// };

// const ListItem = {
// 	create: function(name) {
// 		console.log('Creating new item');
// 		const item = {
// 			name: name,
// 			id: uuid.v4(),
// 			description: description,
// 			url: url,
// 			price: price
// 		};
// 		this.items[item.id] = item;
// 		return item;
// 	},
// 	get: function() {
// 		console.log("Retrieving item");
// 		return Object.keys(this.items).map(key => this.items[key]);
// 	},
// 	delete: function(id) {
// 		console.log(`Deleting item \`${id}\``);
// 		delete this.items[id];
// 	},
// 	update: function(updatedItem) {
// 		const {id} = updatedItem;
// 		if (!(id in this.items)) {
// 			throw StorageException(
// 				`Can't update item \`${id}\` because item doesn't exist.`)
// 		}
// 		this.items[updatedItem.id] = updatedItem;
// 		return updatedItem;
// 	}
// };

// function createListModel() {
// 	const storage = Object.create(List);
// 	storage.lists = [];
// 	return storage;
// }

// function createListItemModel() {
// 	const storage = Object.create(ListItem);
// 	storage.listItems = [];
// 	return storage;
// }

// module.exports = {List: createListModel()};
// module.exports = {ListItem: createListItemModel()};