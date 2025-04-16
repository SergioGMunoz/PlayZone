//Estuctura de datos para el juego trio


//Lista de objetos repetidas 3 veces (cartas con id y ruta img)
const chosenCards = [];
lives = 6;

const cards = [
  { id: 0 },
  { id: 0 },
  { id: 0 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 2 },
  { id: 2 },
  { id: 2 },
  { id: 3 },
  { id: 3 },
  { id: 3 },
  { id: 4 },
  { id: 4 },
  { id: 4 },
  { id: 5 },
  { id: 5 },
  { id: 5 }
];
  
document.getElementById("livesNum").textContent = lives;
shuffleCards();

// Bucle que pone una imagen por defecto a las cartas (simulando la parte trasera) y guarda el id en una clase.
let divCards = document.getElementById("cartas")
for (let i = 0; i < cards.length; i++) {
  let img = document.createElement("img");
  img.src = "img/Card-Back.png";
  img.classList = "trioCard " + cards[i].id;
  img.alt = "Carta misteriosa";
  img.addEventListener("click", function() {
    chooseCard(this);
  });
  divCards.appendChild(img);
}


// Método que mezcla las cartas al azar
function shuffleCards() {
  for (let i = 0; i < cards.length - 1; ++i) {
    const j = Math.floor(Math.random() * (cards.length - i)) + i; //Num entre 0 y el maximo
    const change = cards[i]; //Guardar carta i
    cards[i] = cards[j]; //J se queda en la posición de i
    cards[j] = change; // I se queda en la posición de j
  }
}


// Al elegir una carta
function chooseCard(card) {

  // Si es una carta que ya esta dada la vueltao se encontro, la ignoro
  if (card.classList.contains("found") || card.classList.contains("turned")) return;
  card.classList.add("turned");

  if (card.classList.contains("0")) card.src = "img/card0.png";
  if (card.classList.contains("1")) card.src = "img/card1.png";
  if (card.classList.contains("2")) card.src = "img/card2.png";
  if (card.classList.contains("3")) card.src = "img/card3.png";
  if (card.classList.contains("4")) card.src = "img/card4.png";
  if (card.classList.contains("5")) card.src = "img/card5.png";

  // Si ya se tenian 3 cartas elegidas, gira la anteriores
  if (chosenCards.length == 3) {
    for (let card of chosenCards) {
      card.src = "img/Card-Back.png";
      card.classList.remove("turned");
    }
    chosenCards.length = 0;
  }
  chosenCards.push(card);

  // Si es ahora cuando se tienen 3 cartas elegidas, comprueba si son iguales
  if (chosenCards.length == 3) {
    let cartasIguales = true;

    for (let card of chosenCards) {
      // Al encontrar cartas diferentes
      if (chosenCards[0].classList.value != card.classList.value) {
        cartasIguales = false;
        lives--;
        document.getElementById("livesNum").textContent = lives;
        break;
      }
    }

    // Si son todas iguales, las marca como encontradas
    if (cartasIguales) {
      for (let card of chosenCards) {
        card.classList.add("found");
      }
      chosenCards.length = 0;
    }
  }
}