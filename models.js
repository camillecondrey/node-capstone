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

const ListSchema = mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
  id: {type: String}
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
  lists: [ListSchema],
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
const List = mongoose.model('List', ListSchema);
const listItems = mongoose.model('listItems', productSchema)

module.exports = {User, List, listItems};



function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}