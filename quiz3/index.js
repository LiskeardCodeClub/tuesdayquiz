const quizData = [
    {
        question: "What was the name of the coding language we were using today?",
        options: ["Java", "Machine Learning", "Python", "Snake"],
        answer: "Python"
    },
    {
        question: "What is an indentation error?",
        options: ["When code is on the wrong line", "When code is not properly alligned", "When functions aren't defined properly", "When there's a dent in your computer"],
        answer: "When code is not properly alligned"
    },
    {
        question: "What is vectorisation?",
        options: ["Using numbers in your Python script", "Adding numbers to your python script", "Assigning something a numeric value so a computer can understand the result", "Basic calculations like 1 + 1"],
        answer: "Assigning something a numeric value so a computer can understand the result"
    },
    {
        question: "What is the symbol to make a comment in Python?",
        options: ["#", "--><--", "//", "**"],
        answer: "#"
    },
    {
        question: "What is an example of when we would use type conversion on a user input?",
        options: ["We prefer different types of data", "Python interprets different types of data better than others", "Because strings are easier to use", "To get different data types to work together as intended"],
        answer: "To get different data types to work together as intended"
    },
    {
        question: "Which keyword will define a function in Python?",
        options: ["define", "function", "def", "func"],
        answer: "def"
    },
    {
        question: "What will this evaluate to in Python? 3 == '3'",
        options: ["True", "3", "An error", "False"],
        answer: "False"
    },
    {
        question: "Which keyword can initiate a loop?",
        options: ["if", "while", "when", "All of the above"],
        answer: "while"
    },
    {
        question: "What is an example of a conditional?",
        options: ["if", "elif", "else", "All of the above"],
        answer: "All of the above"
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



