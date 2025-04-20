// Funcionalidad del contador compartida para Quiz y Trio 

let timeElement;
let time;
let interval; 

function setTimeElement(element){
    timeElement=element;
}
function updateTimer(){
    timeElement.textContent = time;
}

function setTime(seconds){
    time = seconds;
    updateTimer();
}

function decrementTime(){
    if (time <= 0 ){
        end();
        clearInterval(interval); 
    }else{
        time--
        updateTimer();
    }
}


// Esto es la referencia a la funcion que se creara en las hojas de quiz y trio 
let end = function (){
    console.log("end básico");
};


function startTimer(){
    // Cada segundo resta un segundo al contador
    interval = setInterval(decrementTime, 1000);
}
