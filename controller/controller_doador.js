let doadorDAO = require("../model/DAO/doadorDAO.js");

const message = require("./modulo/config.js");

const selecionarTodosDoadores = async function () {
    let dadosDoador = await doadorDAO.selectAllDoador();
  
  
    let dadosJSON = {};
  
    if (dadosDoador) {
      dadosJSON.status = 200
      dadosJSON.count = dadosDoador.length
      dadosJSON.doador = dadosDoador;
      return dadosJSON;
    } else {
      return message.ERROR_NOT_FOUND;
    }
  };

 

  const inserirDoador = async function(dadosDoador) {


    if (dadosDoador.email == undefined || dadosDoador.email == '' ||
        dadosDoador.senha == undefined || dadosDoador.senha == ''   
    ) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await doadorDAO.insertDoador(dadosDoador)

        if (status) {
            let dadosJson = {}

            let doadorNovoId = await doadorDAO.selectLastId()
            dadosDoador.id = doadorNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.aluno = dadosDoador

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

const atualizarDoador = async function(dadosDoador, idDoador) {

    //Validação de dados
    if (dadosDoador.email == undefined || dadosDoador.email == '' ||
    dadosDoador.senha == undefined || dadosDoador.senha == ''   
    ) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idDoador == '' || idDoador == undefined || isNaN(idDoador)) {
        return message.ERROR_REQUIRED_ID

    } else {
        //Adiciona o ID no JSON com todos os dados
        dadosDoador.id = idDoador

        //Encaminha para o DAO os dados para serem alterados
        let status = await doadorDAO.updateDoador(dadosDoador)


        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.doador = dadosDoador

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}


const deletarDoador = async function(dadosDoador, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        let status = await doadorDAO.deleteDoador(id)

        dadosDoador.id = id

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}



module.exports = {
    selecionarTodosDoadores,
    inserirDoador,
    atualizarDoador,
    deletarDoador
  
  };