// JavaScript funcionalidad de el juego quiz!
let score = 0; // Contador de puntos

// Estas funciones están descritas en la hoja timer.js
setTimeElement(document.getElementById('time'));
setTime(10);
startTimer();

function endTime() {

    // Redirigir a la pantalla final
    window.location.href = 'quiz-end.html';
}
end = endTime; // Asociar la referencia

// Preguntas y respuestas
const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        options: ["Madrid", "París", "Roma", "Berlín"],
        correct: 1 // Índice de la respuesta correcta
    },
    {
        question: "¿Cuál es el resultado de 5 + 3?",
        options: ["5", "8", "10", "7"],
        correct: 1
    },
    {
        question: "¿Qué lenguaje se usa para estilizar páginas web?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        correct: 1
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Miguel Ángel"],
        correct: 2
    }
];

// Elementos del DOM
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');

// Seleccionar el botón de la flecha
const nextButton = document.querySelector('#end-button button');

// Función para mostrar una pregunta aleatoria
function showRandomQuestion() {
    // Verificar si hay preguntas disponibles
    if (questions.length === 0) {
        console.log("No hay más preguntas disponibles.");
        return;
    }

    // Seleccionar una pregunta aleatoria
    const randomIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[randomIndex];

    // Actualizar el texto de la pregunta
    const questionElement = document.getElementById('question');
    questionElement.textContent = currentQuestion.question;

    // Limpiar las respuestas anteriores
    const answersElement = document.getElementById('awnsers');
    answersElement.innerHTML = "";

    // Colores de los botones (rotativos)
    const buttonColors = ['btn-info', 'btn-danger', 'btn-warning', 'btn-success'];

    // Generar las opciones de respuesta
    for (let i = 0; i < currentQuestion.options.length; i++) {
        const button = document.createElement('button');
        button.textContent = currentQuestion.options[i];
        button.classList.add('btn', buttonColors[i % buttonColors.length], 'w-100'); // Asignar colores rotativos
        button.addEventListener('click', function () {
            checkAnswer(i, currentQuestion.correct);
        });
        answersElement.appendChild(button);
    }

    // Eliminar la pregunta usada del array
    questions.splice(randomIndex, 1);
}

// Función para verificar la respuesta
function checkAnswer(selectedIndex, correctIndex) {
    const buttons = document.querySelectorAll('.btn'); // Seleccionar los botones de las respuestas
    const isCorrect = selectedIndex === correctIndex; // Comprobar si la respuesta es correcta

    for (let i = 0; i < buttons.length; i++) {
        if (i === correctIndex) {
            buttons[i].textContent += " ✔️"; // Agregar un tic verde a la respuesta correcta
        }
        if (!isCorrect && i === selectedIndex) {
            buttons[i].textContent += " ❌"; // Agregar una cruz roja a la respuesta incorrecta
        }
        buttons[i].disabled = true; // Deshabilitar todos los botones después de responder
    }

    // Actualizar el puntaje solo si la respuesta es correcta
    if (isCorrect) {
        score++;
        document.getElementById('points').textContent = score; // Actualizar el puntaje en el DOM
    }

    // Habilitar el botón de la flecha para pasar a la siguiente pregunta
    nextButton.disabled = false;
}

// Agregar evento al botón de la flecha
nextButton.addEventListener('click', function () {
    nextButton.disabled = true; // Deshabilitar el botón de la flecha hasta que se conteste la siguiente pregunta
    showRandomQuestion(); // Mostrar la siguiente pregunta
});

// Inicializar el quiz
showRandomQuestion();
