const { PrismaClient, Tbl_teste_prismaScalarFieldEnum } = require("@prisma/client");
const { Sql } = require("@prisma/client/runtime");

const prisma = new PrismaClient();

const selectAllDoacao = async function () {
  let sql = "select * from tbl_doacao;";

  console.log(sql)

  let rsDoacao = await prisma.$queryRawUnsafe(sql);

  if (rsDoacao.length > 0) {
    return rsDoacao;
  } else {
    return false;
  }
};

const insertDoacao = async function(dadosDoacao) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_doacao(
        nome_completo ,
        cpf ,
         numero_do_cartao ,
         valor_doado ,
         idDoador 
        )
        values
        ('${dadosDoacao.nome_completo}',
        '${dadosDoacao.cpf}',
        '${dadosDoacao.numero_do_cartao }',
        '${dadosDoacao.valor_doado }',
        ${dadosDoacao.idDoador}
            );`

            console.log(sql);

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)


    if (result)
        return true
    else
        return false
}

const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_Doacao order by id desc limit 1;`

    let rsDoacao = await prisma.$queryRawUnsafe(sql)

    if (rsDoacao.length > 0)
        return rsDoacao[0].id
    else
        return false
}

const updateDoacao = async function(dadosDoacao) {
    let sql = `update tbl_doacao set
    nome_completo='${dadosDoacao.nome_completo}',
    cpf='${dadosDoacao.cpf}',
    numero_do_cartao = '${dadosDoacao.numero_do_cartao}',
    valor_doado = '${dadosDoacao.valor_doado}',
    idDoador = ${dadosDoacao.idDoador}
    where id = ${dadosDoacao.id}
    ;`
// lembrar do ponto e virgula

console.log(sql);

    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}



const deleteDoacao = async function(id) {

    let sql = `delete from tbl_doacao where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}



module.exports = {
    selectAllDoacao,
    insertDoacao,
    selectLastId,
    updateDoacao,
    deleteDoacao
  
  };