var app = {

  init: function () {
    $('#app').append(`<form id='form'></form>`);
    $('#form').append(`<input type=textarea id='text'>`);
    $('#form').append(`<button type=submit id="submit">Submit</button>`);
    $('#submit').on('click', app.handleSubmit);
  },

  handleSubmit: function (event) {
    var message = {
      text: $('#text').val()
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        $('#text').val('');
        app.render(data);
      }
    });
    event.preventDefault();
  },

  render: function (data) {
    $('#app').append(data);
  }

}