
import conn from "../config/conn.js";

const tableFeedback =/*sql*/ `
    CREATE TABLE IF NOT EXISTS feedbacks (
        feedback_id VARCHAR(60) PRIMARY KEY,
        participante_id VARCHAR(255) NOT NULL,
        evento_id VARCHAR(255) NOT NULL,
        feedback_nota VARCHAR(255) NOT NULL,  
        feedback_comentario VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (participante_id) REFERENCES participantes(participantes_id),
        FOREIGN KEY (evento_id) REFERENCES eventos(evento_id)
    );
`;

conn.query(tableFeedback, (err, result) => {
  if (err) {
    console.error("Erro ao criar a tabela [Feedback]: " + err.stack);
    return;
  }
  console.log("Tabela [Feedback] criada com sucesso 😎");
});
