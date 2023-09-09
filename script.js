// Input data - questions with options and correct answer index.
const QuestionData = [
  {
    questionText: 'Commonly used data types DO NOT include:',
    options: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
    answerIndex: 2,
  },
  {
    questionText: 'Arrays in JavaScript can be used to store ______.',
    options: [
      '1. numbers and strings',
      '2. other arrays',
      '3. booleans',
      '4. all of the above',
    ],
    answerIndex: 3,
  },
  {
    questionText:
      'String values must be enclosed within _____ when being assigned to variables.',
    options: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'],
    answerIndex: 2,
  },
  {
    questionText:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    options: [
      '1. JavaScript',
      '2. terminal/bash',
      '3. for loops',
      '4. console.log',
    ],
    answerIndex: 3,
  },
  {
    questionText:
      'Which of the following is a statement that can be used to terminate a loop, switch or label statement?',
    options: ['1. break', '2. stop', '3. halt', '4. exit'],
    answerIndex: 0,
  },
];

/* Global variables/constants */
const MAX_QUESTIONS = QuestionData.length;
let currentQuestion = 1;
let finalScore = 0;
let isTimerRunning = false;
let timerCountDown;

/* DOM elements */
const contentEl = document.getElementById('content');
const startQuizBtn = document.getElementById('startQuiz');
const timerEl = document.getElementById('timer');
const toast = document.getElementById('toast');

/* Functions */
function showToast(message, duration, bgColor) {
  toast.textContent = message;
  toast.style.backgroundColor = bgColor;
  toast.classList.add('show');

  const toastTimerId = setTimeout(() => {
    toast.classList.remove('show');
    console.log('Toast timed out');
    clearTimeout(toastTimerId);
  }, duration);
}

function stopTimer() {
  isTimerRunning = false;
  clearInterval(timerCountDown);
  displayScore();
}

function startTimer() {
  timerCountDown = setInterval(() => {
    isTimerRunning = true;
    let currSeconds = +timerEl.textContent;
    currSeconds = currSeconds - 1;
    if (currSeconds < 0) {
      stopTimer();
      return;
    }
    timerEl.textContent = currSeconds;
  }, 1000);
}

function displayScore() {
  clearContent();

  const title = document.createElement('h2');
  title.textContent = 'All done!';
  contentEl.appendChild(title);

  const finalScoreEl = document.createElement('p');
  finalScoreEl.textContent = `Your final score is ${finalScore}`;
  contentEl.appendChild(finalScoreEl);

  const divEl = document.createElement('div');
  const labelEl = document.createElement('label');
  labelEl.textContent = 'Enter initials: ';
  const inputEl = document.createElement('input');
  const btnEl = document.createElement('button');
  btnEl.textContent = 'Submit';
  btnEl.classList.add('btn', 'submit');
  divEl.appendChild(labelEl);
  divEl.appendChild(inputEl);
  divEl.appendChild(btnEl);
  contentEl.appendChild(divEl);
}

function displayCorrectOrIncorrect(isCorrectAns) {
  if (isCorrectAns) {
    showToast('Correct!', 1100, 'rgb(23, 161, 23)');
    finalScore += 10;
  } else {
    showToast('Incorrect!', 1100, 'rgb(248, 24, 24)');
    let currSeconds = +timerEl.textContent;
    currSeconds = currSeconds - 10;
    timerEl.textContent = currSeconds;
  }

  currentQuestion++;
  const timeoutId = setTimeout(() => {
    if (currentQuestion > QuestionData.length) {
      stopTimer();
      displayScore();
    } else {
      startAndContinueQuiz();
    }
    clearTimeout(timeoutId);
  }, 1000);
}

function checkAnswer(i) {
  const questionBeingAnswered = QuestionData[currentQuestion - 1];
  const correctAnsIndex = questionBeingAnswered.answerIndex;
  const isCorrectAns = correctAnsIndex === i;
  displayCorrectOrIncorrect(isCorrectAns);
}

function renderNextQuestion() {
  const questionToDisplay = QuestionData[currentQuestion - 1];

  const question = document.createElement('h2');
  question.textContent = questionToDisplay.questionText;
  contentEl.appendChild(question);

  questionToDisplay.options.forEach((option, i) => {
    const optionBtn = document.createElement('button');
    optionBtn.textContent = option;
    optionBtn.classList.add('btn', 'options');
    optionBtn.addEventListener('click', function (e) {
      checkAnswer(i);
    });
    contentEl.appendChild(optionBtn);
  });
}

function clearContent() {
  contentEl.innerHTML = '';
}

function startAndContinueQuiz() {
  !isTimerRunning && startTimer();
  clearContent();
  renderNextQuestion();
}

// Event Listeners
startQuizBtn.addEventListener('click', startAndContinueQuiz);

// Set timer at 50 seconds
timerEl.textContent = 50;
