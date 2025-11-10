import { IDespesa } from "../../Interfaces/ContaPagar/ContaPagar";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class DespesaDAO extends DAO {

    public static table = 'despesas'

    async insert(Despesa: IDespesa) {
        try {
            const query = `INSERT INTO ${DespesaDAO.table} (name, fk_setor) VALUES($1,$2)`;
            const values = [Despesa.name, Despesa.fk_setor];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new DespesaDAO().errors(err);
        }
    }

    async update(Despesa: IDespesa) {
        try {
            const query = `UPDATE ${DespesaDAO.table}
            SET
             name = $1,
             fk_setor = $2
             WHERE id = $3`;
            const values = [
                Despesa.name,
                Despesa.fk_setor,
                Despesa.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new DespesaDAO().errors(err);
        }
    }
}

export { DespesaDAO }