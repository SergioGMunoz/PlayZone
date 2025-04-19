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

  for (let i = 1; i <= 3; i++) {
    const warrior = templateWarriors[i];
    const imgElement = document.querySelector(`#warrior${i}-shop .img-warrior-shop`);
    imgElement.src = warrior.img;

    document.getElementById(`warrior${i}-shop-cost`).textContent = warrior.cost;
    document.getElementById(`warrior${i}-shop-power`).textContent = warrior.power;
    document.getElementById(`warrior${i}-shop-live`).textContent = warrior.live;
  }
}

// Comprobar que guerrerros estan disponibles 
function updateShopAvailability() {
  var shopWarriors = document.getElementsByClassName("warrior-shop");
  for (var i = 0; i < shopWarriors.length; i++) {
    var div = shopWarriors[i];
    var cost = parseInt(div.querySelector(".info-element p").textContent, 10);
    if (cost > money) {
      div.classList.add("disabled");
      div.setAttribute("draggable", "false");
    } else {
      div.classList.remove("disabled");
      div.setAttribute("draggable", "true");
    }
  }
}

// Actualizar los valores de vida y dinero de castillos
function updateInfo() {
  playerLiveElement.textContent = playerLive;
  playerMoneyElement.textContent = money;
  enemyLiveElement.textContent = enemyLive;
  updateShopAvailability();
}

//Todas las funciones de actualizar para cuando cargue la página
function initializeGame() {
  updateShopWarriors();
  updateInfo();
  enableDragAndDrop();
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


// Habilitar drag and drop a los elegibles
function enableDragAndDrop() {
  var shopWarriors = document.querySelectorAll(".warrior-shop");
  for (var i = 0; i < shopWarriors.length; i++) {
    shopWarriors[i].setAttribute("draggable", "true");
    addDragStartEvent(shopWarriors[i], i + 1);
  }

  var playerCells = [
    document.getElementById("p-cell1"),
    document.getElementById("p-cell2"),
    document.getElementById("p-cell3")
  ];

  for (var j = 0; j < playerCells.length; j++) {
    addCellEvents(playerCells[j], j);
  }
}

// Esta función se ejecuta al comenzar a arrastrar un guerrero. 
// Guarda el ID del guerrero en el objeto dataTransfer, 
// para poder recuperarlo luego en la celda donde se suelte (drop).
function onDragStart(event, warriorId) {
  event.dataTransfer.setData("warriorId", warriorId);
}


function addCellEvents(cell, index) {
  cell.addEventListener("dragover", onDragOver);
  cell.addEventListener("dragleave", function() {
    onDragLeave(cell);
  });
  cell.addEventListener("drop", function(event) {
    onDrop(event, cell, index);
  });
}

function onDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
}

function onDragLeave(cell) {
  cell.classList.remove("drag-over");
}

function onDrop(event, cell, index) {
  event.preventDefault();
  cell.classList.remove("drag-over");

  var warriorId = event.dataTransfer.getData("warriorId");
  var warrior = templateWarriors[warriorId];

  if (!warrior || playerWarriors[index] || money < warrior.cost) return;

  var img = document.createElement("img");
  img.src = warrior.img;
  img.classList.add("img-warrior-shop");
  cell.innerHTML = "";
  cell.appendChild(img);

  playerWarriors[index] = {
    img: warrior.img,
    cost: warrior.cost,
    live: warrior.live,
    power: warrior.power
  };

  money -= warrior.cost;
  updateInfo();
}

// Devuelve las celdas del jugador
function getPlayerCells() {
  return [
    document.getElementById("p-cell1"),
    document.getElementById("p-cell2"),
    document.getElementById("p-cell3")
  ];
}

// Pinta de amarillo las casillas disponibles
function highlightAvailableCells() {
  const playerCells = getPlayerCells();
  for (let i = 0; i < playerCells.length; i++) {
    if (!playerWarriors[i]) {
      playerCells[i].classList.add("cell-available");
    }
  }
}

// Quitar los indicadorse de celda disponible
function clearAvailableCells() {
  const playerCells = getPlayerCells();
  for (const cell of playerCells) {
    cell.classList.remove("cell-available");
  }
}

function addDragStartEvent(element, warriorId) {
  // Pinta amarillas las casillas libres al empezar el drag
  element.addEventListener("dragstart", function(event) {
    onDragStart(event, warriorId);
    highlightAvailableCells();   
  });

  // Quita el amarillo al terminar el drag
  element.addEventListener("dragend", function() {
    clearAvailableCells();       
  });
}

nextTurnButton.addEventListener("click", nextTurn);
