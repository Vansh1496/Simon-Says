let startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click",function(){
    document.getElementById("startPopup").style.display="none";
    
});


let gameSeq=[];
let userSeq=[];
let highScore = [];
let max = 0;

let btns = ["red" , "yellow" , "blue" , "purple"]
let start = false;
let level = 0 ; 

let description = document.querySelector("h2");
let h3 = document.querySelector("h3");
let tempLevel = document.querySelector(".level")
let startbtn = document.querySelector("#startBtn")

    startbtn.addEventListener("click" , function(){
        if(start == false){
            console.log("game started")
            start = true;

            setTimeout(()=>{
                levelUp()
            },500)
        }
    });


function levelUp(){
    console.log("levelup")
    userSeq = [];
    level+=1;
    description.innerText = "Simon Says follow the sequence";
    tempLevel.innerText = `${level}`

    let randIdx= Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor)
    console.log(gameSeq)
    gameFlash(randBtn);
}


function gameFlash(btn){
    console.log("gameflash")
    btn.classList.add("flash")
    setTimeout(function () {
        btn.classList.remove("flash")
    } , 200)
}

let allBtns = document.querySelectorAll(".pad")
for (btn of allBtns){
    btn.addEventListener("click" , btnPress)
}

function btnPress(){
    console.log("btnpress")
    let btn = this;
    userFlash(btn)

    userColor = btn.getAttribute("id")
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
    
}


function userFlash(btn){
    console.log("userflash")
    btn.classList.add("userFlash")
    setTimeout(function () {
        btn.classList.remove("userFlash")
    } , 200)
}


function checkAns(idx){
    console.log("check ans")
    console.log(userSeq,gameSeq)

    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout( levelUp , 1000)
        }
    } else{
        description.innerHTML = `Game Over!  your score is ${level} press start button to start again`
        document.querySelector(".simon-board").style.backgroundColor = "red"
        setTimeout(function(){
            document.querySelector(".simon-board").style.backgroundColor = "black"
        } , 250)
        highScore.push(level)
        for(score of highScore){
            if(max < score){
                max = score;
            } else{
                max = max
            }
        }
        h3.innerText = `Highest Score = ${max}`
        showGameOver();
    }
} 

function reset(){
    console.log("reset")
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.getElementById("gameOverPopup").style.display = "none";
    setTimeout(() => {
        levelUp();
    } , 1000)
}

function showGameOver(){
    console.log("game over")
    document.getElementById("gameOverPopup").style.display="flex";
    document.getElementById("finalScore").innerText="Your Score : "+level;
}
let btnrestrat = document.querySelector(".restart")
btnrestrat.addEventListener("click" , reset);


