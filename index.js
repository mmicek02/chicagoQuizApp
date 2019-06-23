const quizQuestions = [
  {
      question: 'When was the city founded?',
      answers: [1833, 1847, 1818, 1866],
      correctAnswer: 1833
  },
  {
      question: 'How many stars does the city flag have?',
      answers: [13, 5, 4, 50],
      correctAnswer: 4
  },
  {
      question: 'Chicago is next to which Great Lake?',
      answers: ['Lake Michigan', 'Lake Erie', 'Lake Superior', 'The Atlantic'],
      correctAnswer: 'Lake Michigan'
  },
  {
      question: 'In what year was the Great Chicago Fire?',
      answers: [1845, 1900, 1871, 1834],
      correctAnswer: 1871
  },
  {
      question: 'Before Chicago was a city, what was the land used for?',
      answers: ['Farmland', 'It was a trading post called Fort Dearborn', 'A crossfit gym', 'The original home of Big Foot'],
      correctAnswer: 'It was a trading post called Fort Dearborn'
  },
  {
      question: 'What are the two baseball teams from Chicago?',
      answers: ['Bears, Snakes', 'Cubs, Sox', 'Shirts, Socks', 'Hawks, Sparrows'],
      correctAnswer: 'Cubs, Sox'
  },
  {
      question: 'Chicago held two worlds fairs, when were they?',
      answers: ['1888, 1910', '1893, 1933', '1915, 1935', '1890, 1922'],
      correctAnswer: '1893, 1933'
  },
  {
      question: 'What infamous dessert snack was invented here?',
      answers: ['The Twinkie', 'The Banana Split', 'The Ice Cream Sunday', 'Baked Alaska'],
      correctAnswer: 'The Twinkie'
  },
  {
      question: 'What are the official toppings of a Chicago hot dog?',
      answers: [
          'Caramelized onions, relish, hot sauce, one spoon full of mild salsa, and one cup of queso dip.',
          'Ketchup, mustard, relish and chopped white onions.',
          'Plain - no toppings.',
          'Yellow mustard, chopped white onions, bright green sweet pickle relish, a dill pickle spear, tomato slices or wedges, pickled sport peppers and a dash of celery salt'
      ],
      correctAnswer: 'Yellow mustard, chopped white onions, bright green sweet pickle relish, a dill pickle spear, tomato slices or wedges, pickled sport peppers and a dash of celery salt'
  },
  {
      question: 'How many "L" lines are there in Chicago?',
      answers: [5, 2, 12, 8],
      correctAnswer: 8
  }
];



//Variable that keeps track on what question number the user is on
let questionNumber = 0;
//Variable that keeps track of how many questions the user has gotten right
let score = 0;

//This function will create the question the user has to answer
function generateQuestion() {
return `<div class="question-${questionNumber}">
  <h2>${quizQuestions[questionNumber].question}</h2>
  <form>
      <fieldset>
      <label class="answerOption">
          <input type="radio" value="${quizQuestions[questionNumber].answers[0]}" name="answer" required>
          <span>${quizQuestions[questionNumber].answers[0]}</span>
      </label>
      <label class="answerOption">
          <input type="radio" value="${quizQuestions[questionNumber].answers[1]}" name="answer" required>
          <span>${quizQuestions[questionNumber].answers[1]}</span>
      </label>
      <label class="answerOption">
          <input type="radio" value="${quizQuestions[questionNumber].answers[2]}" name="answer" required>
          <span>${quizQuestions[questionNumber].answers[2]}</span>
      </label>
      <label class="answerOption">
          <input type="radio" value="${quizQuestions[questionNumber].answers[3]}" name="answer" required>
          <span>${quizQuestions[questionNumber].answers[3]}</span>
      </label>
      <button type="submit" class="submitButton">Submit</button>
      </fieldset>
  </form>
  </div>`;
}


//This function will remove the "landing page", and then show the quiz format that we created above
function beginQuiz() {
$('.startQuiz').on('click', '.startButton', function (event) {
  console.log('Run beginQuiz');
  $('.startQuiz').remove();
      $('.quizForm').css('display', 'block');
      $('.questionNumber').text(questionNumber + 1);
      renderQuestion();
});
}
/*These next functions handle everything needed to display the question, answer options, and check the user chosen answer to the actual answer*/
//This function will let the user know that they got the question right
function userAnswerCorrect() {
console.log('Run userAnswerCorrect Function');
let correctAnswer = `${quizQuestions[questionNumber].correctAnswer}`;
$('.quizForm').html(
          `<div class="feedback">
              <p>
                    <b>You got it right!</b>
              </p>
            <button type=button class="nextButton">Next</button>
          </div>`);
}
//This function will display the correct answer and let the user know that they got the question wrong
function userAnswerWrong() {
console.log('Run userAnswerWrong Function');
let correctAnswer = `${quizQuestions[questionNumber].correctAnswer}`;
  $('.quizForm').html(
    `<div class="feedback">
    <p>
      <b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span>
    </p>
              <button type=button class="nextButton">Next</button>
    </div>`);
}

//This function will update the score by one
function updateScore () {
score++;
$('.score').text(score);
}
// This function will display the question, that we generated above, in the HTML.
function renderQuestion() {
$('.quizForm').html(generateQuestion());
}
function checkAnswer() {
console.log('Run checkAnswer Function');
let selected = $('input:checked');
let answer = selected.val();
let correctAnswer = `${quizQuestions[questionNumber].correctAnswer}`;
  if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      userAnswerCorrect();
      updateScore();
  } else {
      selected.parent().addClass('wrong');
      userAnswerWrong();
    }
}
//This function checks if what the user selected is the correct answer
function answerQuestion() {
//$('form').on('submit', function (event) {
  $('.quizForm').on('click', '.submitButton', function (event){
      checkAnswer();
});
}

/*These function will handle everything needed to load the next question*/
//when quiz is over this is the html for the page
function displayResults() {
if (score >= 7) {
  $('.quizForm').html(
    `<div class="results correctFeedback">
      <h3>You must have been born here!</h3>
      <p>You got ${score} / 10</p>
      <p>Let's go get some deep dish</p>
      <button class="restartButton">Restart Quiz</button>
    </div>`);
} else {
  $('.quizForm').html(
    `<div class="results correctFeedback">
      <h3>First time visiting?</h3>
      <p>You got ${score} / 10</p>
      <p>You've got some learning ahead of you, maybe you should stick to Navy Pier.</p>
      <button class="restartButton">Restart Quiz</button>
    </div>`);
}
}

//This function will increase the question number as the user clicks through the quiz
function changeQuestionNumber() {
questionNumber++;
console.log(questionNumber);
$('.questionNumber').text(questionNumber);
if (questionNumber === quizQuestions.length){
    displayResults();
}
}

function nextQuestion() {
$('.quizForm').on('click', '.nextButton', function (event) {
      changeQuestionNumber();
      renderQuestion();
});
}
/*This function will allow the user to take the quiz again */
function restartQuiz() { 
$('.quizForm').on('click', '.restartButton', function (event) {
    console.log('Run RestartQuiz Function');   
    location.reload();
  });
}

function runQuiz() {
beginQuiz();
answerQuestion();
nextQuestion();
restartQuiz();
}
$(runQuiz);