
let gameSeq=[];
let userSeq=[];
let highScore = [];
let max = 0;

let btns = ["red" , "yellow" , "green" , "purple"]
let start = false;
let level = 0 ; 

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress" , function(){
    if(start == false){
        console.log("game started")
        start = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function () {
        btn.classList.remove("flash")
    } , 200)
}
function userFlash(btn){
    btn.classList.add("userFlash")
    setTimeout(function () {
        btn.classList.remove("userFlash")
    } , 200)
}

function levelUp(){
    userSeq = [];
    level+=1;
    h2.innerText = `level ${level} `;

    let randIdx= Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor)
    console.log(gameSeq)
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout( levelUp , 1000)
        }
    } else{
        h2.innerHTML = `Game Over! <b> your score is ${level} </b> <br> press any key to start`
        document.querySelector("body").style.backgroundColor = "red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white"
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
        reset();
    }
} 

function btnPress(){
    let btn = this;
    userFlash(btn)

    userColor = btn.getAttribute("id")
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
    
}

let allBtns = document.querySelectorAll(".btn")
for (btn of allBtns){
    btn.addEventListener("click" , btnPress)
}

function reset(){
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}