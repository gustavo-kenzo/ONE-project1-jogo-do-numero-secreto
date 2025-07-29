let listaSorteados = [];
exibirMesagemInicial();
const min = 1;
const max = 10;
let numeroSecreto = gerarNumeroAleatorio(min, max);
let tentativas = 1;
let numerosJaSorteados = [numeroSecreto];

function exibirMesagemInicial() {
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número entre 1 e 10');
}

function gerarNumeroAleatorio(min, max) {
    let numeroAleatorio = parseInt(Math.random() * max - min + 1) + min;
    if (listaSorteados.length == max) {
        listaSorteados = [];
    }
    if (listaSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio(min, max);
    } else {
        listaSorteados.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

function exibirNaTela(tag, descricao) {
    let campo = document.querySelector(tag);
    campo.innerHTML = descricao;
    responsiveVoice.speak(descricao,'Brazilian Portuguese Female', {rate:1.2});
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function habilitarBotao(tag, isActive) {
    document.getElementById(tag).disabled = !isActive;
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirNaTela('h1', 'Parabéns!');
        let mensagem = `Você descobriu o número secreto em ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}!`;
        exibirNaTela('p', mensagem);
        habilitarBotao('reiniciar', true);
        habilitarBotao('chutar', false);
    } else {
        let dica = chute > numeroSecreto ? `O número secreto é menor` : `O número secreto é maior`;
        exibirNaTela('p', dica);
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(min, max);
    tentativas = 1;
    exibirMesagemInicial();
    limparCampo();
    habilitarBotao('reiniciar', false);
    habilitarBotao('chutar', true);
}