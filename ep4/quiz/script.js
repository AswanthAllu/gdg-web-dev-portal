const quizQuestions = [
    {
        question: "1. How do you create a new file in VS Code?",
        options: ["Right-click", "Ctrl + N", "File > New", "All"],
        answer: "All"
    },
    {
        question: "2. What is the correct file extension for a CSS file?",
        options: [".htm", ".cs", ".css", ".style"],
        answer: ".css"
    },
    {
        question: "3. Which language is used to structure the content of a webpage?",
        options: ["CSS", "JS", "HTML", "Python"],
        answer: "HTML"
    },
    {
        question: "4. Which tag has both a start and end tag?",
        options: ["paragraph" , "heading" ,"image","button"],
        answer: "image"
    },
    {
        question: "5. What is the use of the <p> tag?",
        options: ["Image", "Heading", "Paragraph", "List"],
        answer: "Paragraph"
    },
    {
        question: "6. Which CSS selector targets a class?",
        options: ["#", ".", "/", "*"],
        answer: "."
    },
    {
        question: "7. How do you set the height and width of an image in CSS?",
        options: ["size", "scale", "img-size", "height & width"],
        answer: "height & width"
    },
    {
        question: "8. What is the purpose of the class attribute?",
        options: ["Style", "Script", "Link", "Form"],
        answer: "Style"
    },
    {
        question: "9. How to change background color in CSS?",
        options: ["bg", "bg-color", "background-color", "back-color"],
        answer: "background-color"
    },
    {
        question: "10. Which applies style on hover?",
        options: [":click", ":hover", ":focus", ":enter"],
        answer: ":hover"
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
        document.getElementById(`label-${correctAnswer}`).classList.add("correct");
    }
}

document.getElementById("next-btn").addEventListener("click", () => {
    let selected = document.querySelector("input[name='answer']:checked");
    
    if (!selected) {
        alert("Please select an answer before proceeding!");
        return;
    }

    if (selected.value === quizQuestions[currentQuestionIndex].answer) score++;

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        localStorage.setItem("quizScore", score);
        window.location.href = "result.html";
    }
});

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

loadQuestion();
startTimer();
