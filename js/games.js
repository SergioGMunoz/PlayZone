// JavaScript completo de games

//Actualiza el SRC de la página juegos
function updateSrc() {
  // Acccede a la información de la URL
  const game = new URLSearchParams(window.location.search).get("game");
  console.log("Accediendo URL: " + game);

  switch (game) {
    case "quiz":
      console.log("Cargado QUIZ");
      document.getElementById("game-iframe").src ="pages/quiz/quiz-start.html";
      break;
    case "trio":
      document.getElementById("game-iframe").src ="pages/trio/trio.html";
      break;
    case "guerrillas":
      document.getElementById("game-iframe").src =
        "pages/guerrillas/guerrillas.html";
      break;
    default:
      console.error(`El juego '${game}' no está contemplado`);
      return;
  }
}

window.addEventListener("load", updateSrc);
