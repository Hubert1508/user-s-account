function stronaZaloguj(){
  document.location.href='zaloguj.html';
}

function stronaRejestracja(){
  document.location.href='rejestracja.html';
}

function wyloguj(){
  localStorage.removeItem("zalogowany");
  document.location.href = 'index.html';
}

function rejestracja(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("pass").value;
  var email = document.getElementById("email").value;
  var emailRepeat = document.getElementById("emailRepeat").value;
  var result = document.getElementById("result");
  let pattern = /[0-9]/g;
  let numbersInUsername = username.match(pattern);
  let correctFormatEmail = /^([A-Za-z0-9\-]*\w)+@+([A-Za-z0-9\-]*\w)+(\.[A-Za-z]*\w)+$/;
  let validCharactersInEmail = email.match(correctFormatEmail);

  if(username=="" && password=="" && email=="" && emailRepeat==""){
    result.textContent= "Wypełnij wszystkie pola";
  }
  else if(username==""){
    result.textContent="Podaj nzawę użytkownika";
  }
  else if(username.length<6 || username.length>20){
    result.textContent="Nazwa użytkownika musi mieć min. 6 i max 20 znaków";
  }
  else if(numbersInUsername===null){
    result.textContent="Nazwa użytkownika musi zawierać cyfrę";
  }
  else if(password==""){
    result.textContent="Podaj hasło";
  }
  else if(password.length<6){
    result.textContent="Hasło musi zawierać min. 6 znaków";
  }
  else if(email==""){
    result.textContent="Podaj email";
  }
  else if(validCharactersInEmail===null){
    result.textContent = "Wprowadzono niepoprawny format E@mail";
  }
  else if(emailRepeat==""){
    result.textContent="Potwierdź email";
  }
  else if(emailRepeat!=email){
    result.textContent="E@mail nie jest identyczny";
  }
  else{

    var data={pass: password, users: username};

    async function hashPass(message){

      const msgUint8 = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      var json=JSON.stringify({users: data.users, pass: hashHex});

      localStorage.setItem(data.users, json);
    }

    hashPass(data.pass);
    result.textContent="Zarejestrowano Użytkownika";
  }
}

function nameUser(){
  var userName = localStorage.getItem("zalogowany");
  var nameusers = localStorage.getItem(userName);
  var parseJson = JSON.parse(nameusers);

  document.getElementById("nazwaUsera").textContent = "Użytkownik: " + parseJson.users;
}

function login(){

var password = document.getElementById("password").value;

  async function hashRead(message){

    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    var login = document.getElementById("user").value;
    var storage = localStorage.getItem(login);
    var parseJson = JSON.parse(storage);

    var result = document.getElementById("result");

    if(storage==='undefined'){
      result.textContent = "Niepoprawny login lub hasło";
    }
    else if(login===""||message===""||storage===null){
      result.textContent = "Niepoprawny login lub hasło";}
    else if(login===parseJson.users && parseJson.pass===hashHex){
      localStorage.setItem("zalogowany", parseJson.users);
      document.location.href = 'zalogowany.html'
    }
    else{
        result.textContent = "Niepoprawny login lub hasło";
    }
  }
  hashRead(password);
}

function getView(){
  let location = document.location.href;
  location = location.replace(".html", "");;

  const myArray = location.split("/");
  const route = myArray.pop();
  console.log(route);

  return route;
}

function main(){

  var sprawdz = localStorage.getItem("zalogowany");
  const route = getView();

  if(sprawdz===null && route!= "zaloguj" && route!= "rejestracja" && route!= "index"){
    wyloguj();
    return false;
  }
}
main();
