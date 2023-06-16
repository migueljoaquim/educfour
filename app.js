/****************************************************************************
 * Objetivo: Criando os endpoints
 * Autor: Moreno
 * Versão: 1.0
 ****************************************************************************/

/*************************************************************************
    Para realizar a conexão com Banco de Dados iremos utilizar o PRISMA
    
    npm install prisma --save
    npx prisma 
    npx prisma init 
    npm install @prisma/client

***************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyJson = bodyParser.json()


const controllerDoador = require('./controller/controller_doador')
const controllerDoacao = require('./controller/controller_doacao')
const controllerNoticia = require('./controller/controller_noticia')


//Cria um objeto com as informações da classe express
const app = express()

//Defie as permissões no header da API
app.use((request, response, next) => {
    //Permite gerenciar a origen das requisiçõe da API
    //* - significa que a API será pública
    //IP - se colocar o IP, a API smente responderá para aquela máquina
    response.header('Access-Control-Allow-Origin', '*')

    //Permite gerenciar quais verbos (métodos) poderão fazer requisições
    response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS')

    //Ativa no cors das requisições as permissões estabelecidas
    app.use(cors())

    next()
})


// ENDPOINTS
app.get('/v1/cps/doador', cors(), async function(request, response) {

  let dados = await controllerDoador.selecionarTodosDoadores()

  response.status(dados.status)
  response.json(dados)
})




app.post('/v1/cps/doador', cors(), bodyJson, async function(request, response) {

  let contentType = request.headers['content-type']

  if (String(contentType).toLowerCase() == 'application/json') {
      //Recebe os dados encaminhados no body da requisição
      let dadosBody = request.body

      //Envia os dados para a controller
      let resultInsertDados = await controllerDoador.inserirDoador(dadosBody)

      //Retorna o status code e a message
      response.status(resultInsertDados.status)
      response.json(resultInsertDados)
  } else {

      return message.ERROR_INVALID_CONTENT_TYPE
  }
})




app.put('/v1/cps/doador/:id', cors(), bodyJson, async function(request, response) {
  let contentType = request.headers['content-type']

  if (String(contentType).toLowerCase() == 'application/json') {
      //Recebe os dados do Body
      let dadosBody = request.body

      //Recebe o id do aluno
      let idDoador = request.params.id
      let resultUpdatedados = await controllerDoador.atualizarDoador(dadosBody, idDoador)

      response.status(resultUpdatedados.status)
      response.json(resultUpdatedados)
  } else {

      return message.ERROR_INVALID_CONTENT_TYPE
  }
})


app.delete('/v1/cps/doador/:id', cors(), bodyJson, async function(request, response) {
  //Recebe os dados do Body
  let dadosBody = request.body

  //Recebe o id do aluno
  let idDoador = request.params.id

  let resultDeleteDados = await controllerDoador.deletarDoador(dadosBody, idDoador)

  response.status(resultDeleteDados.status)
  response.json(resultDeleteDados)

})


// ENDPOINTS
app.get('/v1/cps/doacao', cors(), async function(request, response) {

  let dados = await controllerDoacao.selecionarTodasDoacao()

  response.status(dados.status)
  response.json(dados)
})




app.post('/v1/cps/doacao', cors(), bodyJson, async function(request, response) {

  let contentType = request.headers['content-type']

  if (String(contentType).toLowerCase() == 'application/json') {
      //Recebe os dados encaminhados no body da requisição
      let dadosBody = request.body

      //Envia os dados para a controller
      let resultInsertDados = await controllerDoacao.inserirdoacao(dadosBody)

      //Retorna o status code e a message
      response.status(resultInsertDados.status)
      response.json(resultInsertDados)
  } else {

      return message.ERROR_INVALID_CONTENT_TYPE
  }
})




app.put('/v1/cps/doacao/:id', cors(), bodyJson, async function(request, response) {
  let contentType = request.headers['content-type']

  if (String(contentType).toLowerCase() == 'application/json') {
      //Recebe os dados do Body
      let dadosBody = request.body

      //Recebe o id do aluno
      let idDoacao = request.params.id
      let resultUpdatedados = await controllerDoacao.atualizarDoacao(dadosBody, idDoacao)

      response.status(resultUpdatedados.status)
      response.json(resultUpdatedados)
  } else {

      return message.ERROR_INVALID_CONTENT_TYPE
  }
})


app.delete('/v1/cps/doacao/:id', cors(), bodyJson, async function(request, response) {
  //Recebe os dados do Body
  let dadosBody = request.body

  //Recebe o id do aluno
  let idDoacao= request.params.id

  let resultDeleteDados = await controllerDoacao.deletarDoacao(dadosBody, idDoacao)

  response.status(resultDeleteDados.status)
  response.json(resultDeleteDados)

})











// ENDPOINTS
app.get('/v1/cps/noticia', cors(), async function(request, response) {

  let dados = await controllerNoticia.selecionarTodasNoticia()

  response.status(dados.status)
  response.json(dados)
})




app.post('/v1/cps/noticia', cors(), bodyJson, async function(request, response) {

  let contentType = request.headers['content-type']

  if (String(contentType).toLowerCase() == 'application/json') {
      //Recebe os dados encaminhados no body da requisição
      let dadosBody = request.body

      //Envia os dados para a controller
      let resultInsertDados = await controllerNoticia.inserirnoticia(dadosBody)

      //Retorna o status code e a message
      response.status(resultInsertDados.status)
      response.json(resultInsertDados)
  } else {

      return message.ERROR_INVALID_CONTENT_TYPE
  }
})




app.put('/v1/cps/noticia/:id', cors(), bodyJson, async function(request, response) {
  let contentType = request.headers['content-type']

  if (String(contentType).toLowerCase() == 'application/json') {
      //Recebe os dados do Body
      let dadosBody = request.body

      //Recebe o id do aluno
      let idNoticia = request.params.id
      let resultUpdatedados = await controllerNoticia.atualizarNoticia(dadosBody, idNoticia)

      response.status(resultUpdatedados.status)
      response.json(resultUpdatedados)
  } else {

      return message.ERROR_INVALID_CONTENT_TYPE
  }
})


app.delete('/v1/cps/noticia/:id', cors(), bodyJson, async function(request, response) {
  //Recebe os dados do Body
  let dadosBody = request.body

  //Recebe o id do aluno
  let idNoticia= request.params.id

  let resultDeleteDados = await controllerNoticia.deletarNoticia(dadosBody, idNoticia)

  response.status(resultDeleteDados.status)
  response.json(resultDeleteDados)

})















app.listen(8080, function(){
  console.log('rodando');
  
})