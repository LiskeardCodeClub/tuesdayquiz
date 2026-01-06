const quizData = [
    {
        question: "What is machine learning?",
        options: ["A method where computers become smarter by increasing processing speed", "Computers using patterns in data to make predictions or decisions", "Robots attending school to learn how to become smarter", "A technique where computers copy the smartest device in the room"],
        answer: "Computers using patterns in data to make predictions or decisions"
    },
    {
        question: "What does AI stand for?",
        options: ["Algorithmic interface", "Automated Infrastructure", "Almost intelligent", "Artificial Intelligence"],
        answer: "Artificial Intelligence"
    },
    {
        question: "The chatbot we created today was an example of:",
        options: ["Recognising numbers", "Recognising images", "Recognising text", "Generating text"],
        answer: "Recognising text"
    },
    {
        question: "When we say 'training data' we mean:",
        options: ["A playlist of motivational songs for an AI to focus", "The data an AI learns from when making its decisions", "A special type of hardware that boosts an AI's speed", "Data on an artificial exercise routine"],
        answer: "The data an AI learns from when making its decisions"
    },
    {
        question: "What is AI confience?",
        options: ["The probability that a specific AI prediciton is correct", "A personality trait AI gains after completing successful tasks", "A memory-allocation setting that increases as AI stores more training data", "A security rating that shows how resistant an AI is to hacking"],
        answer: "The probability that a specific AI prediciton is correct"
    },
    {
        question: "How does AI learn?",
        options: ["By watching motivational videos", "By storing all user interactions in a master file and replaying them", "By downloading new skills from the internet when it needs them", "By practicing with lots of examples"],
        answer: "By practicing with lots of examples"
    },
    {
        question: "What was the website we were using today?",
        options: ["Machine Learning Skills", "Machine learning for kids", "Artificial Intelligence in Scratch", "Learning AI"],
        answer: "Machine learning for kids"
    },
    {
        question: "What does a machine learning model learn from?",
        options: ["Data", "Random guesses", "By searching the internet", "Variables"],
        answer: "Data"
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




