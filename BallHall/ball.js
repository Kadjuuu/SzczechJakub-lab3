let ball= document.querySelector("#hole");                    
let container = document.getElementsByClassName("container")[0];
let holes = [];
let gameStart=false;
let score = 0;
let speedX = 0, speedY = 0;
let posX = 20, posY = 20;
window.addEventListener('deviceorientation', zmianaPolozenia)
let highScoreList = document.createElement('ul');               // Dodanie Highscore
highScoreList.innerText="Highscores:"
highScoreList.className="highScoreList";
container.appendChild(highScoreList);
let highscores = [];
refreshHighScore();

function start(){                                              
    gameStart=true;
    spawnHoles();                 
    moveHole();                      
    console.log("game Started!")
    document.getElementById("start").hidden=true;
    counter = document.createElement('span');               // Dodanie licznika punktów   
    counter.classList.add("counter");
    counter.innerHTML="Score: "+score;
    container.appendChild(counter);
}
function restart(){                                 
    gameStart=true;
    for(i=container.childElementCount;i>0;i--){     // usunięcie starych Hole'i
        if(container.childNodes[i].nodeName=="DIV"){
            if(container.childNodes[i].id!=="hole"){
                container.removeChild(container.childNodes[i])
            }
        }
    }
    score = 0;
    counter.innerHTML="Score: "+score;          // reset punktów
    holes=[];
    posX = 20, posY = 20;
    spawnHoles();                   
    moveHole();                  
    document.getElementById("restart").hidden=true;
}

function zmianaPolozenia(e){            // Poruszanie Hole'a
    console.log(e);
    speedX=e.gamma/50
    speedY=e.beta/50
}
function moveHole(){                 
    
    

    if(posX+speedX<window.innerWidth && posX+speedX>0){  // ograniczenia Hole'a
        posX+=speedX;
        ball.style.left=posX+'px';        
    }
    if(posY+speedY<window.innerHeight && posY+speedY>0){
        posY+=speedY;
        ball.style.top=posY+'px';        
    }
                                                    //Sprawdzanie kolizji z Hole'ami
    for(i=0;i<holes.length;i++) {
        if(posY<Math.floor(holes[i].style.top.slice(0,-2))+50&&posY>holes[i].style.top.slice(0,-2)){
            if(posX>holes[i].style.left.slice(0,-2)&&posX<Math.floor(holes[i].style.left.slice(0,-2))+50){
                if(holes[i].classList.contains("goodHole")){
                    holes[i].classList.remove("goodHole");
                    holes.forEach(e=>{if(e.classList.contains("tempHole")){
                        e.classList.remove("tempHole");
                        e.classList.add("hole");
                    }})
                    holes[i].classList.add("tempHole");
                    score++
                    counter.innerHTML="Score: "+score;
                    randomGoodHole(i);
                }
                else if(holes[i].classList.contains("hole")){     // end 
                gameStart=false;
                let yourScore = window.prompt("Uzyskałeś "+score+" punktów! Podaj swój nick.");
                highscores.push([score,yourScore]);
                refreshHighScore()
                document.getElementById("restart").hidden=false;
            }
        }
        console.log("omg"+i);
    }
    };
    if(gameStart==true){
        window.requestAnimationFrame(moveHole)
    }
}
function spawnHoles(){                                  //Dodanie Hole'i do planszy
    for(i=2;i<(window.innerWidth/100);i++){
        let hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left=100*i+Math.random()*70-100+'px';
        hole.style.top=Math.random()*(window.innerHeight-100)/2+'px';
        holes.push(hole);
        container.appendChild(hole);
    }

    checkHoles();
    randomGoodHole(1);
}
function checkHoles(){                                      //Zapobiega nakładaniu się Hole'ow
    for(i=0;i<holes.length-1;i++){                          
        for(j=i;j<holes.length;j++){
            if(holes[j].style.left.slice(0,0)>holes[i].style.left.slice(0,0)+75
            &&holes[j].style.top.slice(0,0)>holes[i].style.top.slice(0,0)+75){
                holes[j].style.top=holes[j].style.top.slice(0,-2)+50+'px';
                holes[j].style.left=holes[j].style.left.slice(0,-2)+50+'px';
            }
        }
    }
}
function randomGoodHole(i){                                 // Dodanie goodHole
    let goodHole = Math.floor(Math.random()*holes.length);
    if(goodHole ==i&&i<holes.length){i++;}                  // uniknięcie pojawienia się goodHolew tym samym miejscu
    else{i--;}
    holes[goodHole].classList.remove("hole");
    holes[goodHole].classList.add("goodHole")

}                                                           // odświeżenie listy highscore
function refreshHighScore(){
    highscores.sort(sortScores);
    highscores.length=9;
    while (highScoreList.childNodes[1]) {
        highScoreList.removeChild(highScoreList.childNodes[1]);
    }
    highscores.forEach(e=>{                                 // Dodanie na nowo highscorow
        let scoreList = document.createElement('li');
        scoreList.innerText=e[0]+" "+e[1];
        highScoreList.appendChild(scoreList);
        
    })
}
function sortScores(a, b) {                                 // Sortowanie highscorow.
    if (a[0] == b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]);
    }
}