var request = require('supertest');
var app = require('../app');

describe('GET Route', function() {
  it('should be access index page', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
