var should = require('chai');
var request = require('supertest');
var url = '55.55.55.55:3000';

describe('GET Server', function() {
  it('should be access test page', function(done) {
    request(url).get('/asdasd').expect(200, done);
  });
});

function isEven(num){
  return num % 2 == 0;
}
