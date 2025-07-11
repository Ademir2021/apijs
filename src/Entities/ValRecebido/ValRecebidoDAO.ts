import { DAO } from "../DAO/DAO";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { IValRecebido } from "../../Interfaces/ValRecebido/ValRecebido";

class ValRecebidoDAO extends DAO {
    static table = 'vals_recebidos'
    async insert(Vals: IValRecebido) {
        try {
            await postgreSQL.query('INSERT INTO ' + ValRecebidoDAO.table + '(fk_conta, fk_venda, fk_user, valor, data_recebimento, descricao, fk_person) VALUES ('
                + "'" + Vals.fk_conta
                + "','" + Vals.fk_venda
                + "', '" + Vals.fk_user
                + "', '" + Vals.valor
                + "', '" + Vals.data_recebimento
                + "', '" + Vals.descricao
                + "', '" + Vals.fk_person
                + "')")
        } catch (err) {
            return (new ValRecebidoDAO().errors(err))
        }
    };
}
export { ValRecebidoDAO }