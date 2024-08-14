import conn from "../config/conn.js";

const tableEventos =/*sql*/ `
    CREATE TABLE IF NOT EXISTS eventos(
        evento_id varchar(60) primary key,
        evento_titulo varchar(255) not null,
        evento_data date not null,
        evento_palestrantesId varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        foreign key (evento_palestrantesId) references palestrantes(palestrante_id)
);
`;
conn.query(tableEventos, (err, result, field) => {
  if (err) {
    console.error("Erro ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [Eventos] criada com sucesso😎");
});

