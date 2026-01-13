const quizData = [
    {
        question: "What were we teaching our MicroBits today?",
        options: ["How to run", "Gesture recognition", "Machine learning", "Code"],
        answer: "Gesture recognition"
    },
    {
        question: "What was the MicroBit component primarily used in training this data?",
        options: ["Radio", "Speaker", "LEDs", "Accelerometer"],
        answer: "Accelerometer"
    },
    {
        question: "What were the labels for measuring the MicroBit's orientation?",
        options: ["y, x, a", "x, y, z", "a, b, c", "x, y, a"],
        answer: "x, y, z"
    },
    {
        question: "What was the minimum number of samples the needed to train a model?",
        options: ["3", "2", "10", "5"],
        answer: "3"
    },
    {
        question: "Why might a trained model give incorrect predictions?",
        options: ["It is getting confused with other trained actions", "The model doesn't have enough training data to be confident", "There are problems with the code", "All of them"],
        answer: "All of them"
    },
    {
        question: "What part of the MakeCode website allows us to train our MicroBits?",
        options: ["MakeCode", "Educationhub", "Machinelearningforkids", "Createai"],
        answer: "Createai"
    },
    {
        question: "What reasons are there to add multiple pieces of training data?",
        options: ["To help your AI increase it's confidence in what data it's recognising", "To waste time", "To help the machine learning model recognise the AI", "To make it learn how to code"],
        answer: "To help your AI increase it's confidence in what data it's recognising"
    },
    {
        question: "How can adjusting the recognition point affect training your machine learning model?",
        options: ["It can help train your AI", "It can help it learn how to process data", "It can help it differentiate between similar actions", "All of the above"],
        answer: "It can help it differentiate between similar actions"
    },
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const quiz = document.getElementById("quiz");
const progressBar = document.getElementById("progress");

let currentQuestion = 0;
let score = 0;
let reviewData = []; // store user answers for final review

function updateProgressBar() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = progress + "%";
}

function showQuestion() {
    updateProgressBar();

    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", selectAnswer);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;
    const buttons = document.querySelectorAll(".option-btn");

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    let isCorrect = selectedButton.innerText === answer;

    // Highlight correct/wrong
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        buttons.forEach(btn => {
            if (btn.innerText === answer) {
                btn.classList.add("correct");
            }
        });
    }

    // Save review info
    reviewData.push({
        question: quizData[currentQuestion].question,
        correctAnswer: answer,
        userAnswer: selectedButton.innerText,
        isCorrect: isCorrect
    });

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    updateProgressBar(); // fill bar to 100%

    quiz.innerHTML = `
        <h1>Quiz Completed!</h1>
        <h2 style="color: white">Review Your Answers</h2>
        <p style="color: white;">Your Score: ${score}/${quizData.length}</p>
        <div id="review"></div>
    `;

    const reviewContainer = document.getElementById("review");

    reviewData.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("review-item");

        div.innerHTML = `
            <p><strong>Q:</strong> ${item.question}</p>
            <p><strong>Your Answer:</strong> 
                <span class="${item.isCorrect ? "correct" : "wrong"}">
                    ${item.userAnswer}
                </span>
            </p>
            <p><strong>Correct Answer:</strong> ${item.correctAnswer}</p>
            <hr>
        `;

        reviewContainer.appendChild(div);
    });
}


showQuestion();




