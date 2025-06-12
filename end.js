const username = document.getElementById('username');
const saveScorebtn = document.getElementById('saveScorebtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const Max_High_Scores = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup",() =>{
    saveScorebtn.disabled = !username.value;
    
});


saveHighscore = e => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score : Math.floor(Math.random() * 100),
        name: username.value
    };
    highScore.push(score);
    highScore.sort((a,b) =>  b.score - a.score)
    highScore.splice(5);

    localStorage.setItem('highScore',JSON.stringify(highScore));

    window.location.assign("/");
   
};

