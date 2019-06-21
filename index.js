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
        answers: ['Bears, Snakes', 'Cubs, Soxs', 'Shirts, Soxs', 'Hawks, Sparrows'],
        correctAnswer: 'Cubs, Soxs'
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
function generateQuestion () {
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
function beginQuiz () {
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').remove();
    $('.quizForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

//This function will increase the question number as the user clicks through the quiz
function changeQuestionNumber () {
  questionNumber ++;
  $('.questionNumber').text(questionNumber);
}

// This function will display the question, that we generated above, in the HTML.
function renderQuestion () {
  $('.quizForm').html(generateQuestion());
}
//This function will let the user know that they got the question right
function userAnswerCorrect () {
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
function userAnswerWrong () {
  let correctAnswer = `${quizQuestions[questionNumber].correctAnswer}`;
  $('.quizForm').html(
      `<div class="feedback">
            <p>
                <b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span>
            </p>
            <button type=button class="nextButton">Next</button>
        </div>`);
}
//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${quizQuestions[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      answerCorrect();
    } else {
      selected.parent().addClass('wrong');
      answerWrong();
    }
  });
}

function answerCorrect() {
  userAnswerCorrect();
  updateScore();
}
//This function updates the score when the user gets the question correct
function updateScore () {
  score++;
  $('.score').text(score);
}
function answerWrong() {
  userAnswerWrong();
}

//when quiz is over this is the html for the page
function renderResults () {
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
            <p>You've got some learning ahead of you, maybe you should stick to the "Mag Mile"./p>
            <button class="restartButton">Restart Quiz</button>
        </div>`);
  }
}

//This funciton allows the user to move to the next funciton after seeing the result of the previous question
function displayNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

//This function will reload the page and start the quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}
// This funtion is meant to show the results of the quiz after all the questions have been answered
function endQuiz() {
  if (questionNumber === quizQuestions.length - 1){
     $('main').on('click', '.nextButton', function (event) {
      renderResults();
    });
  }
}

//This function runs all of the other functions needed to run the quiz
function runQuiz () {
  beginQuiz();
  renderQuestion();
  userSelectAnswer();
  displayNextQuestion();
  endQuiz();
}

$(runQuiz);
