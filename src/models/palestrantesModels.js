import conn from "../config/conn.js";

const tablePalestrantes =`
    CREATE TABLE IF NOT EXISTS palestrantes(
        palestrante_id varchar(60) primary key,
        palestrante_nome varchar(255) not null,
        palestrante_tema varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        foreign key (evento_id) references eventos(evento_id)
    )

`
conn.query(tablePalestrantes, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Tabela [ palestrantes ] criada com sucesso 😎");
  });
