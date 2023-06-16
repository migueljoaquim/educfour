create database db_reciclagem;

show databases;
     
desc tbl_doador;

use db_reciclagem;


create table tbl_doador(
	id int not null auto_increment primary key,
    email varchar(100) not null,
    senha varchar(8) not null,
         unique index(id)
);


create table tbl_noticia(
	id int not null auto_increment primary key,
   imagem varchar(45) not null,
   link varchar(45) not null,
       unique index(id)
);



create table tbl_adm(
	id int not null auto_increment primary key,
    email varchar(100) not null,
    senha varchar(8) not null,
         unique index(id)
);



create table tbl_doacao(
	id int not null auto_increment primary key,
   nome_completo varchar(100) not null,
   cpf varchar(11) not null,
    numero_do_cartao varchar(16) not null,
    valor_doado varchar(45) not null,
    idDoador int not null,
    
      constraint FK_doador_doacao
    foreign key (idDoador)
    references tbl_doador(id),
         unique index(id)
);



create table tbl_dashbaord(
	id int not null auto_increment primary key,
    idDoacao int not null,
    idNoticia int not null,
    idAdm int not null,
    
    constraint FK_doacao_dashbaord
    foreign key (idDoacao)
    references tbl_doacao(id),
    
     constraint FK_Noticia_dashbaord
    foreign key (idNoticia)
    references tbl_noticia(id),
    
       constraint FK_Adm_dashbaord
    foreign key (idAdm)
    references tbl_adm(id),
    
         unique index(id)
);




insert into tbl_adm(email,senha)values('reciclagem@gmail.com','DSM2');