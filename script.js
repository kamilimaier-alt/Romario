const questions = [

    {
        question: "Qual é o nome completo de Romário?",
        answers: [
            "Romário de Souza Faria",
            "Romário da Silva Santos",
            "Romário Ferreira Lima",
            "Romário Souza da Silva"
        ],
        correct: 0
    },

    {
        question: "Em qual cidade Romário nasceu?",
        answers: [
            "São Paulo",
            "Rio de Janeiro",
            "Salvador",
            "Belo Horizonte"
        ],
        correct: 1
    },

    {
        question: "Em qual ano Romário nasceu?",
        answers: [
            "1962",
            "1966",
            "1970",
            "1974"
        ],
        correct: 1
    },

    {
        question: "Qual era o principal apelido de Romário?",
        answers: [
            "O Fenômeno",
            "O Baixinho",
            "O Rei",
            "O Imperador"
        ],
        correct: 1
    },

    {
        question: "Por qual clube Romário iniciou sua carreira profissional?",
        answers: [
            "Flamengo",
            "Vasco da Gama",
            "Fluminense",
            "Botafogo"
        ],
        correct: 1
    },

    {
        question: "Em qual ano o Brasil foi campeão da Copa do Mundo com Romário?",
        answers: [
            "1986",
            "1990",
            "1994",
            "1998"
        ],
        correct: 2
    },

    {
        question: "Por qual clube europeu Romário ficou famoso na Holanda?",
        answers: [
            "Ajax",
            "PSV",
            "Feyenoord",
            "AZ Alkmaar"
        ],
        correct: 1
    },

    {
        question: "Qual grande clube espanhol teve Romário em seu elenco?",
        answers: [
            "Real Madrid",
            "Barcelona",
            "Valencia",
            "Sevilla"
        ],
        correct: 1
    },

    {
        question: "Romário também entrou para qual área depois de sua carreira no futebol?",
        answers: [
            "Cinema",
            "Música",
            "Política",
            "Jornalismo"
        ],
        correct: 2
    },

    {
        question: "Qual posição Romário jogava principalmente?",
        answers: [
            "Goleiro",
            "Zagueiro",
            "Meio-campista",
            "Atacante"
        ],
        correct: 3
    }

];

let currentQuestion = 0;
let score = 0;

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const nextButton =
    document.getElementById("next-button");

const scoreElement =
    document.getElementById("score");

const questionNumber =
    document.getElementById("question-number");

const progress =
    document.getElementById("progress");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");

const finalScore =
    document.getElementById("final-score");

const resultText =
    document.getElementById("result-text");

const resultMessage =
    document.getElementById("result-message");

const restartButton =
    document.getElementById("restart-button");


function loadQuestion() {

    const question = questions[currentQuestion];

    questionElement.textContent =
        question.question;

    questionNumber.textContent =
        currentQuestion + 1;

    answersElement.innerHTML = "";

    nextButton.style.display = "none";

    const progressValue =
        ((currentQuestion) / questions.length) * 100;

    progress.style.width =
        progressValue + "%";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.classList.add("answer");

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () => selectAnswer(button, index)
            );

            answersElement.appendChild(button);
        }
    );
}


function selectAnswer(button, selectedIndex) {

    const correctIndex =
        questions[currentQuestion].correct;

    const buttons =
        document.querySelectorAll(".answer");


    buttons.forEach((btn, index) => {

        btn.disabled = true;

        if (index === correctIndex) {
            btn.classList.add("correct");
        }

    });


    if (selectedIndex === correctIndex) {

        button.classList.add("correct");

        score += 100;

        scoreElement.textContent =
            score;

    } else {

        button.classList.add("wrong");

    }

    nextButton.style.display =
        "block";
}


nextButton.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showResult();

        }

    }
);


function showResult() {

    quizScreen.style.display =
        "none";

    resultScreen.style.display =
        "block";

    finalScore.textContent =
        score + " pontos";


    const percentage =
        (score / (questions.length * 100)) * 100;


    resultText.textContent =
        `Você acertou ${score / 100} de ${questions.length} perguntas.`;


    if (percentage === 100) {

        resultMessage.textContent =
            "🥇 Perfeito! Você é um especialista no Romário!";

    } else if (percentage >= 70) {

        resultMessage.textContent =
            "🥈 Muito bem! Você conhece bastante o Baixinho!";

    } else if (percentage >= 50) {

        resultMessage.textContent =
            "🥉 Bom trabalho! Você pode melhorar ainda mais.";

    } else {

        resultMessage.textContent =
            "📚 Que tal estudar mais sobre a carreira do Romário e tentar novamente?";

    }

}


restartButton.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        scoreElement.textContent = "0";

        quizScreen.style.display =
            "block";

        resultScreen.style.display =
            "none";

        loadQuestion();

    }
);


loadQuestion();