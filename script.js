// let boxes = document.querySelectorAll(".box");
// let resetBtn = document.querySelector("#reset-btn");
// let newbtn  = document.querySelector("#newbtn");
// let msgcontainer = document.querySelector(".msgcontainer");
// let msg = document.querySelector("#msg")
// let turnO = true;
// let count;
// const winPattern = [
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,5,8],
//     [2,4,6],
//     [3,4,5],
//     [6,7,8],
// ];
// const reset = ()=>{
//     turnO = true;
//     count = 0;
//     enableBoxes();
//     msgcontainer.classList.add("hide");
// }

// boxes.forEach((box)=>{
//     box.addEventListener("click",()=>{
//         if(turnO){
//             box.innerText = "O";
//             box.style.color = "red"
            
//             turnO = false;
//         }else{
//             box.innerText = "X"
//             turnO = true;
//              box.style.color = "green"
//         }
//        box.disabled = true;
//        count++;
//        let iswinner = checkWinner();
//        if(count === 9 && !iswinner){
//         gameDraw();
//        }
//     });
// });
// const gameDraw = ()=>{
//     msg.innerText = `Game was a Draw!`;
//     msgcontainer.classList.remove("hide");
//     disableBoxes();
// }
// const disableBoxes = ()=>{
//     for(box of boxes){
//         box.disabled = true;
//     }
// }
// const enableBoxes = ()=>{
//     for(box of boxes){
//         box.disabled = false;
//         box.innerText = "";
//     }
// }
//  const showWinner = ( (Winner) =>{
//     msg.style.fontSize = "30px";
//     msg.innerText = `Congratilations🏆, Winner is ${Winner}`;
//     msgcontainer.classList.remove("hide");
//     disableBoxes();
//  });

// const checkWinner = ()=>{
//     for(let pattern of winPattern){
//         // console.log(pattern[0],pattern[1],pattern[2]);
//         // console.log(boxes[pattern[0]].innerText,
//         //             boxes[pattern[1]].innerHTML,
//         //           boxes[pattern[2]].innerText);

//             let pos1 = boxes[pattern[0]].innerText;
//             let pos2 = boxes[pattern[1]].innerText;
//             let pos3 = boxes[pattern[2]].innerText;
//         if(pos1 != "" && pos2 !="" && pos3 !=""){
//             if(pos1 === pos2 && pos2 === pos3 && pos3 === pos1){
//                 showWinner(pos1);
//                return true;
//             }
//         }
//   }
// };
// newbtn.addEventListener("click",reset);
// resetBtn.addEventListener("click",reset);


const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const clearBtn = document.querySelector("#clear-scores");
const newbtn = document.querySelector("#newbtn");
const overlay = document.querySelector("#overlay");
const msg = document.querySelector("#msg");
const trophy = document.querySelector("#trophy");
const status = document.querySelector("#status");
const who = document.querySelector("#who");
const scoreOEl = document.querySelector("#scoreO");
const scoreXEl = document.querySelector("#scoreX");
const scoreDEl = document.querySelector("#scoreD");

let turnO = true;
let count = 0;
let over = false;
let scores = {O:0,X:0,D:0};

const winPattern = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],
    [2,5,8],[2,4,6],[3,4,5],[6,7,8]
];

const updateTurn = () => {
    if(turnO){status.classList.remove("x");who.innerText="Player O";}
    else{status.classList.add("x");who.innerText="Player X";}
};

const reset = () => {
    turnO = true;
    count = 0;
    over = false;
    boxes.forEach(b=>{
        b.disabled=false;
        b.innerText="";
        b.classList.remove("O","X","win","mark");
    });
    overlay.classList.remove("show");
    updateTurn();
};

const disableBoxes = () => boxes.forEach(b=>b.disabled=true);

const showWinner = (winner,pattern) => {
    over = true;
    scores[winner]++;
    renderScores();
    pattern.forEach(i=>boxes[i].classList.add("win"));
    trophy.innerText="🏆";
    msg.innerText=`Player ${winner} wins!`;
    setTimeout(()=>{overlay.classList.add("show");launchConfetti();},650);
    disableBoxes();
};

const gameDraw = () => {
    over = true;
    scores.D++;
    renderScores();
    trophy.innerText="🤝";
    msg.innerText="It's a Draw!";
    overlay.classList.add("show");
    disableBoxes();
};

const renderScores = () => {
    scoreOEl.innerText=scores.O;
    scoreXEl.innerText=scores.X;
    scoreDEl.innerText=scores.D;
};

const checkWinner = () => {
    for(let pattern of winPattern){
        const [a,b,c]=pattern;
        const p1=boxes[a].innerText,p2=boxes[b].innerText,p3=boxes[c].innerText;
        if(p1!=="" && p1===p2 && p2===p3){
            showWinner(p1,pattern);
            return true;
        }
    }
    return false;
};

boxes.forEach(box=>{
    box.addEventListener("click",()=>{
        if(over || box.innerText!=="") return;
        const mark = turnO ? "O" : "X";
        box.innerText = mark;
        box.classList.add(mark,"mark");
        box.disabled = true;
        turnO = !turnO;
        count++;
        updateTurn();
        const win = checkWinner();
        if(count===9 && !win) gameDraw();
    });
});

const launchConfetti = () => {
    const colors=["#ff6b35","#ffd166","#2ec4b6","#ff5b7f","#eafffb"];
    for(let i=0;i<80;i++){
        const c=document.createElement("div");
        c.className="confetti";
        c.style.left=Math.random()*100+"vw";
        c.style.background=colors[Math.floor(Math.random()*colors.length)];
        c.style.borderRadius=Math.random()>.5?"50%":"2px";
        const dur=2+Math.random()*2;
        c.style.transition=`transform ${dur}s linear, opacity ${dur}s linear`;
        document.body.appendChild(c);
        requestAnimationFrame(()=>{
            c.style.transform=`translateY(105vh) rotate(${Math.random()*720}deg)`;
            c.style.opacity="0";
        });
        setTimeout(()=>c.remove(),dur*1000);
    }
};

newbtn.addEventListener("click",reset);
resetBtn.addEventListener("click",reset);
clearBtn.addEventListener("click",()=>{scores={O:0,X:0,D:0};renderScores();});

updateTurn();