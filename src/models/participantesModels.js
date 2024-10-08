import conn from "../config/conn.js";

const tableParticipantes =`
    CREATE TABLE IF NOT EXISTS participantes(
        participantes_id varchar(60) primary key,
        participantes_nome varchar(255) not null,
        participantes_email varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )

`
conn.query(tableParticipantes, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Tabela [ participantes ] criada com sucesso 😎");
  });
