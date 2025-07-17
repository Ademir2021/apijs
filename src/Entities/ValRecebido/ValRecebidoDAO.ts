import { DAO } from "../DAO/DAO";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { IValRecebido } from "../../Interfaces/ValRecebido/ValRecebido";

class ValRecebidoDAO extends DAO {
    static table = 'vals_recebidos'

    async insert(Vals: IValRecebido) {
        const query = `
      INSERT INTO ${ValRecebidoDAO.table} 
        (fk_conta, fk_venda, fk_user, valor, data_recebimento, descricao, fk_person)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `
        const values = [
            Vals.fk_conta,
            Vals.fk_venda,
            Vals.fk_user,
            Vals.valor,
            Vals.data_recebimento,
            Vals.descricao,
            Vals.fk_person,
        ]

        try {
            await postgreSQL.query(query, values)
        } catch (err) {
            return new ValRecebidoDAO().errors(err)
        }
    }
}

export { ValRecebidoDAO }