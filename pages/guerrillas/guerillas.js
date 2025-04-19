// Valores de guerreros iniciales
const templateWarriors = {
  1: {
    img: "img/Warrior1.svg",
    cost: 2,
    live: 4,
    power: 2
  },
  2: {
    img: "img/Warrior2.svg",
    cost: 3,
    live: 6,
    power: 3
  },
  3: {
    img: "img/Warrior3.svg",
    cost: 4,
    live: 5,
    power: 5
  }
};

// Guerreros situados en el campo de batalla
const enemyWarriors = [null, null, null];
const playerWarriors = [null, null, null];

//Datos necesatios para la jugabilidad
const playerLiveElement = document.getElementById("player-heart");
const playerMoneyElement = document.getElementById("player-coins");
const enemyLiveElement = document.getElementById("enemy-heart");

let money = 5;
let enemyLive = 15;
let playerLive = 15;

// Si es el turno del jugador para poder jugar
let isPlayerTurn = true;

// Actualizar los guerreros de la tienda
function updateShopWarriors() {
  console.log("Actualizando tienda de guerreros");
  let imgElement;

  // GUERRERO 1
  imgElement = document.querySelector("#warrior1-shop .img-warrior-shop");
  imgElement.src = templateWarriors[1].img;

  document.getElementById("warrior1-shop-cost").textContent =
    templateWarriors[1].cost;
  document.getElementById("warrior1-shop-power").textContent =
    templateWarriors[1].power;
  document.getElementById("warrior1-shop-live").textContent =
    templateWarriors[1].live;

  // GUERRERO 2
  imgElement = document.querySelector("#warrior2-shop .img-warrior-shop");
  imgElement.src = templateWarriors[2].img;

  document.getElementById("warrior2-shop-cost").textContent =
    templateWarriors[2].cost;
  document.getElementById("warrior2-shop-power").textContent =
    templateWarriors[2].power;
  document.getElementById("warrior2-shop-live").textContent =
    templateWarriors[2].live;

  // GUERRERO 3
  imgElement = document.querySelector("#warrior3-shop .img-warrior-shop");
  imgElement.src = templateWarriors[3].img;

  document.getElementById("warrior3-shop-cost").textContent =
    templateWarriors[3].cost;
  document.getElementById("warrior3-shop-power").textContent =
    templateWarriors[3].power;
  document.getElementById("warrior3-shop-live").textContent =
    templateWarriors[3].live;
}

// Actualizar los valores de vida y dinero de castillos
function updateInfo() {
  playerLiveElement.textContent = playerLive;
  playerMoneyElement.textContent = money;
  enemyLiveElement.textContent = enemyLive;
}

//Todas las funciones de actualizar para cuando cargue la página
function initializeGame() {
  updateShopWarriors();
  updateInfo();
}

// Llamamos al cargar la página para que actualize todo
document.addEventListener("DOMContentLoaded", initializeGame);

// Eliminar un guerrero de una celda
function removeWarriorFromCell(id) {
  const cell = document.getElementById(id);
  cell.innerHTML = "";
}

// Chequear si se ha resuelto la partida
function checkEnd() {
  if (enemyLive <= 0) {
    window.location.href = "guerrillas-win.html";
  } else if (playerLive <= 0) {
    window.location.href = "guerrillas-loose.html";
  }
}

//Función despues del turno del jugador para resolver el combate
function combat() {
  for (let i = 0; i < 3; i++) {
    let playerUnit = playerWarriors[i];
    let enemyUnit = enemyWarriors[i];

    // Si ambos tienen guerrerros y no son null, se atacan entre sí
    if (playerUnit && enemyUnit) {
      playerUnit.live -= enemyUnit.power;
      enemyUnit.live -= playerUnit.power;

      // Eliminar guerreros muertos
      if (playerUnit.live <= 0) {
        playerWarriors[i] = null;
        removeWarriorFromCell("p-cell" + (i + 1));
      }

      if (enemyUnit.live <= 0) {
        enemyWarriors[i] = null;
        removeWarriorFromCell("en-cell" + (i + 1));
      }
    }else if (playerUnit && !enemyUnit) { // Atacar castillo oponente
      enemyLive -= playerUnit.power;
      if (enemyLive < 0) enemyLive = 0;
    }else if (enemyUnit && !playerUnit) { //Atacar castillo jugador
      playerLive -= enemyUnit.power;
      if (playerLive < 0) playerLive = 0;
    }

  }
  updateInfo();
  checkEnd();
}

// Funcionalidad de pasar turno
const nextTurnButton = document.getElementById("next-turn");

// Habilitar boton pasar turno
function updateBtnNextTurn() {
  if (isPlayerTurn) {
    nextTurnButton.classList.remove("disabled");
  } else {
    nextTurnButton.classList.add("disabled");
  }
}

// Pasar de turno
function nextTurn() {
  if (!isPlayerTurn) return;

  combat(); // Combaten los guerreros
  isPlayerTurn = false;
  updateBtnNextTurn();

  // Esperar 1 segundo, funcion anomina para facilitar la lectura del codigo
  setTimeout(function enemyTurn () {
    // Aquí podrías ejecutar enemyIA() más adelante
    console.log("Turno del enemigo (IA)");

    // Esperar otro segundo, funcion anomina para facilitar la lectura del codigo 
    setTimeout(function playerTurn () {
      isPlayerTurn = true;
      updateBtnNextTurn();
      console.log("Vuelve el turno del jugador");
    }, 1000);

  }, 1000);
}


nextTurnButton.addEventListener("click", nextTurn);
