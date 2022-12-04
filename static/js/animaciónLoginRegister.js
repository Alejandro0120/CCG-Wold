const r = document.querySelector("#register");
const l = document.querySelector("#login");
const formRegis = document.querySelector(".register");
const formLogin = document.querySelector(".login");

const cabecera = document.querySelector('.cabecera');

const valores = window.location.search
const urlParams = new URLSearchParams(valores);
console.log(urlParams.get('mode'));

cabecera.addEventListener('click', function(){window.location='../'})

switch(urlParams.get('mode')){
    case 'login':
        formInicio();
        break;
    case 'register':
        formRegistro();
        break;
}

// r.addEventListener("click", function () {
//   formRegistro();
// });

// l.addEventListener("click", function () {
//   formInicio();
// });

function formInicio(){
    formRegis.classList.remove("active");
    formLogin.classList.remove("desActive");
    l.classList.add("border");
    r.classList.remove("border");
}

function formRegistro(){
    formRegis.classList.add("active");
    formLogin.classList.add("desActive");
    r.classList.add("border");
    l.classList.remove("border");
}
