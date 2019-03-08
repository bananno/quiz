before(function() {
  casper.start('http://localhost:4300');
});

after(function() {
});

describe('Index view', function() {

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

describe('Signup form', function() {
  it('should have username and password fields', function() {
    casper.then(function() {
      this.fillSelectors('#signup-form form', {
        '[name="username"]' : 'new_username',
        '[name="password"]' : '123'
      });
    });
  });

  it('should redirect', function() {
    casper.thenClick('#signup-form button');

    casper.waitFor(function check() {
      return this.evaluate(function() {
        return /signup/.test(document.location.pathname);
      });
    }, function then() {
    }, function timeout() {
      this.echo('Failed to load page').exit();
    });
  });
});
