var score = 0;
var startBtn = document.querySelector("#start-button");
var highScoreForm = document.querySelector("#highScoreForm");
var timer = document.getElementById("timer");
var currentQuestion = document.querySelector("#currentQuestion");
var questionaireDiv = document.querySelector("#questionaire");
var index = -1;
var optionsUl = document.createElement("ul");
optionsUl.style.listStyleType = "none";
var modalEl = document.querySelector("#modal-container");
var modalNameEl = document.querySelector("#modal-name");
var closeBtn = document.querySelector(".close");
var saveBtn = document.querySelector("#save");
var highScoresList = document.querySelector("#highScoresList");
var enterInitials = document.querySelector("#enterInitials");
var highScorelink = document.querySelector("#highScoreLink");
var gameOver = document.querySelector("#gameover");
gameOver.style.display = "none";
var currentTimer = 60;

var highScores = [];
var currentId = 0;
var quiz = [
    {
        question: "Which of the following can be assigned a value?",
        choices: ["If statement", "Boolean", "Var", "Event propagation"],
        answer: "Var"
    },
    {
        question: "How do you check that two variables are equal in value and in type?",
        choices: ["=", "==", "!==", "==="],
        answer: "==="
    },
    {
        question: "How do you print something to the console in JavaScript?",
        choices: ["window.alert", "console.log()", "print.screen()", "print.console"],
        answer: "console.log()"
    },
    {
        question: "You must convert celisus to farenhiet several times on your website. What is the best way to reuse the same equation in JavaScript?",
        choices: ["Function", "Variables", "A for loop", "A while loop"],
        answer: "Function"
    },
    {
        question: "Which method finds the element with a class of 'test' in an HTML document?",
        choices: [".addEventListener('.test')", "document.querySelector('.test')", "document.getElementByID('#test')", "doc.find('.test')"],
        answer: "document.querySelector('.test')"
    },
    {
        question: "If a variable is declared at the top of the JavaScript file and it is not nested it is a _____ variable?",
        choices: ["Top-level", "Local", "Global", "King"],
        answer: "Global"
    },
    {
        question: "When you need to get files from a repository linked to your computer, you must perform what action in the terminal?",
        choices: ["git add", "git commit", "git pull", "git clone"],
        answer: "git pull"
    },
    {
        question: "What is the shorthand for incrementing the variable 'i' by 1?",
        choices: ["i = i + 1;", "i--;", "i++;", "i + 1;"],
        answer: "i++;"
    },
    {
        question: "Which of the following are JavaScript keywords",
        choices: ["var", "let", "const", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What data types can an array store?",
        choices: ["Strings", "Booleans", "Numbers", "All of the above"],
        answer: "All of the above"
    }
];

function startTimer(event) {
    event.preventDefault()
    startBtn.style.display = "none";
    modalEl.style.display = "none";

    var timeInterval = setInterval(function () {
        timer.textContent = "Time Remaining: " + currentTimer;
        currentTimer--;

        if (currentTimer === 0) {
            timer.textContent = "";
            gameOver.style.display = "block";
            highScorelink.style.display = "none";
            currentQuestion.textContent = "";
            optionsUl.style.display = "none";
            clearInterval(timeInterval);
        } else if (index > quiz.length - 1) {
            timer.textContent = "";
            init();
            clearInterval(timeInterval);
        }

    }, 1000);
    startQuiz(1);
}
var userChoices;
function startQuiz(direction) {

    index += direction;
    currentQuestion.textContent = "";
    optionsUl.innerHTML = "";
    currentQuestion.textContent = quiz[index].question;
    userChoices = quiz[index].choices;

    userChoices.forEach(function (option) {
        var optionsLi = document.createElement("li");
        optionsLi.style.margin = "20px";
        var optionBtn = document.createElement("button");
        optionBtn.style.width = "200px";
        optionBtn.style.wordWrap = "break-word";
        optionBtn.style.border = "5px outset white";

        optionsLi.appendChild(optionBtn);
        optionBtn.textContent = option;
        questionaire.appendChild(optionsUl);
        optionsUl.appendChild(optionsLi);
        optionsLi.addEventListener("click", (checkAnswer));
    });
}
function checkAnswer(event) {
    var element = event.target;
    if (element.textContent === quiz[index].answer) {
        score++;
        alert("Correct! Your score is: " + score);
        startQuiz(1);
    } else {
        alert("Incorrect! You've been penalized 10 seconds!");
        currentTimer -= 10;
        startQuiz(1);
    }
    if (index > quiz.length - 1) {
        saveScore();
    }
}

function close() {
    modalEl.style.display = "none";
    index = 0;
    startBtn.style.display = "block";
    // startBtn.setAttribute("style" "margin: 0 auto");
    currentTimer = 60;

}
// function saveScore(event) {
//     modalEl.style.display = "block";
//     saveBtn.addEventListener("click", function(event){
//     modalEl.style.display = "none";
//     init();
//     })
   
// }

function renderHighScores() {
    highScoresList.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
        var currentIndex = highScores[i];
        console.log(currentIndex);
        var li = document.createElement("li");
        li.textContent = currentIndex.initials + ": " + currentIndex.score;
        highScoresList.appendChild(li);
    }
}
function init() {
    modalEl.style.display = "block";

    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    if (storedHighScores) {
        highScores = storedHighScores;
    }
    renderHighScores();
}

function storeHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

highScoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(highScores);

    if (!enterInitials) {
        alert("Please enter your initials");
    } else {
        var userScore = {
            initials: enterInitials.value,
            score: score
        };
        enterInitials.value = "";
        highScores.push(userScore);
        storeHighScores();
        renderHighScores();
    }
});

highScorelink.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    init();
    modalEl.style.display = "block";
    // enterInitials.style.display = "none";
    // saveBtn.style.display = "none";

});

closeBtn.addEventListener("click", close);
startBtn.addEventListener("click", startTimer);
