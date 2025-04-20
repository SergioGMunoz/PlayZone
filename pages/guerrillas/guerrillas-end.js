function goHome() {
  window.top.location.href = "../../index.html";
}

function playAgain() {
  window.location.href = "guerrillas-game.html";
}

document.getElementById("home").addEventListener("click", goHome);
document.getElementById("play-again").addEventListener("click", playAgain);
