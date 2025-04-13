const questions = [
    
    { 
        question: "1.What is Web Development?", 
        options: ["Creating mobile applications", "Building websites and web applications", "Designing only the frontend of a website", "Writing only JavaScript code"], 
        answer: "Building websites and web applications" 
    },
    { 
        question: "2.Which of the following is a frontend technology?", 
        options: ["Python", "HTML", "Node.js", "MongoDB"], 
        answer: "HTML" 
    },
    { 
        question: "3.What does the backend of a website handle?", 
        options: ["User interactions on the webpage", "Styling and layout of a website", "Database management and server-side logic", "Animations and visual effects"], 
        answer: "Database management and server-side logic" 
    },
    { 
        question: "4.Which database is commonly used for backend development?", 
        options: ["React", "MongoDB", "CSS", "Bootstrap"], 
        answer: "MongoDB" 
    },
    { 
        question: "5.What is Full Stack Development?", 
        options: ["Working only with frontend technologies", "Managing cloud services", "Developing both frontend and backend of a website", "Writing only CSS and JavaScript"], 
        answer: "Developing both frontend and backend of a website" 
    },
    { 
        question: "6.Which of the following is a backend technology?", 
        options: ["CSS", "JavaScript", "Django", "HTML"], 
        answer: "Django" 
    },
    { 
        question: "7.What is the main difference between a static and a dynamic website?", 
        options: ["Static websites use JavaScript, while dynamic websites use HTML", "Static websites require databases, dynamic websites do not", "Static websites display fixed content, while dynamic websites generate content based on user interactions", "There is no difference"], 
        answer: "Static websites display fixed content, while dynamic websites generate content based on user interactions" 
    },
    { 
        question: "8.Which of these is NOT a benefit of learning web development?", 
        options: ["High demand in the job market", "Ability to create and innovate", "Learning how to use Microsoft Word", "Freelancing and startup opportunities"], 
        answer: "Learning how to use Microsoft Word" 
    },
    { 
        question: "9.Which of the following technologies is used to style a webpage?", 
        options: ["HTML", "CSS", "JavaScript", "Node.js"], 
        answer: "CSS" 
    },
    { 
        question: "10.What should you do to become a good web developer?", 
        options: ["Only watch tutorials and never practice", "Start coding, build projects, and stay updated with new technologies", "Avoid asking questions or participating in discussions", "Focus only on frontend development and ignore backend technologies"], 
        answer: "Start coding, build projects, and stay updated with new technologies" 
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 600; // 10 minutes

function loadQuestion() {
    let q = questions[currentQuestionIndex];
    document.getElementById("question-container").innerText = q.question;
    document.getElementById("options-container").innerHTML = q.options.map(opt => 
        `<input type="radio" name="answer" id="${opt}" value="${opt}" onclick="checkAnswer(this)">
         <label for="${opt}" id="label-${opt}">${opt}</label>`
    ).join("");
}

function checkAnswer(selectedOption) {
    let correctAnswer = questions[currentQuestionIndex].answer;
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

    if (selected.value === questions[currentQuestionIndex].answer) score++;

    if (++currentQuestionIndex < questions.length) {
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
