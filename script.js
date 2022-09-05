"use strict";
// declaração de variaveis
let nomePacote = document.querySelector('#pacotes');
let descricaoPacote = document.querySelector('#descricao');
let dataPacote = document.querySelector('#dataDaViagem');
let card = document.querySelector('#sectionCard');
let botaoCadastrar = document.querySelector('#botaoCadastrar');
let pacotesCadastrados = [];
let contador = 1;
// criação da classe "Pacote"
class Pacote {
    constructor(Nome, Descricao, Data, Id) {
        this.nome = Nome;
        this.descricao = Descricao;
        this.data = Data;
        this.id = Id;
    }
    setNome(Nome) {
        this.nome = Nome;
    }
    setDescricao(Descricao) {
        this.descricao = Descricao;
    }
    setData(Data) {
        this.data = Data;
    }
}
// função para criar o objeto "Pacote", coloca-lo no array "pacotesCadastrados" e simultaneamente criar um card com as informações do objeto
const criarPacote = (_nome, _descricao, _data, _id) => {
    let pacote = new Pacote(_nome, _descricao, _data, _id);
    pacotesCadastrados.push(pacote);
    contador++;
    card.innerHTML +=
        `<div class="card" id="cartao-${_id}">
        <div class="cardConteudo">
            <h2 id="idNomeCard-${_id}">${_nome}</h2>
            <div class="cardTexto">
                <span id="idDescCard-${_id}" class="spanDescricao">
                    ${_descricao}
                </span>
                <span id="idDtCard-${_id}" class="spanViagem">
                    ${_data}
                </span>
            </div>
            <div>
                <button class="botaoEditar" onclick="editarPacote(${_id})">Editar</button>
                <button class="botaoExcluir" onclick="excluirPacote(${_id})">Excluir</button>
            </div>
        </div>
    </div>`;
    limparFormulario();
};
// função para limpar os campos da pagina depois de cadastrar ou editar
const limparFormulario = () => {
    nomePacote.value = '';
    dataPacote.value = '';
    descricaoPacote.value = '';
};
// função de excluir o card (não deu tempo de fazer a função para excluir o Objeto)
const excluirPacote = (_id) => {
    let cartaoId = document.querySelector(`#cartao-${_id}`);
    cartaoId.remove();
};
// função para editar o card (não consegui editar o objeto tambem, por mais que tenha feito os metodos. tambem planejava criar um campo de texto só pra editar)
const editarPacote = (_id) => {
    let idNomeCard = document.querySelector(`#idNomeCard-${_id}`);
    idNomeCard.innerHTML = nomePacote.value;
    let idDescCard = document.querySelector(`#idDescCard-${_id}`);
    idDescCard.innerHTML = descricaoPacote.value;
    let idDtCard = document.querySelector(`#idDtCard-${_id}`);
    idDtCard.innerHTML = dataPacote.value;
    limparFormulario();
};
// Consulta a API e preenche os cards com todos os objetos dela usando a função "criarPacote"
var endpoint = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes';
fetch(endpoint, { method: 'GET', headers: { 'Content-type': "application/json" } })
    .then(response => response.json())
    .then(result => {
    for (let i = 0; i < result.length; i++) {
        criarPacote(result[i].nome, result[i].descricao, result[i].data, result[i].id);
    }
})
    .catch(erro => console.log(erro));
// Cria um pacote/card manualmente e direciona a tela para ele
botaoCadastrar.onclick = () => {
    criarPacote(nomePacote.value, descricaoPacote.value, dataPacote.value, contador);
    document.querySelector('#footerLogo').scrollIntoView();
};
