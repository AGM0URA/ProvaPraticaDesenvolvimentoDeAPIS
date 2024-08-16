import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";


export const fazerInscrao = async (request, response) => {
    const { participante_id, eventos_id} = request.body;
  
    if (!participante_id) {
      response.status(400).json("o id do participante é obrigatório");
      return;
    }
    if (!eventos_id) {
      response.status(400).json("o id do Evento é obrigatória");
      return;
    }
    const inscricao_id = uuidv4();
    const insertSQL = /*sql*/ `INSERT INTO inscricao (??,??,??)
    VALUES(?,?,?)`;
    const insertData = [
      "inscricao_id",
      "participante_id",
      "eventos_id",
      inscricao_id,
      participante_id,
      eventos_id,
    ];
    conn.query(insertSQL, insertData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "erro ao inscrever um Participante" });
      } else {
        response.status(201).json("inscricao feita com sucesso");
      }
    });
  };