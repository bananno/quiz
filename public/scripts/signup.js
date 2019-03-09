
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
      console.log('one')
      console.log(data)
    },
    error: (data) => {
      let message = data.responseText;
      message = message.slice(4);
      message = message.slice(0, message.indexOf('-->'));
      $('#signup-form .error-message').text(message);
    },
  });

  return false;
});
