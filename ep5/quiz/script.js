const quizQuestions = [
    {
        question: "1. What is the purpose of the <img> tag in HTML?",
        options: ["Add video", "Add image", "Add style", "Add audio"],
        answer: "Add image"
    },
    {
        question: "2. Which attribute is mandatory in the <img> tag to show an image?",
        options: ["href", "src", "alt", "path"],
        answer: "src"
    },
    {
        question: "3. Why is <img> considered a void element?",
        options: [
            "It requires a closing tag",
            "It is deprecated",
            "It doesn't have a closing tag",
            "It supports only text"
        ],
        answer: "It doesn't have a closing tag"
    },
    {
        question: "4. Which pseudo-class allows styles on hover in CSS?",
        options: [":hover", ":focus", ":active", ":checked"],
        answer: ":hover"
    },
    {
        question: "5. Which CSS function is used to scale elements larger or smaller?",
        options: ["resize()", "zoom()", "transform()", "scale()"],
        answer: "scale()"
    },
    {
        question: "6. What does text-align: center do?",
        options: [
            "Aligns text to the left",
            "Aligns text to the right",
            "Centers the text",
            "Justifies the text"
        ],
        answer: "Centers the text"
    },
    {
        question: "7. Which property controls the size of text in CSS?",
        options: ["text-size", "font-style", "font-size", "text-align"],
        answer: "font-size"
    },
    {
        question: "8. What does border-radius do in CSS?",
        options: [
            "Changes border color",
            "Makes border visible",
            "Rounds the corners",
            "Adds padding"
        ],
        answer: "Rounds the corners"
    },
    {
        question: "9. What does border: solid 1px white; do?",
        options: [
            "Applies a white dotted border",
            "Adds solid white border of 1px thickness",
            "Removes the border",
            "Makes text bold"
        ],
        answer: "Adds solid white border of 1px thickness"
    },
    {
        question: "10. What is the purpose of the <span> tag?",
        options: [
            "Break content into blocks",
            "Apply inline styles or group inline text",
            "Display lists",
            "Add images"
        ],
        answer: "Apply inline styles or group inline text"
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
