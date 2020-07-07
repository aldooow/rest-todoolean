$(document).ready(
  function(){

    // CHIAMATA AJAX.
    getAjax();

    // AGGIUNGERE UN ELEMENTO NUOVO.
    // --> Click su tasto.
    $(document).on('click', '#add-button', function(){
      postAjax();
    });
    // --> Con Tasto Enter.
    $('#new-todo').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        postAjax();
      }
    });

    // ELIMINARE UN ELEMENTO DELLA LISTA.
    $(document).on('click', '.delete-button', function(){
      var idAttr = $(this).parent().attr("id-todo");
      deleteAjax(idAttr);
    });

  });

// ----------------------->
// FUNZIONE: getAjax();
// Questa funzione fa una chiamata Ajax.
function getAjax(){
  $.ajax(
    {
      url: 'http://157.230.17.132:3002/todos',
      method: 'GET',
      success: function(data){
        console.log(data.length)
        var source = $("#todo-template").html();
        var template = Handlebars.compile(source);

        for(var i = 0; i < data.length; i++){
          var singleTodo = data[i];
          var html = template(singleTodo)
          // Appendere TEMPLATE HTML nel Elemento desiderato.
          $("#todo-list").append(html);
        }
      },
      error: function(){
          alert('ERROR')
      }
  });
};

// ----------------------->
// FUNZIONE: postAjax();
// Questa funzione Aggiunge un elemento alla chiamata Ajax.
function postAjax(){
  // newTodo --> Nuovo Elemento da aggiungere alla lista.
  var newTodo = $('#new-todo').val();
  // Il nuovo Elemento da aggiungere deve contener almeno una lettere e
  // non puo essere soltano uno spazio.
  if(newTodo.length > 0 && newTodo != ' '){
    // Reset Lista.
    $('#todo-list').html('');
    $.ajax(
      {
        url: 'http://157.230.17.132:3002/todos',
        method: 'POST',
        data: {
          text: newTodo
        },
        success: function(data){
          // console.log(data)
          getAjax();
        },
        error: function(){
          alert('ERROR')
        }
    });
    // Reset l'Input.
    $('#new-todo').val('')
  }
};

// ----------------------->
// FUNZIONE: deleteAjax();
// Questa funzione elimina un elemento alla chiamata Ajax.
// --> id: è un numero, attr univoco.
function deleteAjax(id){
  // Reset Lista.
  $('#todo-list').html('');
  $.ajax(
    {
      url: 'http://157.230.17.132:3002/todos/' + id,
      method: 'DELETE',
      success: function(data){
        // console.log(data)
        getAjax();
      },
      error: function(){
        alert('ERROR')
      }
  });
};
