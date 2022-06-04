let count = 0;
let animationCount = true;
let text_span = document.getElementsByClassName('text_2')[0];
let textList = ["유튜버","작가","BJ","개발자","블로거","틱톡커","디자이너"]

function changeAnimation() {
    if(count === 0) {
        text_span.style.animation = "change_text_1 .5s";
        count = count + 1;
    } else if (count === 1) {
        count = count + 1;
    } else if (count === 2) {
        text_span.innerText =textList[Math.floor(Math.random() * textList.length)]
        text_span.style.visibility = "visible";
        text_span.style.animation = "change_text_2 .5s";
        count = 0;
    }
}

text_span.addEventListener('animationend', () => {
    if(animationCount) {
        text_span.style.visibility = "hidden";
    }
    animationCount = !animationCount
  });

let interval = setInterval(changeAnimation, 800)