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
    //videjs
    type: "truefalse",
    question: "Tagam <input> nav nepieciešams aizvērošs tags",
    options: ["Patiesi", "Aplami"],
    correctAnswer: "Patiesi",
  },
  {
    //gruts
    type: "multiplechoice",
    question:
      "Javascript objekti funkcijām tiek padoti kā objektu kopijas vai atsauces?",
    options: ["atsauces", "kopijas"],
    correctAnswer: "atsauces",
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
  {
    //videjs
    type: "multiplechoice",
    question: "Kurš no šiem tagiem ir deprecated?",
    options: ["<p>", "<img>", "<style>", "<frame>"],
    correctAnswer: "<frame>",
  },
  {
    //gruts
    type: "input",
    question:
      "Kādu CSS rekvizītu izmanto, lai noteiktu to elementu secību, kas pārklājās viens ar otru?",
    correctAnswer: "z-index",
  },
  {
    //videjs
    type: "multiplechoice",
    question: "Vai Javascript ir interpretēta vai kompilēta valoda?",
    options: ["kompilēta", "interpretēta"],
    correctAnswer: "interpretēta",
  },
  {
    //viegls
    type: "multiplechoice",
    question: "Kuru tagu izmanto sakārtota saraksta viedošanai?",
    options: ["<ul>", "<li>", "<ol>", "<dl>", "<td>"],
    correctAnswer: "<ol>",
  },

  {
    type: "multipleanswers",
    question: "Which of the following are JavaScript data types?",
    options: ["String", "Number", "Boolean", "Character", "Undefined"],
    correctAnswer: ["String", "Number", "Boolean", "Undefined"],
  },

  {
    question: "What is the capital of France?",
    image: "jaut9.png",
    type: "multiplechoice",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },

  {
    question: "Jautajums?",
    image: "jaut10.png",
    type: "multiplechoice",
    options: ["atb1", "atb2", "atb2", "atb2"],
    correctAnswer: "Paris",
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

  //Change current question box color
  if (currentQuestionIndex < 16) {
    const currentBox = document.getElementById(currentQuestionIndex + 1);
    currentBox.style.border = "2px solid darkslategray";
    currentBox.style.background = "darkslategray";
    currentBox.style.color = "white";
  }
  if (currentQuestionIndex == 15) {
    document.getElementById("next-btn").innerHTML = "Tālāk";
  }

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

    case "multipleanswers":
      questionData.options.forEach((option) => {
        const label = document.createElement("label");
        label.textContent = option;
        const input = document.createElement("input");
        input.type = "checkbox";
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

  if (currentQuestionIndex < 16) {
    const currentBox = document.getElementById(currentQuestionIndex + 1);
    currentBox.style.border = "2px solid dimgray";
  }

  let answers = [];
  const selectedRadioButton = activeQuestion.querySelector(
    'input[type="radio"][name="answer"]:checked'
  );
  const selectedCheckboxes = activeQuestion.querySelectorAll(
    'input[type="checkbox"][name="answer"]:checked'
  );
  const selectedInputText = activeQuestion.querySelector(
    'input[type="text"][name="answer"]'
  );

  if (selectedRadioButton) {
    answers.push(selectedRadioButton.value);
  } else if (selectedInputText) {
    answers.push(selectedInputText.value.trim());
  } else if (selectedCheckboxes.length > 0) {
    selectedCheckboxes.forEach((checkbox) => {
      answers.push(checkbox.value);
    });
  }

  if (answers.length > 0) {
    const correctAnswers = questions[currentQuestionIndex].correctAnswer;
    if (
      Array.isArray(correctAnswers) &&
      answers.every((answer) => correctAnswers.includes(answer)) &&
      answers.length === correctAnswers.length
    ) {
      score++;
      displayFeedback("Pareizi", "green");
    } else if (
      typeof correctAnswers === "string" &&
      correctAnswers.toLowerCase() === answers[0].toLowerCase()
    ) {
      score++;

      const currentBox = document.getElementById(currentQuestionIndex + 1);
      currentBox.style.background = "seagreen";

      var atbild = document.getElementById("atbilde");
      atbild.innerHTML = "Pareizi";
      atbild.style.color = "green";
      atbild.style.opacity = 0;

      fadeIn(atbild);

      setTimeout(function () {
        fadeOut(atbild);
      }, 1500);
    } else {
      // JA NEPAREIZI
      var atbild = document.getElementById("atbilde");
      atbild.innerHTML = "Nepareizi";
      atbild.style.color = "red";
      atbild.style.opacity = 0;
      fadeIn(atbild);

      setTimeout(function () {
        fadeOut(atbild);
      }, 1500);
    }
  } else {
    displayFeedback("Jūs neatibldējāt uz jautājumu!", "grey");
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    displayScore();
  }
}

function displayFeedback(message, color) {
  var atbild = document.getElementById("atbilde");
  atbild.innerHTML = message;
  atbild.style.color = color;
  atbild.style.opacity = 0;
  fadeIn(atbild);

  setTimeout(function () {
    fadeOut(atbild);
  }, 1500);
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
