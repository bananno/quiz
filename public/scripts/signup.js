
$(document).on('submit', '#signup-form form', (event) => {
  const username = event.target.username.value;
  const password = event.target.password.value;

  $.ajax({
    type: 'post',
    url: '/signup',
    data: {
      username: username,
      password: password,
    },
    success: (data) => {
      window.location.href = '/profile';
    },
    error: (data) => {
      let message = data.responseText;
      message = message.slice(message.indexOf('--START-MESSAGE') + '--START-MESSAGE'.length);
      message = message.slice(0, message.indexOf('END-MESSAGE--'));
      $('#signup-form .error-message').text(message);
    },
  });

  return false;
});
