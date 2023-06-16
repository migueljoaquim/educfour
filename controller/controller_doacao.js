let doacaoDAO = require("../model/DAO/doacaoDAO.js");

const message = require("./modulo/config.js");

const selecionarTodasDoacao = async function () {
    let dadosdoacao = await doacaoDAO.selectAllDoacao();
  
  
    let dadosJSON = {};
  
    if (dadosdoacao) {
      dadosJSON.status = 200
      dadosJSON.count = dadosdoacao.length
      dadosJSON.doacao = dadosdoacao;
      return dadosJSON;
    } else {
      return message.ERROR_NOT_FOUND;
    }
  };

 

  const inserirdoacao = async function(dadosDoacao) {


    if (dadosDoacao.nome_completo == undefined || dadosDoacao.nome_completo == '' ||
        dadosDoacao.cpf == undefined || dadosDoacao.cpf == '' || 
        dadosDoacao.numero_do_cartao == undefined || dadosDoacao.numero_do_cartao == '' || 
        dadosDoacao.valor_doado == undefined || dadosDoacao.valor_doado == '' || 
        dadosDoacao.idDoador == undefined || dadosDoacao.idDoador == '' 
        
    ) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await doacaoDAO.insertDoacao(dadosDoacao)

        if (status) {
            let dadosJson = {}

            let doadorNovoId = await doacaoDAO.selectLastId()
            dadosDoacao.id = doadorNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.aluno = dadosDoacao

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

const atualizarDoacao = async function(dadosDoacao, idDoacao) {

    //Validação de dados
    if (dadosDoacao.nome_completo == undefined || dadosDoacao.nome_completo == '' ||
    dadosDoacao.cpf == undefined || dadosDoacao.cpf == '' || 
    dadosDoacao.numero_do_cartao == undefined || dadosDoacao.numero_do_cartao == '' || 
    dadosDoacao.valor_doado == undefined || dadosDoacao.valor_doado == '' || 
    dadosDoacao.idDoador == undefined || dadosDoacao.idDoador == ''   
    ) {
        return message.ERROR_REQUIRED_DATA
        console.log('1º if');

        //Validação para o id
    } else if (idDoacao == '' || idDoacao == undefined || isNaN(idDoacao)) {
        console.log('2º if');
        return message.ERROR_REQUIRED_ID

    } else {
        //Adiciona o ID no JSON com todos os dados
        dadosDoacao.id = idDoacao

        //Encaminha para o DAO os dados para serem alterados
        let status = await doacaoDAO.updateDoacao(dadosDoacao)


        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.doacao = dadosDoacao

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}


const deletarDoacao = async function(dadosDoacao, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        let status = await doacaoDAO.deleteDoacao(id)

        dadosDoacao.id = id

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}




module.exports = {
    selecionarTodasDoacao,
    inserirdoacao,
    atualizarDoacao,
    deletarDoacao
  
  };