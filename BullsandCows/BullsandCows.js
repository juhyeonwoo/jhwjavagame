const form = document.getElementById("game-form");

const input = document.createElement("input");
input.maxLength = 4;
input.minLength = 4;
form.appendChild(input);

const btn = document.createElement("button");
btn.textContent = "입력";
btn.style.color = "seagreen";
form.appendChild(btn);

const result = document.getElementById("result");

let answerArray;
let nGuesses = 0;

function makeAnswer() {
  const numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  answerArray = [];
  for (let i = 0; i < 4; i++) {
    const picked = numberList.splice(Math.floor(Math.random() * (10 - i)), 1)[0];
    answerArray.push(picked);
  }
}

function showFinalResult() {
  result.textContent = "홈런!";
}

function failResult() {
  result.textContent = `횟수 초과! 정답은 ${answerArray.join("")}입니다.`;
}

function showHint() {
  const hintNumbers = answerArray.slice(0, 4);
  hintNumbers.sort();
  const hint = `힌트: ${hintNumbers.join(", ")} 이 숫자 중에 네 개가 정답입니다.`;
  alert(hint);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const answer = input.value;

  function checkInput() {
    for (let i = 0; i <= 3; i++) {
      if (answer[i] === answer[i + 1] || answer[i] === answer[i + 2] || answer[i] === answer[i + 3]) {
        return true;
      }
    }
    return false;
  }

  if (checkInput()) {
    alert("중복된 숫자입니다!");
    return;
  }

  if (answer === answerArray.join("")) {
    showFinalResult();
    input.value = "";
    input.focus();
    makeAnswer();
    nGuesses = 0;
  } else {
    let nBalls = 0;
    let nStrikes = 0;
    nGuesses++;

    if (nGuesses >= 10) {
      failResult();
      input.value = "";
      input.focus();
      makeAnswer();
      nGuesses = 0;
    } else {
      for (let i = 0; i < 4; i++) {
        if (Number(answer[i]) === answerArray[i]) {
          nStrikes++;
        } else if (answerArray.indexOf(Number(answer[i])) > -1) {
          nBalls++;
        }
      }
      result.textContent = `${nStrikes} 스트라이크, ${nBalls} 볼. ${10 - nGuesses} 회 남았습니다!`;
      input.value = "";
      input.focus();
    }
  }
});

function resetGame() {
  makeAnswer();
  nGuesses = 0;
  result.textContent = "";
  input.value = "";
  input.focus();
}

makeAnswer();
