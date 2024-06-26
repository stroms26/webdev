const questions = [
  {
    //viegls
    type: "yesno",
    question: "Selektors # identificē HTML elementu pēc klases",
    options: ["Patiesi", "Aplami"],
    correctAnswer: "Aplami",
  },

  {
    type: "multipleanswers",
    question: "Kā tiek apzīmēti komentāri Javascript valodā?",
    options: ["#", "//", "--", "/* */", "**"],
    correctAnswer: ["//", "/* */"],
  },
  {
    question: "Kuru skaitli izvadīs sekojošs koda fragments?",
    image: "jaut10.png",
    type: "input",
    correctAnswer: "126",
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
    type: "multipleanswers",
    question:
      "Kuri no minētiem ir CSS īpašības elementa pozīcijas noteikšanai?",
    options: ["Fixed", "Nonstatic", "Static", "Absolute", "Flex"],
    correctAnswer: ["Fixed", "Static", "Absolute"],
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
    question: "Ar kādu CSS rekvizītu veido atstarpi starp apmali un saturu?",
    options: ["margin", "border-spacing", "space", "padding"],
    correctAnswer: "padding",
  },
  {
    question: "Kādā krāsā būs teksts “Mans virsraksts”?",
    image: "jaut9.png",
    type: "multiplechoice",
    options: ["Zils", "Zaļš", "Melns"],
    correctAnswer: "Zaļš",
  },
  {
    //videjs
    type: "truefalse",
    question: "Tagam <input> nav nepieciešams aizvērošs tags",
    options: ["Patiesi", "Aplami"],
    correctAnswer: "Patiesi",
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
    type: "multipleanswers",
    question: "Kādi no minētiem datu tipiem ir Javascript valodā?",
    options: [
      "String",
      "Double",
      "Number",
      "Boolean",
      "Character",
      "Undefined",
    ],
    correctAnswer: ["String", "Number", "Boolean", "Undefined"],
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
];

let currentQuestionIndex = 0;
let score = 0;
let timer; // Timer variable
const timeLimit = 10 * 60; // 10 minutes in seconds
let timeRemaining = timeLimit;

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
        const questionContainer = document.createElement("questionContainer");
        questionContainer.className = "flex_input";
        input.type = "radio";
        input.name = "answer";
        input.value = option;
        label.htmlFor = input;
        questionContainer.appendChild(input);
        questionContainer.appendChild(label);
        questionElement.appendChild(questionContainer);
      });
      break;

    case "multiplechoice":
      questionData.options.forEach((option) => {
        const label = document.createElement("label");
        label.textContent = option;
        const input = document.createElement("input");
        const questionContainer = document.createElement("questionContainer");
        questionContainer.className = "flex_input";
        input.type = "radio";
        input.name = "answer";
        input.value = option;
        label.htmlFor = input;
        questionContainer.appendChild(input);
        questionContainer.appendChild(label);
        questionElement.appendChild(questionContainer);
      });
      break;

    case "multipleanswers":
      questionData.options.forEach((option) => {
        const label = document.createElement("label");
        label.textContent = option;
        const input = document.createElement("input");
        const questionContainer = document.createElement("questionContainer");
        questionContainer.className = "flex_input";
        input.type = "checkbox";
        input.name = "answer";
        input.value = option;
        label.htmlFor = input;
        questionContainer.appendChild(input);
        questionContainer.appendChild(label);
        questionElement.appendChild(questionContainer);
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
  } else if (selectedInputText && selectedInputText.value.trim() !== "") {
    answers.push(selectedInputText.value.trim());
  } else if (selectedCheckboxes.length > 0) {
    selectedCheckboxes.forEach((checkbox) => {
      answers.push(checkbox.value);
    });
  }

  if (answers.length > 0) {
    const correctAnswers = questions[currentQuestionIndex].correctAnswer;
    let isCorrect = false;
    if (Array.isArray(correctAnswers)) {
      isCorrect =
        answers.every((answer) => correctAnswers.includes(answer)) &&
        answers.length === correctAnswers.length;
    } else {
      isCorrect =
        typeof correctAnswers === "string" &&
        correctAnswers.toLowerCase() === answers[0].toLowerCase();
    }

    const currentBox = document.getElementById(currentQuestionIndex + 1);
    if (isCorrect) {
      score++;
      currentBox.style.background = "seagreen";
      displayFeedback("Pareizi", "green");
    } else {
      currentBox.style.background = "red";
      displayFeedback("Nepareizi", "red");
    }
  } else {
    displayFeedback("Jūs neatbildējāt uz jautājumu!", "grey");
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
  container.innerHTML = `<p>Jūs ieguvāt ${score} no ${questions.length} punktiem.</p>`;
  const tryAgainButton = document.createElement("button");
  tryAgainButton.textContent = "Mēģināt vēlreiz";
  tryAgainButton.onclick = resetQuiz;
  container.appendChild(tryAgainButton);
  document.getElementById("next-btn").style.display = "none";
  clearInterval(timer); // Stop the timer
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeRemaining = timeLimit;
  document.getElementById("next-btn").style.display = "block";
  const progressBoxes = document.querySelectorAll(".progress_box");
  progressBoxes.forEach((box) => {
    box.style.border = "2px solid dimgray";
    box.style.background = "white";
    box.style.color = "black";
  });
  renderQuestion();
  startTimer(); // Restart the timer
}

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timer = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    timeRemaining--;
    if (timeRemaining < 0) {
      clearInterval(timer);
      displayScore(); // End the quiz when time runs out
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  startTimer(); // Start the timer when the page loads
});

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
