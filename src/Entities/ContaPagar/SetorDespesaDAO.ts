import { ISetorDespesa } from "../../Interfaces/ContaPagar/ContaPagar";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";


class SetorDespesaDAO extends DAO {

    public static table = 'setor_despesas'

    async insert(SetorDespesa: ISetorDespesa) {
        try {
            const query = `INSERT INTO ${SetorDespesaDAO.table} (name, tipo) VALUES($1,$2)`;
            const values = [SetorDespesa.name, SetorDespesa.tipo];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new SetorDespesaDAO().errors(err);
        }
    };

    async update(SetorDespesa: ISetorDespesa) {
         try {
            const query = `UPDATE ${SetorDespesaDAO.table}
            SET
             name = $1,
             tipo = $2
             WHERE id = $3`;
            const values = [
                SetorDespesa.name,
                SetorDespesa.tipo,
                SetorDespesa.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new SetorDespesaDAO().errors(err);
        }

    }
}

export { SetorDespesaDAO }