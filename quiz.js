const questions = [
  {
    type: "yesno",
    question: "Vai HTML ir programmēšanas valoda?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    type: "multiplechoice",
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correctAnswer: "<a>",
  },
  {
    type: "input",
    question: "Ko nozīmē CSS?",
    correctAnswer: "Cascading Style Sheets",
  },
  {
    type: "truefalse",
    question: "JavaScript is a client-side scripting language.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    type: "fillintheblank",
    question: "The HTML element used to insert a line break is <______>.",
    correctAnswer: "br",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function renderQuestion() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  const questionData = questions[currentQuestionIndex];
  const questionElement = document.createElement("div");
  questionElement.classList.add("question", "active");

  const questionText = document.createElement("p");
  questionText.textContent = questionData.question;
  questionElement.appendChild(questionText);

  switch (questionData.type) {
    case "yesno":
    case "truefalse":
      questionData.options.forEach((option) => {
        const label = document.createElement("label");
        label.textContent = option;
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option;
        label.appendChild(input);
        questionElement.appendChild(label);
      });
      break;

    case "multiplechoice":
      questionData.options.forEach((option) => {
        const label = document.createElement("label");
        label.textContent = option;
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option;
        label.appendChild(input);
        questionElement.appendChild(label);
      });
      break;

    case "input":
    case "fillintheblank":
      const input = document.createElement("input");
      input.type = "text";
      input.name = "answer";
      questionElement.appendChild(input);
      break;
  }

  container.appendChild(questionElement);
}

function nextQuestion() {
  const container = document.getElementById("quiz-container");
  const activeQuestion = container.querySelector(".question.active");
  if (!activeQuestion) return;

  const selectedRadioButton = activeQuestion.querySelector('input[type="radio"][name="answer"]:checked');
  const selectedInputText = activeQuestion.querySelector('input[type="text"][name="answer"]');

  let answer;

// RADIO PROBLEMA
if (selectedRadioButton) {
    answer = selectedRadioButton.value;
} else if (selectedInputText) { //VAI UZRAKSTITS
    answer = selectedInputText.value.trim();
}

if (answer !== undefined && answer !== "") {
    // JA PAREIZI
    if (
      answer.toLowerCase() === 
      questions[currentQuestionIndex].correctAnswer.toLowerCase()) {
        score++;
       
        var atbild = document.getElementById("atbilde");
        atbild.innerHTML = "Pareizi";
        atbild.style.color = "green";
        atbild.style.opacity = 0;

        fadeIn(atbild)
        
        setTimeout(function () {
            fadeOut(atbild)
        }, 1500); 
    } else {
        // JA NEPAREIZI
        var atbild = document.getElementById("atbilde");
        atbild.innerHTML = "Nepareizi";
        atbild.style.color = "red";
        atbild.style.opacity = 0;
        fadeIn(atbild)
        
        setTimeout(function () {
            fadeOut(atbild)
        }, 1500);
    }
} else {
    // JA NEATBILDEJA
        var atbild = document.getElementById("atbilde");
        atbild.innerHTML = "Jūs neatibldējāt uz jautājumu!";
        atbild.style.color = "grey";
        atbild.style.opacity = 0;

        fadeIn(atbild)
        setTimeout(function () {
            atbild.style.opacity = 1;
        }, 1500); 
    return; 
}


  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    displayScore();
  }
}

function displayScore() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `<p>You scored ${score} out of ${questions.length}.</p>`;
  document.getElementById("next-btn").style.display = "none";
}

document.addEventListener("DOMContentLoaded", renderQuestion);


function fadeIn(element) {
  var opacity = 0;
  var interval = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(interval);
    } else {
      element.style.opacity = opacity;
      opacity += 0.01; 
    }
    }, 10); 
}

function fadeOut(element) {
  var opacity = 1;
  var interval = setInterval(function () {
   if (opacity <= 0) {
    clearInterval(interval);
    element.innerHTML = ""; 
  } else {
    element.style.opacity = opacity;
    opacity -= 0.01; 
  }
   }, 10); 
}