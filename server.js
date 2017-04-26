const express = require('express');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const {DATABASE_URL, PORT} = require('./config');


const {router} = require('./router');

const {List} = require('./models');
const {ListItem} = require('./models');

exports.app = app;


app.use('/users', router);
app.use('/me', router);

app.get('/lists', (req, res) => {
	res.json(List.get());
});

app.post('/lists', (req, res) => {
	const requiredFields = ['name'];
	for  (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	const item = List.create(req.body.name);
	res.status(201).json(item);
})

app.put('/lists/:id', (req, res) => {
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

	console.log(`Updating list \`${req.params.id}\``);
	const updatedItem = List.update({
		id: req.params.id,
		name: req.body.name
	});
	res.status(204).json(updatedItem);
});

app.delete('/lists/:id', (req, res) => {
	List.delete(req.params.id);
	console.log(`Deleted list \`${res.params.id}\``);
	res.status(204).end();
});



function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};