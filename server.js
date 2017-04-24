var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const uuid = require('uuid');
// const should = chai.should();
// chai.use(chaiHttp);

// describe('GET endpoint', function() {
// 	it('should return root url', function() {
// 		let res;
// 		return chai.request(app)
// 			.get('../public/index.html')
// 			.then(function(_res){
// 				res = _res;
// 				res.should.have.status(200);
// 			});
// 	});
// });