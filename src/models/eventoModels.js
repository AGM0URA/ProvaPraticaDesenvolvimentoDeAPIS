import conn from "../config/conn.js";

const tableEventos =`
    CREATE TABLE IF NOT EXISTS eventos(
        evento_id varchar(60) primary key,
        evento_nome varchar(255) not null,
        evento_hora varchar(255) not null,
        evento_data date not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )

`
conn.query(tableEventos, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Tabela [ evento ] criada com sucesso 😎");
  });

  