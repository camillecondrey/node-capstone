var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
const mongoose = require('mongoose');
const faker = require('faker');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

const {User, List, listItems} = require('../models');
const {runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');


function seedListData(){
  console.info('seeding list data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateListData());
  }
  return List.insertMany(seedData);
}

function generateListData() {
  return {
   
    name: faker.lorem.text(),
    description: faker.lorem.sentence()
   
  }
}

function tearDownDb(){
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}






describe('index page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
      });
  });




describe('profile page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
});
  });
  });

describe('list page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();                
    });
  });
});

// describe('Blog API Resource', function() {

//   before(function(){
//       return runServer(TEST_DATABASE_URL);
//   });

//   beforeEach(function(){
//       return seedListData();
//   });

//   afterEach(function(){
//       return tearDownDb();
//   });

//   after(function(){
//       return closeServer();
//   });

//   describe('GET endpoint', function() {
//       it('should return all exisiting lists', function() {

//         let res;
//         return chai.request(app)
//           .get('/')
//           .then(function(_res){
//               res = _res;
//               res.should.have.status(200);
//               return List.count();
//           })
//           .then(function(count){
//               res.body.should.have.length.of(count);
//           });

//       });

//       it('should return lists with right fields', function() {

//         let resList;
//         return chai.request(app)
//           .get('/')
//           .then(function(res){
//               res.should.have.status(200);
//               res.should.be.json;
//               res.body.should.be.a('array');
//               res.body.should.have.length.of.at.least(1);

//               res.body.forEach(function(list){
//                   list.should.be.a('object');
//                   list.should.include.keys(
//                     'id', 'name');
//               });
//               resList = res.body[0];
//               return List.findById(resList.id);
//           })
//           .then(function(list){
//               resList.id.should.equal(list.id);
//               resList.name.should.euqal(list.name);

//           });
//       });
//   });


//   describe('POST endpoint', function(){

//       it('should add a new list', function(){
//         const newList = generateListData();

//         return chai.request(app)
//           .post('/lists')
//           .send(newList)
//           .then(function(res) {
//             res.should.have.status(201);
//             res.should.be.json;
//             res.body.should.be.a('object');
//             res.body.should.include.keys(
//               'id', 'author');
//             res.body.id.should.not.be.null;

//             return List.findById(res.body.id);
//           })
//           .then(function(list){
//             list.name.should.equal(newList.name);
            
//           });

//       });
//     });



//     describe('PUT endpoint', function() {

//     it('should update fields you send over', function() {
//       const updateData = {
//         name: 'new list name',
//         description: 'new list description'
//       };

//       return List
//         .findOne()
//         .exec()
//         .then(function(list){
//           updateData.id = list.id

//           return chai.request(app)
//             .put(`/lists/${list.id}`)
//             .send(updateData);
//         })
//         .then(function(res) {
//           res.should.have.status(201);

//           return List.findById(updateData.id).exec();
//         })
//         .then(function(list){
//           list.name.should.equal(updateData.name);
//           list.description.should.equal(updateData.description);
//         });
//     });
//   });


//     describe('DELETE endpoint', function() {

//     it('should delete a list by id', function() {

//       let list;

//       return List
//         .findOne()
//         .exec()
//         .then(function(_list) {
//           list = _list;
//           return chai.request(app).delete(`/lists/${list.id}`);

//         })
//         .then(function(res) {
//           res.should.have.status(204);
//           return List.findById(list.id).exec();
//         })
//         .then(function(_list){
//           should.not.exist(_list);
//         });
//     });
//   });
// })