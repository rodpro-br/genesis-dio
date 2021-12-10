let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

let colorClickEvent = (e) => {
    if (e.target === green) {
        click(0);
    }
    else if (e.target === red) {
        click(1);
    }
    else if (e.target === yellow) {
        click(2);
    }
    else {
        click(3);
    }
    
}

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];

    green.removeEventListener('click', colorClickEvent);
    red.removeEventListener('click', colorClickEvent);
    yellow.removeEventListener('click', colorClickEvent);
    blue.removeEventListener('click', colorClickEvent);

    for(let i in order) {
        let elementColor = getColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }

    setTimeout(() => {
        green.addEventListener('click', colorClickEvent);
        red.addEventListener('click', colorClickEvent);
        yellow.addEventListener('click', colorClickEvent);
        blue.addEventListener('click', colorClickEvent);
    }, 1000);
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 1000;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 500);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder.push(color);
    getColorElement(color).classList.add('selected');

    setTimeout(() => {
        getColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//funcao que retorna a cor
let getColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

// //eventos de clique para as cores
// green.onclick = () => click(0);
// red.onclick = () => click(1);
// yellow.onclick = () => click(2);
// blue.onclick = () => click(3);


//inicio do jogo
playGame();