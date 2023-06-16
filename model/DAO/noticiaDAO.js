const { PrismaClient, Tbl_teste_prismaScalarFieldEnum } = require("@prisma/client");
const { Sql } = require("@prisma/client/runtime");

const prisma = new PrismaClient();

const selectAllNoticia = async function () {
  let sql = "select * from tbl_noticia;";

  console.log(sql)

  let rsNoticia = await prisma.$queryRawUnsafe(sql);

  if (rsNoticia.length > 0) {
    return rsNoticia;
  } else {
    return false;
  }
};

const insertNoticia = async function(dadosNoticia) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_noticia(
        imagem,
        link 
        )
        values
        ('${dadosNoticia.imagem}',
        '${dadosNoticia. link}'
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
    let sql = `select id from tbl_noticia order by id desc limit 1;`

    let rsNoticia = await prisma.$queryRawUnsafe(sql)

    if (rsNoticia.length > 0)
        return rsNoticia[0].id
    else
        return false
}

const updateNoticia = async function(dadosNoticia) {
    let sql = `update tbl_Noticia set
    imagem='${dadosNoticia.imagem}',
    link='${dadosNoticia.link}'
    where id = ${dadosNoticia.id};
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



const deleteNoticia = async function(id) {

    let sql = `delete from tbl_noticia where id=${id}`

    console.log(sql);
    

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}



module.exports = {
    selectAllNoticia,
    insertNoticia,
    selectLastId,
    updateNoticia,
    deleteNoticia
  
  };