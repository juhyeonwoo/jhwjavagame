var rock = document.getElementById("rocks");
var sissor = document.getElementById("sissors");
var paper = document.getElementById("papers");
var result = document.getElementById("result");
var what = document.getElementById("what");

var randompush = Math.floor(Math.random() * 3);

rock.addEventListener("click", function () {
    if (randompush == 0) {
        result.innerText = "Draw";
        what.src = "images/rock.png";
    } else if (randompush == 1) {
        result.innerText = "Win";
        what.src = "images/sissor.png";
    } else {
        result.innerText = "Lose";
        what.src = "images/paper.png";
    }
});

sissor.addEventListener("click", function () {
    if (randompush == 0) {
        result.innerText = "Lose";
        what.src = "images/rock.png";
    } else if (randompush == 1) {
        result.innerText = "Draw";
        what.src = "images/sissor.png";
    } else {
        result.innerText = "Win";
        what.src = "images/paper.png";
    }
});

paper.addEventListener("click", function () {
    if (randompush == 0) {
        result.innerText = "Win";
        what.src = "images/rock.png";
    } else if (randompush == 1) {
        result.innerText = "Lose";
        what.src = "images/sissor.png";
    } else {
        result.innerText = "Draw";
        what.src = "images/paper.png";
    }
});
