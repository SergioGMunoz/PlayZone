// Funcionalidades relacionadas con el codigo de la pagina principal
let gameSRC; //El src del juego a cargar

//Actualiza el SRC de la página juegos
function updateSrc(){
    const iframe = document.getElementById('game-iframe');
    if (!iframe){ 
        console.log("No ha localizado el iframe games");
    }else{
        iframe.src = gameSRC;
    }
}

//Diferentes llamadas a juegos cambia la pagina y actualiza el iframe para mostrar tal juego
function goGame(game) {
  switch (game) {
    case "quiz":
      gameSRC = "pages/quiz/quiz-start.html";
      break;
    case "trio":
      gameSRC = "pages/trio/trio.html";
      break;
    case "guerrillas":
      gameSRC = "pages/guerrillas/guerillas.html";
      break;
    default:
      console.log(`EL juego ${game} no esta contemplado`);
      return;
  }
  window.location.href = "games.html";
  updateSrc();
}
