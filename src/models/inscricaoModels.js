import conn from "../config/conn.js";

const tableInscricao = /*sql*/ `
    CREATE TABLE IF NOT EXISTS inscricao(
        inscricao_id varchar(255) primary key,
        participante_id varchar(255),
        eventos_id varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        foreign key (participante_id) references participantes(participantes_id),
        foreign key (eventos_id) references eventos(evento_id)
    );`;
conn.query(tableInscricao, (err, result, field) => {
  if (err) {
    console.error("Erro ao criar a tabela [INSCRIÇÃO]" + err.stack);
    return;
  }
  console.log("Tabela [inscricao] criada com sucesso😎");
});