describe('Index view', function() {
  before(function() {
    casper.start('http://localhost:4300');
  });

  it('should have a login form', function(){
    casper.waitForSelector('#login-form', function() {
      '#login-form'.should.be.inDOM;
    });
  });

  it('should have a signup form', function(){
    casper.waitForSelector('#signup-form', function() {
      '#signup-form'.should.be.inDOM;
    });
  });
});
