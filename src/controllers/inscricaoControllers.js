import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";


export const fazerInscrao = async (request, response) => {
    const { participante_id, evento_id} = request.body;
  
    if (!participante_id) {
      response.status(400).json("o id do participante é obrigatório");
      return;
    }
    if (!evento_id) {
      response.status(400).json("o id do Evento é obrigatória");
      return;
    }
    const id = uuidv4();
    const insertSQL = /*sql*/ `INSERT INTO eventos (??,??)
    VALUES(?,?)`;
    const insertData = [
      "participante_id",
      "evento_id",
      id,
      participante_id,
      evento_id,
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