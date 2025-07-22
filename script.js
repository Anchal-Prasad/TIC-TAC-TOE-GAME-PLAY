let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn");

let turnO = true;
let count = 0;

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const restGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnText.innerText = "Turn: O";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      turnText.innerText = "Turn: X";
      box.style.color = "#ff4fcf";
      box.style.textShadow = "0 0 10px #ff4fcf, 0 0 20px #ff4fcf";
    } else {
      box.innerText = "X";
      turnText.innerText = "Turn: O";
      box.style.color = "#00f0ff";
      box.style.textShadow = "0 0 10px #00f0ff, 0 0 20px #00f0ff";
    }

    turnO = !turnO;
    box.disabled = true;
    count++;

    if (checkWinner()) return;
    if (count === 9) gameDraw();
  });
});

const gameDraw = () => {
  msg.innerText = "GAME DRAW";
  msgContainer.classList.remove("hide");
  disableBoxes();
  turnText.innerText = "";
};

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "";
    box.style.textShadow = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `CONGRATULATIONS, WINNER IS ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  turnText.innerText = "";
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", restGame);
resetBtn.addEventListener("click", restGame);
