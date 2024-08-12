import conn from "../config/conn.js";

const tablePalestrante = /*sql*/ `
    CREATE TABLE IF NOT EXISTS palestrantes(
        palestrante_id varchar(255) primary key,
        nome varchar(255) not null,
        expertise varchar(255)not null,
        cpf varchar(60) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp

    );`;
conn.query(tablePalestrante, (err, result, field) => {
  if (err) {
    console.error("Erro ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [Palestrantes] criada com sucesso😎");
});
