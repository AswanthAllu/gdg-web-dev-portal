const quizQuestions = [
    {
        question: "1. What does “VS Code” stand for?",
        options: ["Visual Source Code", "Visual Studio Code", "Version Source Code", "Verified Studio Code"],
        answer: "Visual Studio Code"
    },
    {
        question: "2. Which company developed VS Code?",
        options: ["Apple", "Google", "Microsoft", "Adobe"],
        answer: "Microsoft"
    },
    {
        question: "3. What is the primary use of VS Code?",
        options: ["Video editing", "Writing and debugging code", "Photo editing", "Data analysis"],
        answer: "Writing and debugging code"
    },
    {
        question: "4. VS Code is mainly used for which type of development?",
        options: ["Graphic design", "Web and software development", "Game development only", "Mobile-only development"],
        answer: "Web and software development"
    },
    {
        question: "5. Which language is NOT natively supported by VS Code?",
        options: ["JavaScript", "Python", "C++", "Klingon"],
        answer: "Klingon"
    },
    {
        question: "6. What is the purpose of extensions in VS Code?",
        options: ["Add visual effects", "Add new functionalities and support for more languages", "Slow down the editor", "Change your hardware"],
        answer: "Add new functionalities and support for more languages"
    },
    {
        question: "7. Which extension helps with auto-completion and AI-based code suggestions?",
        options: ["Prettier", "GitLens", "Copilot", "Code Runner"],
        answer: "Copilot"
    },
    {
        question: "8. What is the shortcut to open the terminal in VS Code?",
        options: ["Ctrl + Shift + T", "Ctrl + ` (backtick)", "Ctrl + Alt + N", "Ctrl + Q"],
        answer: "Ctrl + ` (backtick)"
    },
    {
        question: "9. Which extension is useful for formatting code consistently?",
        options: ["Bracket Pair Colorizer", "Prettier", "Live Server", "IntelliSense"],
        answer: "Prettier"
    },
    {
        question: "10. Why do developers prefer VS Code over other editors?",
        options: ["It's lightweight and open source", "It has built-in Git and extension support", "It supports multiple programming languages", "All of the above"],
        answer: "All of the above"
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
        document.getElementById(label-${selectedValue}).classList.add("correct");
    } else {
        document.getElementById(label-${selectedValue}).classList.add("wrong");
        document.getElementById(label-${correctAnswer}).classList.add("correct"); // Highlight correct answer
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
        timeElement.innerText = ${minutes}:${seconds < 10 ? "0" : ""}${seconds};
        if (timer-- <= 0) {
            clearInterval(interval);
            localStorage.setItem("quizScore", score);
            window.location.href = "result.html"; 
        }
    }, 1000);
}

startTimer();