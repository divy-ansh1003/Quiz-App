const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarfull = document.getElementById("progressBarfull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter =0;
let availableQuestions = [];

let questions =[];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
    .then(res =>{
    return res.json();
    })
    .then(loadedQuestions =>{
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(
                formattedQuestion.answer -1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice,index) => {
                formattedQuestion["choice" + (index +1)] = choice;
            });
            return formattedQuestion
        });
        
        startGame();
    })
    .catch (err =>{
        console.error(err);

    });

    

const Correct_Bonus = 10;
const Max_Questions = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
    
};

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= Max_Questions){
        localStorage.setItem("mostRecentScore",score);


        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question : ${questionCounter}/${Max_Questions}`;

    progressBarfull.style.width = `${(questionCounter/Max_Questions) * 100}%`;

    const questionIndex=Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice'+ number]
    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers= true;
};

choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToapply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToapply=='correct'){
            incrementScore(Correct_Bonus);
        }

        selectedChoice.parentElement.classList.add(classToapply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToapply);
            getNewQuestion();

        },1000);


    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
   
