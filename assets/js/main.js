'use strict';

let titleTop = document.querySelector('header span');
let office = document.querySelector('.title');
let description = document.querySelector('.description');
let infosBottom = document.querySelector('.wid-2');
let sidebar = document.querySelector('.sidebar');
let fields = document.querySelector('.fields');
let currentStage = 0;
let numbers = '';
let whiteVote = false;
let votos = [];

const start = () => {
    let etapa = etapas[currentStage];

    let fieldsHtml = '';
    numbers = '';
    whiteVote = false;

    for(let i = 0; i < etapa.numeros; i++) {
        if(i === 0) {
            fieldsHtml += '<span class="num blink"></span>';
        }else {
            fieldsHtml += '<span class="num"></span>';
        }
    }

    titleTop.style.display = 'none';
    office.innerHTML = etapa.titulo;
    description.innerHTML = '';
    infosBottom.style.display = 'none';
    sidebar.innerHTML = '';
    fields.innerHTML = `Numero: ${fieldsHtml}`;
};

const updateScreen = () => {
    let etapa = etapas[currentStage];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numbers) {
            return true;
        }else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];
        titleTop.style.display = 'block';
        description.innerHTML = `
        <span>Nome: ${candidato.nome}</span>
        <span>Partido: ${candidato.partido}</span>`;
        infosBottom.style.display = 'block';

        let fotosCandidatos = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosCandidatos += `
                <div class="card vice">
                    <img class="img-fluid card-img-top small" src="assets/images/${candidato.fotos[i].url}" alt="son goku">
                    <div class="card-body">
                        <h5 class="card-title mb-0">${candidato.fotos[i].legenda}</h5>
                    </div>
                </div>`;
            }else {
                fotosCandidatos += `
                <div class="card">
                    <img class="img-fluid card-img-top" src="assets/images/${candidato.fotos[i].url}" alt="son goku">
                    <div class="card-body">
                        <h5 class="card-title mb-0">${candidato.fotos[i].legenda}</h5>
                    </div>
                </div>`;
            }
        }
        sidebar.innerHTML = fotosCandidatos;
    }else {
        titleTop.style.display = 'block';
        infosBottom.style.display = 'block';
        description.innerHTML = '<div class="nulo blink">VOTO NULO</div>';
    }
};

const clicked = (num) => {
    let eleClicked = document.querySelector('.num.blink');
    if(eleClicked !== null) {
        eleClicked.innerHTML = num;
        numbers = `${numbers}${num}`;
        document.querySelector('.tecla').play();

        eleClicked.classList.remove('blink');
        if(eleClicked.nextElementSibling !== null) {
            eleClicked.nextElementSibling.classList.add('blink');
        }else {
            updateScreen();
        }
    }
};

const white = () => {
    numbers = '';
    whiteVote = true;
    titleTop.style.display = 'block';
    infosBottom.style.display = 'block';
    fields.innerHTML = '';
    description.innerHTML = '<div class="nulo blink">VOTO EM BRANCO</div>';
    sidebar.innerHTML = '';
};

const right = () => {
    start();
};

const confirm = () => {
    let etapa = etapas[currentStage];
    let confirmVote = false;

    if(whiteVote === true) {
        confirmVote = true;
        votos.push({
            etapa: etapas[currentStage].titulo,
            voto: 'branco'
        });
    }else if(numbers.length === etapa.numeros) {
        confirmVote = true;
        votos.push({
            etapa: etapas[currentStage].titulo,
            voto: numbers
        });
    }

    if(confirmVote) {
        currentStage++;
        let endSound = document.querySelector('.end');

        if(etapas[currentStage] !== undefined) {
            start();
            endSound.play();
        }else {
            document.querySelector('.screen').innerHTML = '<div class="end blink">FIM</div>';
            endSound.pause();
            endSound.currentTime = 0;
            setTimeout(() => {
                endSound.play();
            }, 0);
            console.log(votos);
        }
    }
};
start();