const username = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES =5;
console.log(highScores);

console.log(highScores);
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", ()=> {
    console.log(username.value);
    saveScoreButton.disabled= !username.value;


})

saveHighScore = (e) =>{
    console.log("clicked save");
    e.preventDefault();

const score = {
    score: Math.floor(Math.random()* 100),
//score: mostRecentScore,
name: username.value
};

highScores.push(score);
highScores.sort((a,b) => {
    return b.score - a.score;
})
highScores.splice(5);
console.log(highScores);

localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign("/")
}