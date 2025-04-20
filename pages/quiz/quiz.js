// JavaScript funcionalidad de el juego quiz!
let score = 0; // Contador de puntos
let currentQuestionIndex = 0; // Índice de la pregunta actual
let timeLeft = 10; // Tiempo por pregunta
let timerInterval; // Intervalo del temporizador

// Elementos del DOM
const timerElement = document.getElementById('time');
const pointsElement = document.getElementById('points');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('awnsers');
const nextButton = document.querySelector('#end-button button');

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

// Función para iniciar el temporizador
function startTimer() {
    timeLeft = 10; // Reiniciar el tiempo
    timerElement.textContent = timeLeft;

    clearInterval(timerInterval); // Limpiar cualquier temporizador previo
    timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            markCorrectAnswer(); // Marcar la respuesta correcta
            nextButton.disabled = false; // Habilitar el botón de siguiente
        }
    }, 1000);
}

// Función para marcar la respuesta correcta automáticamente
function markCorrectAnswer() {
    const buttons = document.querySelectorAll('.btn');
    const currentQuestion = questions[currentQuestionIndex];

    buttons.forEach((button, index) => {
        if (index === currentQuestion.correct) {
            button.textContent += " ✔️"; // Marcar la respuesta correcta
        }
        button.disabled = true; // Deshabilitar todos los botones
    });
}

// Función para mostrar una pregunta aleatoria
function showRandomQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endTime(); // Finalizar el juego si no hay más preguntas
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Actualizar el texto de la pregunta
    questionElement.textContent = currentQuestion.question;

    // Limpiar las respuestas anteriores
    answersElement.innerHTML = "";

    // Generar las opciones de respuesta
const buttonColors = ['btn-info', 'btn-danger', 'btn-warning', 'btn-success'];
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn', buttonColors[index % buttonColors.length], 'w-100');
        button.addEventListener('click', function () {
            checkAnswer(index, currentQuestion.correct);
        });
        answersElement.appendChild(button);
    });

    // Reiniciar el temporizador
    startTimer();

    currentQuestionIndex++; // Incrementar el índice de la pregunta
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
        pointsElement.textContent = score; // Actualizar el puntaje en el DOM
    }

    clearInterval(timerInterval); // Detener el temporizador
    // Habilitar el botón de la flecha para pasar a la siguiente pregunta
    nextButton.disabled = false;
}

// Función para finalizar el juego
function endTime() {
    // Guardar el puntaje y el número total de preguntas en localStorage
    localStorage.setItem('quizScore', score);
    localStorage.setItem('questionsAnswered', questions.length);

    // Redirigir a la pantalla final
    window.location.href = 'quiz-end.html';
}

// Agregar evento al botón de la flecha
nextButton.addEventListener('click', function () {
    nextButton.disabled = true; // Deshabilitar el botón de la flecha hasta que se conteste la siguiente pregunta
    showRandomQuestion(); // Mostrar la siguiente pregunta
});

// Inicializar el quiz
document.addEventListener('DOMContentLoaded', function () {
    showRandomQuestion(); // Mostrar la primera pregunta
});
