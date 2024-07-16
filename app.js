let numeroSecreto = 0;
let intentos  = 0;
let intentosMaximos = 0;
let listaNrosSorteados = [];
let nroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function generarNroSecreto() {
    let nroGenerado = Math.floor(Math.random()*nroMaximo)+1;
    
    // ya sorteamos todos los nros?
    if (listaNrosSorteados.length == nroMaximo) {
        asignarTextoElemento("p", "Ya se sortearon todos los números posibles")
    } else {
        //el nro generado esta incluido en la lista? si->hacemos una condicion sino otra
        if (listaNrosSorteados.includes(nroGenerado)) {
            return generarNroSecreto();
        } else{
            listaNrosSorteados.push(nroGenerado);
            return nroGenerado;
        }
    }
    
}

function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);
    
    if (numeroSecreto === numeroUsuario) {
        asignarTextoElemento("p", `¡Felicidades! Acertaste en ${intentos} ${(intentos === 1)? "intento." : "intentos."}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.querySelector("#intentar").setAttribute("disabled", "true");
    }   else{ 
            //El usuario no acertó
            if (numeroSecreto>numeroUsuario) {
                asignarTextoElemento("p", "El número secreto es mayor");
            }else{
                asignarTextoElemento("p", "El número secreto es menor");
            }
            intentos++;
            limpiarCaja();
    }
    
    if (intentos>intentosMaximos) {
        asignarTextoElemento("p", `Lo siento, has alcanzado el máximo de intentos. El nro secreto era: ${numeroSecreto}.`);
        document.querySelector("#intentar").setAttribute("disabled", "true");
        document.getElementById("reiniciar").removeAttribute("disabled");

    }
}

function condicionesIniciales(){
    //mensajes iniciales
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Indica un número del 1 al ${nroMaximo}, tenes 3 intentos.`);
    //generar numero aleatorio
    numeroSecreto = generarNroSecreto();
    //inicializar el contador de intentos
    intentos = 1;
    intentosMaximos = 3;
}

function limpiarCaja(){
    let valorCaja =document.querySelector("#valorUsuario"); 
    valorCaja.value = "";
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //indicar msj de intervalo de números
    //generar el nro aleatorio
    //inicializar contador de intentos
    condicionesIniciales();
    //deshabilitar boton de nuevo juego
    document.querySelector("#reiniciar").setAttribute("disabled", "true");
    document.getElementById("intentar").removeAttribute("disabled");
}

condicionesIniciales();


