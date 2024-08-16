import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const pegarTodosOsFeedback = async (request, response) => {
  const sql /*SQL*/ = `SELECT * FROM feedbacks`;

  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "erro ao achar os Feedbacks" });
      console.error("erro ao achar os Feedbacks", err.stack);
      return;
    }
    const todosFeedbacks = data
    response.status(200).json(todosFeedbacks);
  });
};


export const fazerFeedback = async (request, response) => {
    const {participante_id, evento_id,feedback_nota,feedback_comentario} = request.body;
  
    if (!participante_id) {
      response.status(400).json("o id do participante é obrigatório");
      return;
    }
    if (!evento_id) {
      response.status(400).json("o id do Evento é obrigatória");
      return;
    }
    const feedback_id = uuidv4();
    const insertSQL = /*sql*/ `INSERT INTO feedbacks (??,??,??,??,??)
    VALUES(?,?,?,?,?)`;
    const insertData = [
      "feedback_id",
      "participante_id",
      "evento_id",
      "feedback_nota",
      "feedback_comentario",
      feedback_id,
      participante_id,
      evento_id,
      feedback_nota,
      feedback_comentario
    ];
    conn.query(insertSQL, insertData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "erro ao fazer um feedback" });
      } else {
        response.status(201).json("feedback feita com sucesso");
      }
    });
  };