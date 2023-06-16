
let noticiaDAO = require("../model/DAO/noticiaDAO.js");

const message = require("./modulo/config.js");

const selecionarTodasNoticia = async function () {
    let dadosnoticia = await noticiaDAO.selectAllNoticia();
  
  
    let dadosJSON = {};
  
    if (dadosnoticia) {
      dadosJSON.status = 200
      dadosJSON.count = dadosnoticia.length
      dadosJSON.doacao = dadosnoticia;
      return dadosJSON;
    } else {
      return message.ERROR_NOT_FOUND;
    }
  };

 

  const inserirnoticia = async function(dadosNoticia) {


    if (dadosNoticia.imagem == undefined || dadosNoticia.imagem == '' ||
        dadosNoticia.link == undefined || dadosNoticia.link == '' 
        
    ) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await noticiaDAO.insertNoticia(dadosNoticia)

        if (status) {
            let dadosJson = {}

            let doadorNovoId = await noticiaDAO.selectLastId()
            dadosNoticia.id = doadorNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.aluno = dadosNoticia

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

const atualizarNoticia = async function(dadosNoticia, idNoticia) {

    //Validação de dados
    if (dadosNoticia.imagem == undefined || dadosNoticia.imagem == '' ||
    dadosNoticia.link == undefined || dadosNoticia.link == '' 
    ) {
        return message.ERROR_REQUIRED_DATA
       

        //Validação para o id
    } else if (idNoticia == '' || idNoticia == undefined || isNaN(idNoticia)) {
       
        return message.ERROR_REQUIRED_ID

    } else {
        //Adiciona o ID no JSON com todos os dados
        dadosNoticia.id = idNoticia

        //Encaminha para o DAO os dados para serem alterados
        let status = await noticiaDAO.updateNoticia(dadosNoticia)


        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.Noticia = dadosNoticia

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}


const deletarNoticia = async function(dadosNoticia, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        let status = await noticiaDAO.deleteNoticia(id)
        console.log(status);
        
        dadosNoticia.id = id

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}




module.exports = {
    selecionarTodasNoticia,
    inserirnoticia,
    atualizarNoticia,
    deletarNoticia
  };