import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const create = async (request, response) => {
    const { nome, hora, data } = request.body;
  
    if (!nome) {
      response.status(400).json("o nome do Evento é obrigatório");
      return;
    }
    if (!hora) {
      response.status(400).json("A hora Do Evento é obrigatória");
      return;
    }
    if (!data) {
      response.status(400).json("A Data Do Evento é obrigatória");
      return;
    }
    const evento_id = uuidv4();
    const insertSQL = /*sql*/ `INSERT INTO eventos (??,??,??,??,??,??,??)
    VALUES
    (?,?,?,?,?,?,?)`;
    const insertData = [
      "evento_id",
      "nome",
      "hora",
      "data",
      evento_id,
      nome,
      hora,
      data,
    ];
    conn.query(insertSQL, insertData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ msg: "erro ao cadastrar evento" });
      } else {
        response.status(201).json("evento cadastrado com sucesso");
      }
    });
  };

  export const pegarTodosOsEventos = async (request, response) => {
    const sql /*SQL*/ = `SELECT * FROM drivers`;

    coon.query(sql, (err, data) => {
      if (err) {
        response.status(500).json({ msg: "Find Drivers error" });
        console.error("Find Drivers error", err.stack);
        return;
      }
      response.status(200).json(data);
    });
  };