const quizQuestions = [
    {
        question: "1. What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High-Level Text Language", "Hyper Transfer Markup Language", "Hyper Text Machine Language"],
        answer: "Hyper Text Markup Language"
    },
    { 
        question: "2.Which of the following is a frontend technology?", 
        options: ["Python", "HTML", "Node.js", "MongoDB"], 
        answer: "HTML" 
    },
   
    {
        question: "3. Which of the following is used to structure the content of a webpage?",
        options: ["JavaScript", "CSS", "HTML", "Python"],
        answer: "HTML"
    },
    {
        question: "4. What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style System", "Creative Styling System", "Cascading Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "5. Which of the following is NOT a valid CSS property?",
        options: ["color", "font-size", "background-color", "create-box"],
        answer: "create-box"
    },
    {
        question: "6. In CSS, how do you select an element by its class?",
        options: ["#classname", ".classname", "classname", "@classname"],
        answer: ".classname"
    },
    {
        question: "7. What are the four components of the CSS Box Model?",
        options: ["Width, Height, Background, Border", "Padding, Margin, Border, Content", "Style, Layout, Color, Font", "Class, ID, Tag, Attribute"],
        answer: "Padding, Margin, Border, Content"
    },
    {
        question: "8. Which of the following is a correct example of a CSS rule?",
        options: ["color:red; font-size:32px;", "color = red; font-size = 32px;", "color - red; font-size - 32px;", "color:red font-size:32px;"],
        answer: "color:red; font-size:32px;"
    },
    { 
        question: "9.What does the backend of a website handle?", 
        options: ["User interactions on the webpage", "Styling and layout of a website", "Database management and server-side logic", "Animations and visual effects"], 
        answer: "Database management and server-side logic" 
    },
    {
        question: "10. Which of the following statements is TRUE?",
        options: ["HTML is used for styling a webpage.", "CSS is responsible for the structure of a webpage.", "HTML and CSS work together to create a webpage.", "CSS is used to create backend logic for websites."],
        answer: "HTML and CSS work together to create a webpage."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 600; // 10 minutes

function loadQuestion() {
    let q = quizQuestions[currentQuestionIndex];
    document.getElementById("question-container").innerText = q.question;
    document.getElementById("options-container").innerHTML = q.options.map(opt => 
        `<div>
            <input type="radio" name="answer" id="${opt}" value="${opt}" onclick="checkAnswer(this)">
            <label for="${opt}" id="label-${opt}">${opt}</label>
        </div>`
    ).join("");
}

function checkAnswer(selectedOption) {
    let correctAnswer = quizQuestions[currentQuestionIndex].answer;
    let selectedValue = selectedOption.value;

    let labels = document.querySelectorAll("label");
    labels.forEach(label => label.classList.remove("correct", "wrong"));

    if (selectedValue === correctAnswer) {
        document.getElementById(`label-${selectedValue}`).classList.add("correct");
    } else {
        document.getElementById(`label-${selectedValue}`).classList.add("wrong");
        document.getElementById(`label-${correctAnswer}`).classList.add("correct"); // Highlight correct answer
    }
}

document.getElementById("next-btn").addEventListener("click", () => {
    let selected = document.querySelector("input[name='answer']:checked");
    
    if (!selected) {
        alert("Please select an answer before proceeding!");
        return;
    }

    if (selected.value === quizQuestions[currentQuestionIndex].answer) score++;

    if (++currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        localStorage.setItem("quizScore", score);
        window.location.href = "result.html";
    }
});

loadQuestion();

// ⏳ Timer Functionality
function startTimer() {
    let timeElement = document.getElementById("time");
    let interval = setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        timeElement.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (timer-- <= 0) {
            clearInterval(interval);
            localStorage.setItem("quizScore", score);
            window.location.href = "result.html"; 
        }
    }, 1000);
}

startTimer();
