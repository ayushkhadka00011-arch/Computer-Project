const symbol= ["Image/bhanubhakta.webp", "Image/boudhanath.webp", "Image/chitwan.webp", "Image/kingbirendra.webp", "Image/kingprithbi.webp", "Image/lumbini.webp", "Image/pasanglhamusherpa.webp", "Image/rajeshhamal.webp"];
const board = document.getElementById("board");
const message = document.getElementById("message");
const scoreELS = {1:document.getElementById("score1"), 2:document.getElementById("score2")};
const playerELS = {1:document.getElementById("plr1"), 2:document.getElementById("plr2")};

let scores , current , firstCard , lock , matchedPairs;

function startGame()
{
    scores = { 1: 0, 2:0 } ;
    current = 1;
    firstCard = null;
    lock = false;
    matchedPairs = 0;
    board.innerHTML = "";
    updateUI();  
    message.textContent = "player 1's turn";

    const cards = [...symbol,...symbol].sort(()=>Math.random()- 0.5);
    cards.forEach(symbol => {
        const card = document.createElement("button");
        card.className = "card";
        card.dataset.symbol = symbol;
        card.addEventListener("click" , () => flip(card));
        board.appendChild(card);
    });

}

function updateUI()
{
    scoreELS[1].textContent = scores[1];
    scoreELS[2].textContent = scores[2];
    playerELS[1].classList.toggle("active", current === 1);
    playerELS[2].classList.toggle("active", current === 2);
}

function flip(card)
{
    if (lock || card === firstCard || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.innerHTML = `<img src="${card.dataset.symbol}" alt="Card">`;

    if (!firstCard)
    {
        firstCard = card;
        return;
    }

    if(firstCard.dataset.symbol === card.dataset.symbol)
    {
        firstCard.classList.add("matched");
        card.classList.add("matched");
        firstCard = null;
        scores[current]++;
        matchedPairs++;
        updateUI();
        message.textContent = `Match! Player ${current} goes  again`;
        if (matchedPairs === symbol.length) endGame();

    }
    else
    {
        lock = true;
        message.textContent = "NO match...";
        setTimeout(() =>{
            firstCard.classList.remove("flipped");
            card.classList.remove("flipped");
            firstCard.innerHTML = "";
            card.innerHTML = "";
            firstCard = null;
            lock=false;
            current = current === 1 ? 2 :1;
            updateUI();
            message.textContent = `Player ${current}'s turn`;


        },900);
    }

}

function endGame()
{
    if (scores[1]> scores[2]) message.textContent = "Player 1 wins";
    else if (scores[2] > scores[1]) message.textContent = "Player 2 wins";
    else message.textContent = "Its a draw!";

}

document.getElementById("restart").addEventListener("click" , startGame);
startGame();