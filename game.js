const question = document.getElementById("question") 
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const progressText = document.getElementById("progressText");
const loader=document.getElementById("loader");
const game=document.getElementById("game");



console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score =0;
let questionCounter =0;
let availableQuestions = [];


let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")

.then (res =>{
    return res.json();

})

.then(loadedQuestions=>{
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion=>{
        const formattedQuestion ={
            question: loadedQuestion.question
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*3) +1;
        answerChoices.splice(
            formattedQuestion.answer -1,
            0, 
            loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index)=>{
formattedQuestion["choice" + (index+1)] =choice;
        });
        return formattedQuestion;
    });
    
    startGame();
   // questions = loadedQuestions;

   // startGame();
})

.catch(err=>{
    console.error(err);
})

// let questions = [
//     {
//         question: "What is the largest city in the world?",
//         choice1: "Tokyo",
//         choice2: "Syria",
//         choice3: "London",
//         choice4: "Toronto",
//         answer: 1
//     },

//     {
//         question: "Which country has the most natural lakes?",
//     choice1: "India",
//     choice2: "Canada",
//     choice3: "USA",
//     choice4: "Australia",
//     answer: 2
//     },

//     {question: "What is Earths largest continent?",
//     choice1: "Antartica",
//     choice2: "Africa",
//     choice3: "Europe",
//     choice4: "Asia",
//     answer: 4
//     },

//     {question: "What is the oldest city in the world? ",
//     choice1: "Damascus",
//     choice2: "Palestine",
//     choice3: "Athens",
//     choice4: "Jericho",
//     answer: 1
//     },
//     {question: "What is the largest country in South America? ",
//     choice1: "Columbia",
//     choice2: "Ecuador",
//     choice3: "Brazil",
//     choice4: "Peru",
//     answer: 3
// },
// {
//     question: "How many countries are in Africa?",
//     choice1: "39",
//     choice2: "42",
//     choice3: "63",
//     choice4: "54",
//     answer: 4
// }
// ];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS =5;

startGame =() => {
    questionCounter =0;
    score = 0;
    availableQuestions = [...questions ];
console.log(availableQuestions);
getNewQuestion();
game.classList.remove("hidden");
    loader.classList.add("hidden");

};

getNewQuestion = () =>{

    if(availableQuestions.length === 0 || questionCounter>= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("https://safiyasharif1.github.io/quiz/end.html");

    }
    questionCounter ++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //updating progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        const number = choice.dataset["number"];
        choice.innerText= currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice  => {
choice.addEventListener("click", e => {
   if(!acceptingAnswers)return;
   acceptingAnswers = false;

   const selectedChoice = e.target;
   const selectedAnswer = selectedChoice.dataset["number"];

   const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect" ;
    selectedChoice.parentElement.classList.add(classToApply);

    if(classToApply==='correct'){
        incrementScore(CORRECT_BONUS);

    }

    setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToApply); 
        getNewQuestion();
    }, 1000);
    
    
    console.log(classToApply);
   console.log(selectedAnswer== currentQuestion.answer);
  
});
});

incrementScore = num=> {
    score +=num;
    scoreText.innerText = score;
};

//startGame(); 