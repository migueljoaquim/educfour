const { PrismaClient, Tbl_teste_prismaScalarFieldEnum } = require("@prisma/client");
const { Sql } = require("@prisma/client/runtime");

const prisma = new PrismaClient();

const selectAllDoador = async function () {
  let sql = "select * from tbl_doador;";

  let rsDoador = await prisma.$queryRawUnsafe(sql);

  if (rsDoador.length > 0) {
    return rsDoador;
  } else {
    return false;
  }
};

const insertDoador = async function(dadosDoador) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_doador(
        email,
        senha
        )
        values
        ('${dadosDoador.email}',
        '${dadosDoador.senha}'
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
    let sql = `select id from tbl_doador order by id desc limit 1;`

    let rsDoador = await prisma.$queryRawUnsafe(sql)

    if (rsDoador.length > 0)
        return rsDoador[0].id
    else
        return false
}

const updateDoador = async function(dadosDoador) {
    let sql = `update tbl_doador set
    email='${dadosDoador.email}',
    senha='${dadosDoador.senha}'
    where id = '${dadosDoador.id}';`
// lembrar do ponto e virgula


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}



const deleteDoador = async function(id) {

    let sql = `delete from tbl_doador where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllDoador,
    insertDoador,
    selectLastId,
    updateDoador,
    deleteDoador
  
  };