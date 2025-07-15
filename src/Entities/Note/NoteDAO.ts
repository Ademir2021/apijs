import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";


class NoteDAO extends DAO {

    async getNote(id:string) {
        const res = await postgreSQL.query(
            "SELECT * FROM nota WHERE nota = $1", [id]);
        return res.rows[0];
    }

    async getItemsNote(id:string) {
        const res = await postgreSQL.query(
            "SELECT  *FROM itens_nota WHERE id_venda = $1 ", [id]);
        return res.rows;
    }

    async getInvoices(id:string) {
        const res = await postgreSQL.query(
            "SELECT * FROM contas_receber WHERE fk_venda = $1 ORDER BY vencimento", [id]);
        return res.rows;
    }

    async getMoney(id:string) {
        const res = await postgreSQL.query(
            "SELECT valor FROM vals_recebidos WHERE fk_venda = $1 AND fk_conta = 0", [id]
        );
        return res.rows[0];
    }
}

export { NoteDAO }