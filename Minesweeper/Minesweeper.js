const selDiff = document.getElementsByClassName('selectDifficulty');
const mineIn = document.getElementById('mineIn');
const mineRemain = document.getElementById('mineRemain');
let difficulty = 0;

const xMove = [0, 0, 1, -1, 1, -1, -1, 1];
const yMove = [1, -1, 0, 0, 1, -1, 1, -1];
let mineMap;
let wholeMine;
let mappingMine;

function init() {
  for (let i = 0; i < selDiff.length; i++) {
    selDiff[i].addEventListener("click", clickColor);
  }

  document.addEventListener('click', function(event) {
    if (event.target && event.target.className === "mineCheck mineCover") {
      const x = event.target.getAttribute("xLoc");
      const y = event.target.getAttribute("yLoc");
      find(x, y, 0);
    }
  });

  document.getElementById("mineIn").addEventListener(
    "contextmenu",
    (event) => event.preventDefault()
  );

  document.getElementById("mineIn").addEventListener(
    "mousedown",
    (event) => {
      if (event.button == 2) {
        const x = event.target.getAttribute("xLoc");
        const y = event.target.getAttribute("yLoc");
        mapping(x, y);
      }
    }
  );
}

function clickColor(event) {
  if (difficulty !== this.getAttribute("diff")) {
    if (confirm("해당 난이도로 게임을 구성하시겠습니까?")) {
      for (let i = 0; i < selDiff.length; i++) {
        const remover = selDiff[i].getAttribute("diff");
        selDiff[i].classList.remove(remover);
      }
      difficulty = this.getAttribute("diff");
      event.target.classList.add(difficulty);
      make(difficulty);
    }
  }
}

function make(choise) {
  let xFrame;
  let yFrame;
  switch (choise) {
    case "easy":
      xFrame = 10;
      yFrame = 10;
      wholeMine = 41;
      break;
    case "normal":
      xFrame = 15;
      yFrame = 15;
      wholeMine = 90;
      break;
    case "hard":
      xFrame = 22;
      yFrame = 22;
      wholeMine = 195;
      break;
  }
  mappingMine = wholeMine;
  mineMap = Array.mineMaker(xFrame, yFrame, wholeMine);
  frameMaker(xFrame, yFrame, mineMap);
}

function frameMaker(xFrame, yFrame) {
  const mineFrame = document.createElement("table");
  mineFrame.className = "mineFrame";

  for (let i = 0; i < xFrame; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < yFrame; j++) {
      const td = document.createElement("td");
      td.setAttribute("xLoc", i);
      td.setAttribute("yLoc", j);
      td.id = Number(i * xFrame) + Number(j);
      td.setAttribute("mineVal", mineMap[i][j]);
      td.className = "mineCheck";
      td.classList.add("mineCover");
      tr.append(td);
    }
    mineFrame.append(tr);
  }
  mineIn.innerText = "";
  mineIn.append(mineFrame);
  mineRemain.innerText = mappingMine;
}

Array.mineMaker = function(m, n, boomb) {
  const mineMap = [];
  for (let i = 0; i < m; i++) {
    const a = [];
    for (let j = 0; j < n; j++) {
      a[j] = 0;
    }
    mineMap[i] = a;
  }

  while (boomb > 0) {
    const x = Math.floor(Math.random() * m);
    const y = Math.floor(Math.random() * n);
    if (mineMap[x][y] !== -1) {
      boomb--;
      mineMap[x][y] = -1;
      for (let i = 0; i < 8; i++) {
        const xTo = x + xMove[i];
        const yTo = y + yMove[i];
        if (xTo < 0 || xTo >= m || yTo < 0 || yTo >= n) continue;
        if (mineMap[xTo][yTo] === -1) continue;
        mineMap[xTo][yTo]++;
      }
    }
  }
  return mineMap;
};

function find(x, y, dfs) {
  const xFrame = mineMap.length;
  const yFrame = mineMap[0].length;
  const nowLoc = document.getElementById(Number(x * xFrame) + Number(y));
  const nowCondition = nowLoc.textContent;

  if (nowCondition === "💣") {
  } else if (mineMap[x][y] >= 0) {
    if (mineMap[x][y] != 0) nowLoc.innerText = mineMap[x][y];
    mineMap[x][y] = -2;
    nowLoc.classList.remove("mineCover");
    for (let i = 0; i < 4; i++) {
      const xTo = Number(x) + Number(xMove[i]);
      const yTo = Number(y) + Number(yMove[i]);
      if (xTo < 0 || xTo >= xFrame || yTo < 0 || yTo >= yFrame) continue;
      if (mineMap[xTo][yTo] === -1) continue;
      find(xTo, yTo, 1);
    }
  } else if (mineMap[x][y] === -1) {
    alert("GAME OVER");
    mineIn.innerText = "";
    for (let i = 0; i < selDiff.length; i++) {
      const remover = selDiff[i].getAttribute("diff");
      selDiff[i].classList.remove(remover);
    }
    difficulty = 0;
    mineRemain.innerText = "";
  }
}

function mapping(x, y) {
  const xFrame = mineMap.length;
  const nowLoc = document.getElementById(Number(x * xFrame) + Number(y));
  const nowCondition = nowLoc.textContent;
  if (nowCondition === "💣") {
    if (mineMap[x][y] === -1) wholeMine++;
    mappingMine++;
    nowLoc.innerText = "❓";
  } else if (nowCondition === "❓") {
    nowLoc.innerText = "";
  } else if (nowCondition === "") {
    if (mineMap[x][y] === -1) wholeMine--;
    mappingMine--;
    nowLoc.innerText = "💣";
  }
  mineRemain.innerText = mappingMine;
  if (wholeMine === 0 && mappingMine === 0) {
    if (confirm("Clear")) {
      mineIn.innerText = "";
      for (let i = 0; i < selDiff.length; i++) {
        const remover = selDiff[i].getAttribute("diff");
        selDiff[i].classList.remove(remover);
      }
      difficulty = 0;
      mineRemain.innerText = "";
    }
  }
}

init();
