// Capturando elementos. Variáveis globais.
let caixaDeTexto = document.getElementById('textoTel')
let numeroTeclado = document.querySelectorAll('input[type=button]');
let somTelefone = document.querySelectorAll('audio:not(#audioSecreto)');
let posicaoAtual = 0;

// Usar todos os áudios. Sem aleatoriedade.
function somDaTecla () {
    somTelefone[posicaoAtual].play();
    posicaoAtual++;
    if (posicaoAtual == somTelefone.length) {
        posicaoAtual = 0;
    };
};

// Apagar Números.
function apagarNumero () {
    let valorAtual = caixaDeTexto.value;
    caixaDeTexto.value = valorAtual.slice(0, -1);
    somDaTecla();
};

//Suporte para teclado físico.
document.addEventListener('keydown', function (e) {
    if (e.key >= '0' && e.key <= '9') {
        const tecla = document.querySelector(`input[type=button][value="${e.key}"]`);
        if (tecla) {
            colocarNumero(tecla);
        };
    };
});

// Inserir Números.
const teclaEsp1 = '*';
const teclaEsp2 = '#';

function colocarNumero (tecla) {
    if ((!isNaN (tecla.value) || tecla.value === teclaEsp1 || tecla.value === teclaEsp2)  &&  tecla.value.trim() !== '') { // Verificação de entrada de números.
        caixaDeTexto.value += tecla.value;
        somDaTecla();
        formatarNumero();
        verificarSegredo(tecla.value);
    };
};

// Funcionalidade.
numeroTeclado.forEach (tecla => {
    tecla.onclick = function () {
        if (this.id === 'apagarNumero') {
            apagarNumero();
        } else {
            colocarNumero(this);
        };
    };
});

// Limpar o Telefone.
function limparCampo () {
    caixaDeTexto.value = "";
    somDaTecla();
}
let botaoLimpar = document.getElementById('limparPH');
botaoLimpar.addEventListener('click', limparCampo);

// Formatação.
function formatarNumero () {
    let numero = caixaDeTexto.value.replace(/[^\d*#]/g, '');
    if (numero.length > 0) {
        numero = '(' + numero;
    };

    if (numero.length > 3) {
        numero = numero.slice(0, 3) + ')' + numero.slice(3);
    };

    if (numero.length > 9) {
        numero = numero.slice(0, 9) + '-' + numero.slice(9);
    };

    if (numero.length > 14) {
        numero = numero.slice(0, 14);
    }

    let posicaoCursor = caixaDeTexto.selectionStart;
    caixaDeTexto.value = numero;
    caixaDeTexto.setSelectionRange(posicaoCursor, posicaoCursor);
};

// ?
const segredo = document.getElementById('segredo');
const mensagemSecreta = document.getElementById('mensagem');

function mostrarMensagem() {
    mensagemSecreta.classList.add('mostrar');

    setTimeout(() => {
        mensagemSecreta.classList.remove('mostrar');
    }, 6000);
}

segredo.addEventListener('click', () => {
    if (!modoSegredo) {
        modoSegredo = true;
        sequenciaAtual = [];
        mostrarMensagem();
    }
    });

const codigoSecreto = ['3', '0', '8'];
let modoSegredo = false;
let sequenciaAtual = [];

function verificarSegredo(tecla) {
    if (modoSegredo) {
        sequenciaAtual.push(tecla);

        if (sequenciaAtual.length === codigoSecreto.length) {
            if (JSON.stringify(sequenciaAtual) === JSON.stringify(codigoSecreto)) {
                mostrarGnome();
                segredo.disabled = true;
                modoSegredo = false;
            } else {
                sequenciaAtual = [];
            }
        }
    }
}

// Gnome
function mostrarGnome() {
    const imagemSecreta = document.getElementById('imagemSecreta');
    const audioSecreto = document.getElementById('audioSecreto');

    imagemSecreta.style.display = 'block';
    audioSecreto.play();

    setTimeout(() => {
        imagemSecreta.style.display = 'none';
    }, 1500);
}

/* Som aleatório quando tecla pressionada. Descontinuado, porém vai permanecer no código por estudo.
function somDaTecla () {
    let posicaoIndice = Math.floor(Math.random()* somTelefone.length);
    let audioAleatorio = somTelefone[posicaoIndice]
    audioAleatorio.play();
} */
