const quizQuestions = [
    {
        question: "1. What does 'display: flex' do in CSS?",
        options: [
            "Creates a grid layout",
            "Makes the container a flex container",
            "Applies inline styles",
            "Creates a fixed layout"
        ],
        answer: "Makes the container a flex container"
    },
    {
        question: "2. Which property aligns flex items along the main axis?",
        options: [
            "align-items",
            "justify-content",
            "flex-wrap",
            "align-content"
        ],
        answer: "justify-content"
    },
    {
        question: "3. Which property changes the direction of flex items?",
        options: [
            "flex-direction",
            "flex-align",
            "justify-items",
            "order"
        ],
        answer: "flex-direction"
    },
    {
        question: "4. What does 'align-items: center' do in a flex container?",
        options: [
            "Aligns items to the top",
            "Aligns items to the bottom",
            "Aligns items along the cross axis center",
            "Aligns items horizontally"
        ],
        answer: "Aligns items along the cross axis center"
    },
    {
        question: "5. What is Bootstrap primarily used for?",
        options: [
            "Image compression",
            "Database design",
            "Creating responsive web pages quickly",
            "Audio editing"
        ],
        answer: "Creating responsive web pages quickly"
    },
    {
        question: "6. How do you include Bootstrap in an HTML file?",
        options: [
            "Using a Python import",
            "Linking to a CDN in the head tag",
            "Using the `<import>` tag",
            "Including a JavaScript file"
        ],
        answer: "Linking to a CDN in the head tag"
    },
    {
        question: "7. What is the class used in Bootstrap for a button?",
        options: [
            "btn-style",
            "button",
            "btn",
            "bootstrap-button"
        ],
        answer: "btn"
    },
    {
        question: "8. Which class is used to make a Bootstrap button primary?",
        options: [
            "btn-blue",
            "btn-primary",
            "button-primary",
            "btn-main"
        ],
        answer: "btn-primary"
    },
    {
        question: "9. How can you include Bootstrap Icons in a project?",
        options: [
            "By linking to bootstrapicons.com",
            "By importing from Font Awesome",
            "By adding the Bootstrap Icons CDN link",
            "They come automatically with Bootstrap"
        ],
        answer: "By adding the Bootstrap Icons CDN link"
    },
    {
        question: "10. Which class is used to show a heart icon using Bootstrap Icons?",
        options: [
            "bi bi-heart",
            "bootstrap-heart",
            "icon-heart",
            "bs-icon-heart"
        ],
        answer: "bi bi-heart"
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
