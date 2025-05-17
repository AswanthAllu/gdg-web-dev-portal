const quizQuestions = [
    {
        question: "1. What does the `href` attribute in an anchor tag specify?",
        options: [
            "The font style",
            "The background color",
            "The URL the link points to",
            "The image source"
        ],
        answer: "The URL the link points to"
    },
    {
        question: "2. Which protocol in `href` is used to link to an email address?",
        options: [
            "mail:",
            "email:",
            "mailto:",
            "message:"
        ],
        answer: "mailto:"
    },
    {
        question: "3. What happens if you use an invalid `href` value?",
        options: [
            "The browser will crash",
            "It will redirect to the home page",
            "The link will not work properly",
            "It will show a pop-up"
        ],
        answer: "The link will not work properly"
    },
    {
        question: "4. How do you make a link open in a new tab?",
        options: [
            "target='_self'",
            "href='_new'",
            "target='_blank'",
            "link='_blank'"
        ],
        answer: "target='_blank'"
    },
    {
        question: "5. Which href value can be used to trigger a file download?",
        options: [
            "href='file.txt'",
            "href='file.pdf' download",
            "href='download://file'",
            "href='download=true'"
        ],
        answer: "href='file.pdf' download"
    },
    {
        question: "6. Which attribute defines the relationship between the current document and the linked one?",
        options: [
            "rel",
            "src",
            "target",
            "type"
        ],
        answer: "rel"
    },
    {
        question: "7. What’s the default behavior of an anchor tag when clicked with a valid href?",
        options: [
            "It opens a dropdown",
            "It navigates to the given link",
            "It submits a form",
            "It refreshes the page"
        ],
        answer: "It navigates to the given link"
    },
    {
        question: "8. Which href value is commonly used to link to the top of the page?",
        options: [
            "#",
            "/top",
            "#top",
            "top.html"
        ],
        answer: "#"
    },
    {
        question: "9. How can you link to a specific section within the same page?",
        options: [
            "Use `href='/section'`",
            "Use `href='#sectionID'`",
            "Use `src='#section'`",
            "Use `url='#section'`"
        ],
        answer: "Use `href='#sectionID'`"
    },
    {
        question: "10. Which protocol in `href` is used to link to a phone number?",
        options: [
            "callto:",
            "tel:",
            "phone:",
            "mobile:"
        ],
        answer: "tel:"
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
