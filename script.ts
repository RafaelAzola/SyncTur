let nomePacote = document.querySelector('#pacotes')
let descricaoPacote = document.querySelector('#descricao')
let dataPacote = document.querySelector('#dataDaViagem')
let card = document.querySelector('#sectionCard')
let botaoCadastrar = document.querySelector('#botaoCadastrar')
let rodape = document.querySelectorAll('#footerLogo')

let pacotesCadastrados:Array<object> = []
let contador:number = 1

interface IPacote{
    setNome(Nome:string):void
    setDescricao(Descricao:string):void
    setData(Data:Date):void
}

class Pacote implements IPacote{
    nome:string
    descricao:string
    data: Date
    id: number

    constructor(Nome:string,Descricao:string,Data:Date,Id:number){
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
    setData(Data:Date):void {
        this.data = Data
    }
}

const criarPacote = (_nome:string,_descricao:string,_data:Date,_id:number) => {

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

const limparFormulario = () => {
    nomePacote.value = '';
    dataPacote.value = '';
    descricaoPacote.value = '';
}

const excluirPacote = (_id:number) => {
    document.querySelector(`#cartao-${_id}`).remove()
}

const editarPacote = (_id:number) => {
    document.querySelector(`#idNomeCard-${_id}`).innerHTML = nomePacote.value
    document.querySelector(`#idDescCard-${_id}`).innerHTML = descricaoPacote.value
    document.querySelector(`#idDtCard-${_id}`).innerHTML = dataPacote.value
    limparFormulario()
}

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

botaoCadastrar.onclick = () =>{
    criarPacote(
        nomePacote.value,descricaoPacote.value,dataPacote.value,contador
        )
    document.querySelector('#footerLogo').scrollIntoView()
}