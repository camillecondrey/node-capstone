const chai = require('chai');
const chaiHttp = require('chai-http');
// const uuid = require('uuid');
const should = chai.should();
chai.use(chaiHttp);
const {app} = require('./server')

	
describe('assertions', function () {

  it('#status property "status"', function () {
    var res = { status: 200 };
    res.should.to.have.status(200);


it('#html', function () {
    var req = { headers: { 'content-type': [ 'text/html' ] }};
    var res = {
      getHeader: function (key) {
        return 'text/html'
      }
    };

    req.should.be.html;
    res.should.be.html;

});
});
});