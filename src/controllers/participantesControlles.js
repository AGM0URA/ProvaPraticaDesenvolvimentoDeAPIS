import conn from "../config/conn.js";

import { v4 as uuidv4 } from "uuid";


export const buscarParticipantes = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM participantes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao Buscar participante" });
      return;
    }
    const todosParticipantes = data;
    response.status(200).json(todosParticipantes);
  });
};

export const cadastrarParticipantes = (request, response) => {
  const { participantes_nome, participantes_email } = request.body;
  if (!participantes_nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!participantes_email) {
    response
      .status(400)
      .json({ message: "Email é um campo obrigatório" });
    return;
  }
  const checkEmail = /*sql*/ `SELECT * FROM participantes WHERE ?? = ?`;
  const checkSQL = ["participantes_email", participantes_email];
  conn.query(checkEmail, checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao cadastrar participante " });
      return console.error(err);
    }
    if (data.length > 0) {
      response.status(404).json({ message: "Este participante ja existe" });
      return 
    }

    const id = uuidv4()
    const postsql = /*sql*/ `INSERT INTO participantes(??,??,??) VALUES (?,?,?)`;
    const insertData = [
      "participantes_id",
      "participantes_nome",
      "participantes_email",
      id,
      participantes_nome,
      participantes_email,
    ];
    conn.query(postsql, insertData, (err) => {
      if (err) {
        console.log(err);
        response.status(500).json({ message: "Erro ao cadastrar participante" });
        return console.error(err);
      }
      response.status(201).json({ message: "participante cadastrado com sucesso" });
    });
  });
};
