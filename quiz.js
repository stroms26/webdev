const questions = [
  {
    type: "yesno",
    question: "Is HTML a programming language?",
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
  {
    //viegls
    type: "yesno",
    question: "Selektors # identificē HTML elementu pēc klases",
    options: ["Patiesi", "Aplami"],
    correctAnswer: "Aplami",
  },
  {
    //viegls
    type: "multiplechoice",
    question: "HTML dokumentam var pievienot ārēju CSS ar kuru no šiem tagiem?",
    options: [
      "<link rel='stylesheet' href='mystyle.css'>\n",
      "<a rel='stylesheet' href='mystyle.css'>\n",
      "<iframe rel='stylesheet' href='mystyle.css'\n>",
    ],
    correctAnswer: "<link rel='stylesheet' href='mystyle.css'>\n",
  },
  {
    //gruts
    type: "input",
    question:
      "Uzrakstiet, kā ar Javascript palīdzību izgūt elementa ar id “myId” vērtību",
    correctAnswer: "document.getElementById(“myId”).value",
  },
  {
    //viegls
    type: "truefalse",
    question: "Lai mainītu teksta fontu tiek izmantota font-family CSS īpasība",
    options: ["Patiesi", "Aplami"],
    correctAnswer: "Patiesi",
  },
  {
    //viegls
    type: "multiplechoice",
    question: "Ar kādu CSS rekvizītu veido atstarpi starp apmali un saturu?",
    options: ["margin", "border-spacing", "space", "padding"],
    correctAnswer: "padding",
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

  // Add question text
  const questionText = document.createElement("p");
  questionText.textContent = questionData.question;
  questionElement.appendChild(questionText);

  // Add image if exists
  if (questionData.image) {
    const questionImage = document.createElement("img");
    questionImage.src = questionData.image;
    questionImage.alt = "Question Image";
    questionElement.appendChild(questionImage);
  }

  // Add answer options based on question type
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
