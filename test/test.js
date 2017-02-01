var app = require('../server/webapp.service')();
var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require("supertest");
var TermsToTest = require('../server/domains/domainNeo4jController').getTermsIntendsCallback;
var intentToTest = require('../server/domains/intentNeo4jController').getPublishIntentCallback;
request = request(app);
describe("Make get requests for terms", function() {
    it('Simple post Request to root url', function(done) {
        request.get('/').expect(200, done);
    });
    it('Testing for not defined route', function(done) {
        request.get('/_undefined_route').expect(404, done);
        this.timeout(10000)
    });
});
describe("testing", function() {
    it('content length', function(done) {
        request.get('/domain/:intentName/terms')
            .expect('Content-Length', '37', done)
    });
    it('content type', function(done) {
        request.get('/domain/:intentName/terms')
            .expect('Content-Type', /json/, done)
    });
});


describe("Make GET requests to intent :", function() {
    it('Testing for all intent', function(done) {
        request.get('/domain/add/intent').expect(200, done);
        this.timeout(10000);
    });
});


describe("Make GET requests to intent along with intent name ", function() {
    it('Testing for a intent which is not present', function(done) {
        request.get('/domain/add/nullIntent').
        expect({
            error: 'Null intent object while retriving the intent from mongo..!'
        }, done);
        this.timeout(10000);
    });
});


describe("Make POST requests to intents along with intent name", function() {
    it('Testing for a intent which is not present', function(done) {
        request.post('/domain/add/intent').
        expect({
            error: 'Intents are not added from mongo'
        })
        done();
    });
});

describe("fetching terms from the intent which is not present", function() {
    let intentObj = {
        domain: "no_domain",
        intent: "no_domain"
    };

    it('trying to get the Terms of intent which is not there', function() {

        //	expect(Object.keys(intentToTest(intentObj))).to.have.lengthOf(0);
        request.post('/domain/introduction/terms').
        expect({
            error: 'Intent is not present'
        })
    });

}); //end of describe
