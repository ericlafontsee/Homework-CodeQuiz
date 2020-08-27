// Button variable declarations
var startBtn = document.querySelector("#start-button");
var closeBtn = document.querySelector(".close");
var saveBtn = document.querySelector("#save");

// High Scores List variable declarations
var highScoresList = document.querySelector("#highScoresList");
var enterInitials = document.querySelector("#enterInitials");
var highScorelink = document.querySelector("#highScoreLink");
var modalEl = document.querySelector("#modal-container");
var modalNameEl = document.querySelector("#modal-name");
var highScoreForm = document.querySelector("#highScoreForm");
var highScores = [];

//Quiz content and components - variable declarations
var questionaireDiv = document.querySelector("#questionaire");
var currentQuestion = document.querySelector("#currentQuestion");
var optionsDiv = document.querySelector("#optionsDiv");
var optionsUl = document.querySelector("#optionsUl");
var index = -1;
var userChoices;
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
        choices: ["window.alert", "console.log();", "print.screen();", "print.console"],
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

// Timer and score variable declarations
var timer = document.getElementById("timer");
var currentTimer = 60;
var timesUp = document.querySelector("#timesup");
timesUp.style.display = "none";
var score = 0;

//Starts timer and triggers the quiz to start. 
function startTimer(event) {
    event.preventDefault()
    startBtn.style.display = "none";
    modalEl.style.display = "none";
    highScorelink.style.display = "none";

    var timeInterval = setInterval(function () {
        timer.textContent = "Time Remaining: " + currentTimer;
        currentTimer--;

        if (currentTimer === 0 || currentTimer < 0) {
            timer.textContent = "";
            timesUp.style.display = "block";
            highScorelink.style.display = "none";
            currentQuestion.textContent = "";
            optionsUl.style.display = "none";
            startBtn.style.display = "block";
            startBtn.textContent = "Try Again";
            startBtn.addEventListener("click", function (event) {
                window.location.reload();
            });
            clearInterval(timeInterval);
        } else if (index > quiz.length - 1) {
            timer.textContent = "";
            init();
            clearInterval(timeInterval);
        }

    }, 1000);
    startQuiz(1);
}

//Starts quiz and cycles through quiz array
function startQuiz(direction) {

    index += direction;
    currentQuestion.textContent = "";
    optionsUl.innerHTML = "";
    optionsUl.style.listStyleType = "none";
    currentQuestion.textContent = quiz[index].question;
    userChoices = quiz[index].choices;

    userChoices.forEach(function (option) {
        var optionsLi = document.createElement("li");
        optionsLi.style.padding = "10px";
        var optionBtn = document.createElement("button");
        optionBtn.style.width = "200px";
        optionBtn.style.wordWrap = "break-word";
        optionBtn.style.border = "5px outset white";
        optionsLi.appendChild(optionBtn);
        optionBtn.textContent = option;
        optionsDiv.appendChild(optionsUl);
        optionsUl.appendChild(optionsLi);
        optionsLi.addEventListener("click", (checkAnswer));
    });
}

//Checks user's answers against the correct answers.
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
        init();
    }
}

//Opens the High Scores form for user to enter intials and loads a ranked list from local storage.
function init() {
    modalEl.style.display = "block";

    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    if (storedHighScores) {
        storedHighScores.sort(function(a,b){
            return b.score - a.score; });
        highScores = storedHighScores;
    }
    renderHighScores();
}

//Grabs any other high scores from local storage and displays them in the High Scores Form.
function renderHighScores() {
    highScoresList.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
        var currentIndex = highScores[i];
        var li = document.createElement("li");
        li.textContent = currentIndex.initials + ": " + currentIndex.score;
        highScoresList.appendChild(li);
    }
}

//Sends user's scores to local storage
function storeHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

//Prompts user to enter their initials. Score is stored.
highScoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(highScores);

    if (!enterInitials.value) {
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

//Opens up the high scores list if user clicks High Scores button in the header.
highScorelink.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    init();
    modalEl.style.display = "block";
    currentQuestion.textContent = "";
    startBtn.style.display = "none";
    timer.textContent = "";
    optionsUl.style.display = "none";
    saveBtn.style.display = "none";
    enterInitials.style.display = "none";
});

//Closes the High Score Form
function close() {
    modalEl.style.display = "none";
    index = 0;
    startBtn.style.display = "block";
    currentTimer = 60;
    window.location.reload("refresh");
}

//Saves user's initials and score
saveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(highScores);
    if (!enterInitials.value ) {
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
    modalEl.style.display = "none";
    window.location.reload("refresh");
});
closeBtn.addEventListener("click", close);
startBtn.addEventListener("click", startTimer);
