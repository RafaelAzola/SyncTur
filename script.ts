// declaração de variaveis
let nomePacote = document.querySelector('#pacotes') as HTMLInputElement
let descricaoPacote = document.querySelector('#descricao') as HTMLInputElement
let dataPacote = document.querySelector('#dataDaViagem') as HTMLInputElement
let card = document.querySelector('#sectionCard') as HTMLInputElement
let botaoCadastrar = document.querySelector('#botaoCadastrar') as HTMLElement

let pacotesCadastrados:Array<object> = []
let contador:number = 1

// criação da classe "Pacote"
class Pacote implements IPacote{
    nome:string
    descricao:string
    data: string
    id: number

    constructor(Nome:string,Descricao:string,Data:string,Id:number){
        this.nome = Nome
        this.descricao = Descricao
        this.data = Data
        this.id = Id
    }
    setNome(Nome:string):void {
        this.nome = Nome
    }
    setDescricao(Descricao:string):void {
        this.descricao = Descricao
    }
    setData(Data:string):void {
        this.data = Data
    }
}

interface IPacote{
    setNome(Nome:string):void
    setDescricao(Descricao:string):void
    setData(Data:string):void
}

// função para criar o objeto "Pacote", coloca-lo no array "pacotesCadastrados" e simultaneamente criar um card com as informações do objeto
const criarPacote = (_nome:string,_descricao:string,_data:string,_id:number) => {

    let pacote = new Pacote(_nome,_descricao,_data,_id)
    pacotesCadastrados.push(pacote)
    contador++

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
    </div>`
    limparFormulario()
}

// função para limpar os campos da pagina depois de cadastrar ou editar
const limparFormulario = () => {
    nomePacote.value = '';
    dataPacote.value = '';
    descricaoPacote.value = '';
}

// função de excluir o card (não deu tempo de fazer a função para excluir o Objeto)
const excluirPacote = (_id:number) => {
    let cartaoId = document.querySelector(`#cartao-${_id}`) as HTMLElement
    cartaoId.remove()
}

// função para editar o card (não consegui editar o objeto tambem, por mais que tenha feito os metodos. tambem planejava criar um campo de texto só pra editar)
const editarPacote = (_id:number) => {
    let idNomeCard = document.querySelector(`#idNomeCard-${_id}`) as HTMLElement
    idNomeCard.innerHTML = nomePacote.value

    let idDescCard = document.querySelector(`#idDescCard-${_id}`) as HTMLElement
    idDescCard.innerHTML = descricaoPacote.value

    let idDtCard = document.querySelector(`#idDtCard-${_id}`) as HTMLElement
    idDtCard.innerHTML = dataPacote.value

    limparFormulario()
}

// Consulta a API e preenche os cards com todos os objetos dela usando a função "criarPacote"
var endpoint = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes'
fetch(endpoint, {method:'GET',headers:{'Content-type':"application/json"}})
.then(response => response.json())
.then(result => {
    for(let i = 0; i < result.length; i++){
        criarPacote(
            result[i].nome,result[i].descricao,result[i].data,result[i].id
            )
    }
})
.catch(erro => console.log(erro))

// Cria um pacote/card manualmente e direciona a tela para ele
botaoCadastrar.onclick = () =>{
    let footer = document.querySelector('#footerLogo')
    criarPacote(
        nomePacote.value,descricaoPacote.value,dataPacote.value,contador
    )
    footer!.scrollIntoView()
}