// Funcionalidades relacionadas con el codigo de la pagina principal

//Actualiza el SRC de la página juegos
function updateSrc() {
  // Acccede a la información de la URL
  const game = new URLSearchParams(window.location.search).get("game");
  if (!game){
    console.error("No se ha aportado ningun juego");

  } else {
    console.log("Accediendo URL: " + game);
    document.getElementById("game-iframe").src = game;
  }
}

window.addEventListener("load", updateSrc);