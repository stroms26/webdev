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

  const answer =
    activeQuestion.querySelector('input[name="answer"]:checked')?.value ||
    activeQuestion.querySelector('input[name="answer"]')?.value;
  if (answer) {
    if (
      answer.toLowerCase() ===
      questions[currentQuestionIndex].correctAnswer.toLowerCase()
    ) {
      score++;
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  } else {
    alert("Please select or enter an answer.");
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
