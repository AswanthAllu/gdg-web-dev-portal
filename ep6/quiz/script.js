const quizQuestions = [
    {
        question: "1. What does the 'display: flex' property do in CSS?",
        options: ["Defines the document structure", "Aligns elements in a column", "Enables a flex container", "Sets the display mode to block"],
        answer: "Enables a flex container"
    },
    {
        question: "2. What does the 'justify-content: center' property do in a flex container?",
        options: [
            "Aligns items to the top of the container",
            "Aligns items to the bottom of the container",
            "Centers items horizontally in the container",
            "Aligns items vertically in the container"
        ],
        answer: "Centers items horizontally in the container"
    },
    {
        question: "3. What does the 'flex-direction' property control in a flex container?",
        options: [
            "The spacing between flex items",
            "The direction of flex items",
            "The alignment of flex items",
            "The size of flex items"
        ],
        answer: "The direction of flex items"
    },
    {
        question: "4. Which direction is the 'main axis' in a flex container when 'flex-direction' is set to 'row'?",
        options: ["Vertical", "Horizontal", "Diagonal", "Not defined"],
        answer: "Horizontal"
    },
    {
        question: "5. When 'flex-direction' is set to 'column', which axis is the 'main axis'?",
        options: ["Horizontal", "Vertical", "Diagonal", "Z-axis"],
        answer: "Vertical"
    },
    {
        question: "6. In a flex container, which axis is referred to as the 'cross axis'?",
        options: ["Perpendicular to the main axis", "The main axis itself", "Diagonal axis", "Z-axis"],
        answer: "Perpendicular to the main axis"
    },
    {
        question: "7. What is the default value of 'flex-direction' in a flex container?",
        options: ["row", "column", "row-reverse", "column-reverse"],
        answer: "row"
    },
    {
        question: "8. Which of the following values for 'justify-content' aligns items at the start of the main axis?",
        options: ["center", "flex-start", "flex-end", "space-between"],
        answer: "flex-start"
    },
    {
        question: "9. If you set 'flex-direction: column-reverse', how will the items be aligned?",
        options: [
            "From top to bottom",
            "From bottom to top",
            "Horizontally from left to right",
            "Vertically from top to bottom but reversed"
        ],
        answer: "From bottom to top"
    },
    {
        question: "10. What will happen if you set 'justify-content: space-between' in a flex container?",
        options: [
            "Items will be aligned at the start and end of the container",
            "Items will be centered with equal space between them",
            "Items will be aligned at the start of the container with equal space",
            "Items will be aligned at the center of the container"
        ],
        answer: "Items will be aligned at the start and end of the container"
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
