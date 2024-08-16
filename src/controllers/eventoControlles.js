import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const pegarTodosOsEventos = async (request, response) => {
  const sql = `SELECT * FROM eventos`;

  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar eventos" });
      console.error("Erro ao buscar eventos", err.stack);
      return;
    }
    response.status(200).json(data);
  });
};

export const criarOsEventos = async (request, response) => {
  const { evento_titulo, evento_data, evento_palestrantesId } = request.body;

  if (!evento_titulo) {
    return response.status(400).json("O título do evento é obrigatório");
  }
  if (!evento_data) {
    return response.status(400).json("A data do evento é obrigatória");
  }
  if (!evento_palestrantesId) {
    return response.status(400).json("O ID do palestrante é obrigatório");
  }

  const checkSQL = `SELECT * FROM palestrantes WHERE palestrante_id = ?`;
  conn.query(checkSQL, [evento_palestrantesId], (err, data) => {
    if (err) {
      console.error("Erro ao verificar palestrante", err);
      return response
        .status(500)
        .json({ message: "Erro ao verificar palestrante" });
    }
    if (data.length === 0) {
      return response.status(400).json("O ID do palestrante não existe");
    }

    const evento_id = uuidv4();
    const insertSQL = `INSERT INTO eventos (??,??,??,??)
    VALUES (?, ?, ?, ?)`;
    const insertData = [
      "evento_id",
      "evento_titulo",
      "evento_data",
      "evento_palestrantesId",
      evento_id,
      evento_titulo,
      evento_data,
      evento_palestrantesId,
    ];

    conn.query(insertSQL, insertData, (err) => {
      if (err) {
        console.error("Erro ao cadastrar evento", err);
        return response
          .status(500)
          .json({ message: "Erro ao cadastrar evento" });
      }
      response.status(201).json("Evento cadastrado com sucesso");
    });
  });
};

export const editarEvento = (request, response) => {
  const { id } = request.params;
  const { evento_titulo, evento_data, evento_palestrantesId } = request.body;

  if (!evento_titulo && !evento_data && !evento_palestrantesId) {
    return response
      .status(400)
      .json({ message: "Você deve passar algum dado a ser modificado" });
  }

  const checkSql = `SELECT * FROM eventos WHERE evento_id = ?`;
  const checkId = [id];

  conn.query(checkSql, checkId, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar o evento" });
      return console.error(err);
    }

    if (data.length === 0) {
      return response
        .status(404)
        .json({ message: "Não foi encontrado nenhum evento com este ID" });
    }

    if (evento_palestrantesId) {
      const checkSQL = `SELECT * FROM palestrantes WHERE palestrante_id = ?`;
      conn.query(checkSQL, [evento_palestrantesId], (err, data) => {
        if (err) {
          response
            .status(500)
            .json({ message: "Erro ao verificar palestrante" });
          return console.error(err);
        }
        if (data.length === 0) {
          return response.status(400).json("O ID do palestrante não existe");
        }
        const updateSQL = `UPDATE eventos SET evento_titulo = ?, evento_data = ?, evento_palestrantesId = ? WHERE evento_id = ?`;
        const updateParams = [
          evento_titulo || data[0].evento_titulo,
          evento_data || data[0].evento_data,
          evento_palestrantesId || data[0].evento_palestrantesId,
          id,
        ];

        conn.query(updateSQL, updateParams, (err) => {
          if (err) {
            response
              .status(500)
              .json({ message: "Erro ao atualizar o evento" });
            return console.error(err);
          }
          response
            .status(200)
            .json({ message: "Evento atualizado com sucesso!" });
        });
      });
    } else {
      const updateSQL = `UPDATE eventos SET evento_titulo = ?, evento_data = ? WHERE evento_id = ?`;
      const updateParams = [
        evento_titulo || data[0].evento_titulo,
        evento_data || data[0].evento_data,
        id,
      ];

      conn.query(updateSQL, updateParams, (err) => {
        if (err) {
          response.status(500).json({ message: "Erro ao atualizar o evento" });
          return console.error(err);
        }
        response
          .status(200)
          .json({ message: "Evento atualizado com sucesso!" });
      });
    }
  });
};

export const deletarEvento = (req, res) => {
  const { id } = req.params;

  const checkSql = /*sql*/ `
  SELECT * FROM eventos
  WHERE ?? = ?
  `;

  const valiSql = ["evento_id", id];

  conn.query(checkSql, valiSql, (err, data) => {
    if (err) {
      res.status(500).json({ message: `Erro ao buscar os dados!` });
      return console.error(err);
    }

    if (data.length == 0) {
      return res
        .status(404)
        .json({ message: "Não foi encontrado nenhum eventpo com este ID!" });
    }

    const getById = /*sql*/ `
          DELETE FROM eventos
          WHERE ?? = ?
      `;
    const valiSql = ["evento_id", id];

    conn.query(getById, valiSql, (err) => {
      if (err) {
        res.status(500).json({ message: `Erro ao buscar os dados!` });
        return console.error(err);
      }

      res.status(409);
      res.end();
    });
  });
};
