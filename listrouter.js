const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const {List} = require('./models');
var scrape = require('html-metadata');


const listRouter = express.Router();

// exports.app = app;

listRouter.use(jsonParser);




listRouter.get('/', passport.authenticate('basic', {session: false}), (req, res) => {

	List.find({
		user: req.user._id
	}).then(lists => {
		res.json(lists)
	});
	
});

listRouter.get('/:id',  (req, res) => {
	List.findById(req.params.id).then(lists => {
		res.json(lists)
	});
	
});

listRouter.post('/', passport.authenticate('basic', {session: false}), jsonParser, (req, res) => {
	const requiredFields = ['name'];
	for  (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	req.body.user = req.user._id

	const item = List.create(req.body);
	res.status(201).json(item);
})

listRouter.put('/:id', (req, res) => {
	console.log(req.body);
	const requiredFields = ['name', '_id'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if (req.params.id !== req.body._id) {
		const message = (
			`Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	}

	console.log(`Updating items \`${req.params.id}\``);
	
	List.update({ 
		_id: req.params.id }, { $set: req.body}, function(data) {
		console.log(data);
		res.sendStatus(204);
	});
	
});

// listRouter.delete('/:id', passport.authenticate('basic', {session: false}), (req, res) => {
// 	console.log('eh??')
// 	List.delete({
// 		_id: req.params.id}, function(data){
// 			console.log(data);
// 			res.sendStatus(204);
// 		});
// });

listRouter.delete('/:id', passport.authenticate('basic', {session: false}), (req, res) => {
	List.findOneAndRemove({
		_id: req.params.id},
		function() {
			res.sendStatus(204);
		});
	console.log('deleting selected list');
	
});

listRouter.post('/metadata', passport.authenticate('basic', {session: false}), (req, res) => {

		scrape(req.body.url).then(function(metadata){
			res.json(metadata);
			console.log(metadata);
		});
	});

// listRouter.delete('/:id', (req, res) => {
// 	List.item.delete(req.params._id);
// 	console

module.exports = {listRouter};