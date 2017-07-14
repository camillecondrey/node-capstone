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

describe('API Resource', function() {


  describe('GET endpoint', function() {
      it('should return all exisiting lists', function() {

        let res;
        return chai.request(app)
          .get('/')
          .then(function(_res){
              res = _res;
              res.should.have.status(200);
             
          })

      });
     });
     

      it('should return lists with right fields', function() {

        let resList;
        return chai.request(app)
          .get('/')
          .then(function(res){
              res.should.have.status(200);
              
              });
              
          })
    });
          
      
  



  // describe('POST endpoint', function(){

  //     it('should add a new list', function(){


  //       return chai.request(app)
  //         .post('/list')
       
  //         .then(function(res) {
  //           res.should.have.status(201);
            
  //           res.body.id.should.not.be.null;

          
  //         })
     
            
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
//           // return List.findById(list.id).exec();
//         })
//         .then(function(_list){
//           should.not.exist(_list);
//         })
    
//     });
//   });
// });


//  it('should return tracked moods with the right fields', function () {
//    let resMood;
//      return chai.request(app)
//      .get('/')
//      .then(function(res){
//          res.should.have.status(200)
//      });
//  })
//  });