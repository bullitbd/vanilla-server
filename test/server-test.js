// server-test.js

'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);
require('../server');

var url = 'localhost:3000'; //Tue May 05 2015 20:34:30 GMT-0700 (PDT)

describe('the server', function() {
  it('should respond to a get request to /time', function(done) {
    chai.request(url)
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        var d = new Date(res.body.msg);
        expect(d.toString()).to.not.equal('Invalid Date');
        done();
      });
  });

  it('should respond to a get request to /name/word', function (done) {
    chai.request(url)
      .post('/greet')
      .send({name: 'name'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('hello, name');
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('should respond to a get request to /greet/single_word', function(done) {
    chai.request(url)
      .get('/greet/single_word')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('hello, single_word');
        done();
      });
  });

  it('should respond to a get request to /greet', function(done) {
    chai.request(url)
      .get('/greet')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        expect(res.body.msg).to.eql("sorry, that\'s an invalid name");
        done();
      });
  });

  it('should respond to a get request to /anythingelse', function(done) {
    chai.request(url)
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        expect(res.body.msg).to.eql("could not find page");
        done();
      });
  });
});