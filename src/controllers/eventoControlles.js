import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";


export const pegarTodosOsEventos = async (request, response) => {
  const sql /*SQL*/ = `SELECT * FROM eventos`;

  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "erro ao achar o Evento" });
      console.error("erro ao achar o Evento", err.stack);
      return;
    }
    const todosEventos = data
    response.status(200).json(todosEventos);
  });
};

export const criarOsEventos = async (request, response) => {
    const { evento_titulo, evento_data, evento_palestrantesId } = request.body;
  
    if (!evento_titulo) {
      response.status(400).json("o titulo do Evento é obrigatório");
      return;
    }
    if (!evento_data) {
      response.status(400).json("A Data Do Evento é obrigatória");
      return;
    }
    if (!evento_palestrantesId) {
      response.status(400).json("O id do palestrante é obrigatorio");
      return;
    }
    const evento_id = uuidv4();
    const insertSQL = /*sql*/ `INSERT INTO eventos (??,??,??,??)
    VALUES(?,?,?,?)`;
    const insertData = [
      "evento_id",
      "evento_titulo",
      "evento_data",
      "evento_palestrantesId",
      evento_id,
      evento_data,
      evento_data,
      evento_palestrantesId,
    ];
    conn.query(insertSQL, insertData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "erro ao cadastrar evento" });
      } else {
        response.status(201).json("evento cadastrado com sucesso");
      }
    });
  };



