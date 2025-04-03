//Estuctura de datos para el juego trio


//Lista de objetos repetidas 3 veces (cartas con id y ruta img)
const cards =
  ({ id: 0, img: "resources/img/cards/card0" },
  { id: 0, img: "resources/img/cards/card0" },
  { id: 0, img: "resources/img/cards/card0" },
  { id: 1, img: "resources/img/cards/card1" },
  { id: 1, img: "resources/img/cards/card1" },
  { id: 1, img: "resources/img/cards/card1" },
  { id: 2, img: "resources/img/cards/card2" },
  { id: 2, img: "resources/img/cards/card2" },
  { id: 2, img: "resources/img/cards/card2" },
  { id: 3, img: "resources/img/cards/card3" },
  { id: 3, img: "resources/img/cards/card3" },
  { id: 3, img: "resources/img/cards/card3" },
  { id: 4, img: "resources/img/cards/card4" },
  { id: 4, img: "resources/img/cards/card4" },
  { id: 4, img: "resources/img/cards/card4" },
  { id: 5, img: "resources/img/cards/card5" },
  { id: 5, img: "resources/img/cards/card5" },
  { id: 5, img: "resources/img/cards/card5" });

//Método que mezla la lista cards
function shuffleCards() {
    for (let i = 0; i < cards.length - 1; ++i) {
        const j = Math.floor(Math.random() * (cards.length - i)) + i; //Num entre 0 y el maximo
        const change = cards[i]; //Guardar carta i
        cards[i] = cards[j]; //J se queda en la posición de i
        cards[j] = change; // I se queda en la posición de j
      }
      console.log(cards); //Prueba
}
