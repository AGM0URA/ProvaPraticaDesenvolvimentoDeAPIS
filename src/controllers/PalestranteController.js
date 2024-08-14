import conn from "../config/conn.js";

import { v4 as uuidv4 } from "uuid";


export const buscarPalestrantes = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM palestrantes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao Buscar palestrante" });
      return;
    }
    const todosPalestrantes = data;
    response.status(200).json(todosPalestrantes);
  });
};

export const cadastrarPalestrante = (request, response) => {
  const { palestrante_nome, palestrante_expertise, palestrante_cpf } = request.body;
  if (!palestrante_nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!palestrante_expertise) {
    response
      .status(400)
      .json({ message: "A expertise é um campo obrigatório" });
    return;
  }
  if (!palestrante_cpf) {
    response.status(400).json({ message: "cpf é um campo obrigatório" });
    return;
  }
  const checkCPF = /*sql*/ `SELECT * FROM palestrantes WHERE ?? = ?`;
  const checkSQL = ["palestrante_cpf", palestrante_cpf];
  conn.query(checkCPF, checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao cadastrar palestrante " });
      return console.error(err);
    }
    if (data.length > 0) {
      response.status(404).json({ message: "Este palestrante ja existe" });
      return 
    }

    const id = uuidv4()
    const postsql = /*sql*/ `INSERT INTO palestrantes(??,??,??,??) VALUES (?,?,?,?)`;
    const insertData = [
      "palestrante_id",
      "palestrante_nome",
      "palestrante_expertise",
      "palestrante_cpf",
      id,
      palestrante_nome,
      palestrante_expertise,
      palestrante_cpf,
    ];
    conn.query(postsql, insertData, (err) => {
      if (err) {
        console.log(err);
        response.status(500).json({ message: "Erro ao cadastrar palestrante" });
        return console.error(err);
      }
      response.status(201).json({ message: "Palestrante cadastrado com sucesso" });
    });
  });
};
