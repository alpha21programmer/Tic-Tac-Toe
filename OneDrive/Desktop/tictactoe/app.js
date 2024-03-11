let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let currentPlayer = "X";
let moves = 0;
const maxMoves = 9;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  currentPlayer = "X";
  moves = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  resetBoard();
};

const resetBoard = () => {
  boxes.forEach((box) => {
    box.textContent = "";
  });
};

const handleClick = (index) => {
  if (boxes[index].textContent === "") {
    boxes[index].textContent = currentPlayer;
    moves++;
    checkWinner();
    checkDraw();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].textContent;
    let pos2Val = boxes[pattern[1]].textContent;
    let pos3Val = boxes[pattern[2]].textContent;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

const checkDraw = () => {
  if (moves === maxMoves) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});