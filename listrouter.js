const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const {listItems} = require('./models');


const listRouter = express.Router();

// exports.app = app;
listRouter.use(express.static('public'));
listRouter.use(jsonParser);

listRouter.get('/items', (req, res) => {
	res.json(List.get());
});

listRouter.post('/items', (req, res) => {
	const requiredFields = ['name'];
	for  (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	const item = listItems.create(req.body.name);
	res.status(201).json(item);
})

listRouter.put('/items/:id', (req, res) => {
	const requiredFields = ['name', 'id'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if (req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	}

	console.log(`Updating items \`${req.params.id}\``);
	const updatedItem = List.update({
		id: req.params.id,
		name: req.body.name
	});
	res.status(204).json(updatedItem);
});

listRouter.delete('/items/:id', (req, res) => {
	List.delete(req.params.id);
	console.log(`Deleted list \`${res.params.id}\``);
	res.status(204).end();
});

module.exports = {listRouter};