// Valores de guerreros iniciales
const templateWarriors = {
  1: {
    img: "img/Warrior1.svg",
    cost: 2,
    live: 4,
    power: 1,
  },
  2: {
    img: "img/Warrior2.svg",
    cost: 5,
    live: 7,
    power: 3,
  },
  3: {
    img: "img/Warrior3.svg",
    cost: 6,
    live: 2,
    power: 7,
  },
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
    const imgElement = document.querySelector(
      `#warrior${i}-shop .img-warrior-shop`
    );
    imgElement.src = warrior.img;

    document.getElementById(`warrior${i}-shop-cost`).textContent = warrior.cost;
    document.getElementById(`warrior${i}-shop-power`).textContent =
      warrior.power;
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

//  Elegir alelatoriamente un enemigo y colocarlo en la celda con el index aportado
function placeRandomEnemy(index) {
  const warriorId = parseInt(Math.random() * 3) + 1;
  const warrior = templateWarriors[warriorId];
  const cell = document.getElementById("en-cell" + (index + 1));

  // Limpiar la celda
  cell.innerHTML = "";

  // Crear imagen del guerrero
  const img = document.createElement("img");
  img.src = warrior.img;
  img.classList.add("img-warrior-shop");

 // COntenedor de vida y poder
 const statsDiv = document.createElement("div");
 statsDiv.classList.add("warrior-stats");

 const lifeDiv = document.createElement("div");
 lifeDiv.classList.add("info-element");
 lifeDiv.innerHTML = `
   <div>
     <img class="img-element" src="img/heart.svg" alt="heart" />
   </div>
   <p>${warrior.live}</p>
 `;

 const powerDiv = document.createElement("div");
 powerDiv.classList.add("info-element");
 powerDiv.innerHTML = `
   <div>
     <img class="img-element" src="img/power.svg" alt="power" />
   </div>
   <p>${warrior.power}</p>
 `;

 statsDiv.appendChild(lifeDiv);
 statsDiv.appendChild(powerDiv);


 cell.innerHTML = "";
 cell.appendChild(img);
 cell.appendChild(statsDiv);

  // Guardar el guerrero como enemigo
  enemyWarriors[index] = {
    live: warrior.live,
    power: warrior.power,
  };
}

/* Funcionalidad IA de enemigo. Coloca en cada ronda un guerrero y con un 10% de posibilidades otro más */
function enemyIA() {
  //Aqui guardamos las posiciones posibles para colocar guerreros
  const availablePositions = [];

  // Encontrar las posiciones que el jugador tenga guerreros
  for (let i = 0; i < 3; i++) {
    if (playerWarriors[i] && !enemyWarriors[i]) {
      availablePositions.push(i);
    }
  }

  // Si no hay guerreros del jugador guarda el resto de casillas disponibles
  if (availablePositions.length === 0) {
    for (let i = 0; i < 3; i++) {
      if (!enemyWarriors[i]) {
        availablePositions.push(i);
      }
    }
  }

  // Colocar el enemigo y lo elimina de guardados
  if (availablePositions.length > 0) {
    const firstPos = availablePositions.shift();
    placeRandomEnemy(firstPos);

    // Con un 10% de posibilidad coloca un segundo enemigo si hay hueco
    if (Math.random() < 0.1) {
      const secondPos = availablePositions.shift();
      if (secondPos) {
        placeRandomEnemy(secondPos);
      }
    }
  }
}

function updateField() {
  for (let i = 0; i < 3; i++) {
    if (enemyWarriors[i]) {
      // Si existe y no tiene vida se elimina
      if (enemyWarriors[i].live <= 0) {
        removeWarriorFromCell("en-cell" + (i + 1));
        enemyWarriors[i] = null;
      } else {
        // Actualizar vida si sigue vivo
        const enemyCell = document.getElementById("en-cell" + (i + 1));
        const enemyLife = enemyCell.querySelector(".info-element p");
        if (enemyLife) {
          enemyLife.textContent = enemyWarriors[i].live;
        }
      }
    }
    // Lo mismos para los guerreros del jugador
    if (playerWarriors[i]) {
      if (playerWarriors[i].live <= 0) {
        removeWarriorFromCell("p-cell" + (i + 1));
        playerWarriors[i] = null;
      } else {
        const playerCell = document.getElementById("p-cell" + (i + 1));
        const playerLife = playerCell.querySelector(".info-element p");
        if (playerLife) {
          playerLife.textContent = playerWarriors[i].live;
        }
      }
    }
  }
}

//Función despues del turno del jugador para resolver el combate
function combat() {
  for (let i = 0; i < 3; i++) {
    let playerUnit = playerWarriors[i];
    let enemyUnit = enemyWarriors[i];

    if (playerUnit && enemyUnit) {
      playerUnit.live -= enemyUnit.power;
      enemyUnit.live -= playerUnit.power;
    } else if (playerUnit && !enemyUnit) {
      enemyLive -= playerUnit.power;
      if (enemyLive < 0) enemyLive = 0;
    } else if (enemyUnit && !playerUnit) {
      playerLive -= enemyUnit.power;
      if (playerLive < 0) playerLive = 0;
    }
  }

  updateField();
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

  // Esperar 1 segundo
  setTimeout(function enemyTurn() {
    //Llamada a la funcion de la IA del enemigo
    enemyIA();
    console.log("Turno del enemigo");

    // Esperar otro segundo
    setTimeout(function playerTurn() {
      isPlayerTurn = true;
      updateBtnNextTurn();
      console.log("Vuelve el turno del jugador");
    }, 1000);
  }, 1000);

  money += 3;
  updateInfo();
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
    document.getElementById("p-cell3"),
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
  cell.addEventListener("dragleave", function () {
    onDragLeave(cell);
  });
  cell.addEventListener("drop", function (event) {
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

  // COntenedor de vida y poder
  const statsDiv = document.createElement("div");
  statsDiv.classList.add("warrior-stats");

  const lifeDiv = document.createElement("div");
  lifeDiv.classList.add("info-element");
  lifeDiv.innerHTML = `
    <div>
      <img class="img-element" src="img/heart.svg" alt="heart" />
    </div>
    <p>${warrior.live}</p>
  `;

  const powerDiv = document.createElement("div");
  powerDiv.classList.add("info-element");
  powerDiv.innerHTML = `
    <div>
      <img class="img-element" src="img/power.svg" alt="power" />
    </div>
    <p>${warrior.power}</p>
  `;

  statsDiv.appendChild(lifeDiv);
  statsDiv.appendChild(powerDiv);


  cell.innerHTML = "";
  cell.appendChild(img);
  cell.appendChild(statsDiv);

  playerWarriors[index] = {
    live: warrior.live,
    power: warrior.power,
  };

  money -= warrior.cost;
  updateInfo();
}

// Devuelve las celdas del jugador
function getPlayerCells() {
  return [
    document.getElementById("p-cell1"),
    document.getElementById("p-cell2"),
    document.getElementById("p-cell3"),
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
  element.addEventListener("dragstart", function (event) {
    onDragStart(event, warriorId);
    highlightAvailableCells();
  });

  // Quita el amarillo al terminar el drag
  element.addEventListener("dragend", function () {
    clearAvailableCells();
  });
}

nextTurnButton.addEventListener("click", nextTurn);

