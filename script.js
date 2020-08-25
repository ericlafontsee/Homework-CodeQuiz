var score = 0;
var startBtn = document.querySelector("#start-button");
var highScoreForm = document.querySelector("#highScoreForm");
var timer = document.getElementById("timer");
var currentQuestion = document.querySelector("#currentQuestion");
var index = 0;
var optionsUl = document.createElement("ul");
optionsUl.style.listStyleType = "none";
var highScore = localStorage.getItem("score");
var modalEl = document.querySelector("#modal-container");
var modalNameEl = document.querySelector("#modal-name");
var closeBtn = document.querySelector(".close");
var saveBtn = document.querySelector("#save");
var highScoresList = document.querySelector("#highScoresList");
var enterInitials = document.querySelector("#enterInitials");


var highScores = [];
var currentId = 0;
var quiz = [
    {
        question: "What data types can an array store?",
        choices: ["strings", "booleans", "numbers", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Which of the following stores a value?",
        choices: ["if statement", "boolean", "var", "event propagation"],
        answer: "var"
    },
    {
        question: "How do you check that two variables are equal in value and in type?",
        choices: ["=", "==", "!==", "==="],
        answer: "==="
    },
    {
        question: "How do you print something to the console in JS?",
        choices: ["window.alert", "console.log()", "print.screen()", "print.console"],
        answer: "console.log()"
    },
    {
        question: "You must convert celisus to farenhiet several times on your website. What is the best way to reuse the same equation in JS?",
        choices: ["function", "variables", "for loop", "while loop"],
        answer: "function"
    },
    {
        question: "Which method finds the element with a class of 'test' in an HTML document?",
        choices: [".addEventListener('.test')", "document.querySelector('.test')", "document.getElementByID('#test')", "doc.find('.test')"],
        answer: "document.querySelector('.test')"
    }
];
var currentTimer = 60;

function startTimer(event) {
    event.preventDefault()
    startBtn.style.display = "none";

    var timeInterval = setInterval(function () {
        timer.textContent = "Time Remaining: " + currentTimer;
        currentTimer--;

        if (currentTimer === 0) {
            timer.textContent = "TIMES UP!";
            currentQuestion.textContent = "";
            optionsUl.style.display = "none";
            saveScore(event);      //**** CHeck */
            clearInterval(timeInterval);
        } else if (index > quiz.length - 1) {
            timer.textContent = "";
            saveScore();
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
function saveScore(event) {
    modalEl.style.display = "block";
    // saveBtn.addEventListener("click", function(event){
    // modalEl.style.display = "none";

    // })
    init();
}
// function addHighScore(event) {
//     event.preventDefault();
//     var name = enterInitials.value;
//     if (!name) {//notmine
//         alert("Please enter your initials");
//     } else {
//         var userScore = {
//             initials: initials,
//             score: score
//         }
//     }
//     highScores = localStorage.getItem("allScores")
//     if (!highScores) {
//         highScores = [];
//     } else {
//         highScores = JSON.parse(highScores);
//     }
//     highScores.push(userScore);
//     var newScore = JSON.stringify(highScores);
//     localStorage.setItem("highScores", newScore);

    function renderHighScores() {
        highScoresList.innerHTML = "";

        for (var i = 0; i < highScores.length; i++) {
            var currentIndex = highScores[i];
            var li = document.createElement("li");
            li.textContent = currentIndex;
            highScoresList.appendChild(li);
        }
    }
    function init() {
        var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
        if (storedHighScores) {
            highScores = storedHighScores;
        }
        renderHighScores();
    }

    function storeHighScores() {
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    saveBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if(!enterInitials){
        alert("Please enter your initials");
            } else {
                var userScore = {
                    initials: enterInitials,
                    score: score
                }
            highScores.push(userScore);
            storeHighScores();
            renderHighScores();
        }
    });
  
    closeBtn.addEventListener("click", close);
    startBtn.addEventListener("click", startTimer);
    // addBtn.addEventListener("click", addHighScore);
