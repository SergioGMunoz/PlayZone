// JavaScript funcionalidad de el juego quiz!

let score = 0; // Contador de puntos

// Estas funciones están descritas en la hoja timer.js
setTimeElement(document.getElementById('time'));
setTime(10);
startTimer();

function endTime() {
    // Guardar el puntaje en localStorage
    localStorage.setItem('quizScore', score);

    // Redirigir a la página final
    window.location.href = 'quiz-end.html';
    console.log("Se acabó el tiempo");
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
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        options: ["Tierra", "Marte", "Júpiter", "Saturno"],
        correct: 2
    },
    {
        question: "¿En qué año llegó el hombre a la Luna?",
        options: ["1965", "1969", "1972", "1980"],
        correct: 1
    },
    {
        question: "¿Cuál es el océano más grande del mundo?",
        options: ["Atlántico", "Pacífico", "Índico", "Ártico"],
        correct: 1
    },
    {
        question: "¿Qué instrumento mide la presión atmosférica?",
        options: ["Barómetro", "Termómetro", "Higrómetro", "Anemómetro"],
        correct: 0
    },
    {
        question: "¿Quién escribió 'Don Quijote de la Mancha'?",
        options: ["Miguel de Cervantes", "Gabriel García Márquez", "Pablo Neruda", "Federico García Lorca"],
        correct: 0
    },
    {
        question: "¿Cuál es el metal más ligero?",
        options: ["Oro", "Plata", "Litio", "Aluminio"],
        correct: 2
    }
];

// Elementos del DOM
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const pointsEndElement = document.getElementById('ponits-end'); // Elemento para mostrar los puntos

// Función para mostrar una pregunta aleatoria
function showRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[randomIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = ""; // Limpiar opciones anteriores

    // Usar un bucle for para generar las opciones
    for (let i = 0; i < currentQuestion.options.length; i++) {
        const button = document.createElement('button');
        button.textContent = currentQuestion.options[i];
        button.classList.add('option');
        button.addEventListener('click', function () {
            checkAnswer(i, currentQuestion.correct);
        });
        optionsElement.appendChild(button);
    }
}

// Función para verificar la respuesta
function checkAnswer(selectedIndex, correctIndex) {
    const buttons = document.querySelectorAll('.option');
    for (let i = 0; i < buttons.length; i++) {
        if (i === correctIndex) {
            buttons[i].classList.add('correct'); // Marcar la respuesta correcta
        }
        if (i === selectedIndex && i !== correctIndex) {
            buttons[i].classList.add('incorrect'); // Marcar la respuesta incorrecta
        }
        buttons[i].disabled = true; // Deshabilitar botones después de responder
    }

    // Actualizar el puntaje
    if (selectedIndex === correctIndex) {
        score++;
    } else {
        score--;
    }

    // Mostrar el puntaje actualizado
    pointsEndElement.textContent = score;
}

// Inicializar el quiz
showRandomQuestion();
