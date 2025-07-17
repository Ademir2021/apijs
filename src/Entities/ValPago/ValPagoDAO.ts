import { IValPago } from "../../Interfaces/ValPago/ValPago";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class ValPagoDAO extends DAO {
  static table = 'vals_pagos'

  async insert(Vals: IValPago) {
    const query = `
      INSERT INTO ${ValPagoDAO.table} 
        (fk_conta, fk_compra, fk_user, valor, data_recebimento, descricao, fk_person, fk_despesa) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `
    const values = [
      Vals.fk_conta,
      Vals.fk_compra,
      Vals.fk_user,
      Vals.valor,
      Vals.data_recebimento,
      Vals.descricao,
      Vals.fk_person,
      Vals.fk_despesa,
    ]

    try {
      await postgreSQL.query(query, values)
    } catch (err) {
      return new ValPagoDAO().errors(err)
    }
  }
}

export { ValPagoDAO }