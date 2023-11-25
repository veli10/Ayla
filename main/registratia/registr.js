let users = [];

if(!localStorage.getItem('users')){
    localStorage.setItem('users', JSON.stringify(users))
}

$(".place").on("input", function () {
  if (
    $("#name").val().length >= 2 &&
    $("#password").val().length >= 2 &&
    $("#check").is(":checked")
  ) {
    $(".btn").attr("disabled", false);
  } else {
    $(".btn").attr("disabled", true);
  }
});

$("#check").click(function () {
  if (
    $("#name").val().length >= 2 &&
    $("#password").val().length >= 2 &&
    $("#check").is(":checked")
  ) {
    $(".btn").attr("disabled", false);
  } else {
    $(".btn").attr("disabled", true);
  }
});

$(".btn").click(function (event) {
  event.preventDefault();

  users = JSON.parse(localStorage.getItem('users'))

  let newUser = {
    name: $('#name').val(),
    password : $('#password').val(),
    comps: []
  }

  let alredyExist = users.some(user => user.name === $('#name').val())

  if(alredyExist){
    alert('this is alredy registered!')
    $('#name').css({
        'outline-color' : 'red',
        'border-color' : 'red'
    })
  } else {
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
  }
});