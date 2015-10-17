var request = require('supertest');
var productDB = require('../../models/product');
var app = require('../../app');

describe('Route Product', function() {

  it('should be access list product', function(done) {
    request(app)
      .get('/product')
      .expect(200, done);
  });

  it('should be access single product', function(done) {
    request(app)
      .get('/product/1')
      .expect(200, done);
  });

  it('should be create product', function(done) {
    var product = {
      product_type: 'type',
      product_code: 'P01',
      product_name: 'Product name',
      product_status: 'active',
      product_image: null,
      product_date: '10/05/2015'
    };
    request(app)
      .post('/product')
      .send(product)
      .expect(200, done);
  });

  it('should be delete product', function(done) {
    var product = {};
    productDB.find({product_code: 'P01'}, function(err, data){
      product = data[0];
      request(app)
        .del('/product/' + product._id)
        .expect(302)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
    });
  });

});
