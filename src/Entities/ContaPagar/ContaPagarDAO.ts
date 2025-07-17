import { IContaAPagar } from "../../Interfaces/ContaPagar/ContaPagar";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class ContaPagarDAO extends DAO {

    static table = 'contas_pagar'

    async update(ContaAPagar: IContaAPagar) {
        try {
            const query = `
            UPDATE ${ContaPagarDAO.table}
            SET juros = $1,
                multa = $2,
                desconto = $3,
                saldo = $4,
                pagamento = $5,
                recebimento = $6
            WHERE id_conta = $7
        `;
            const values = [
                ContaAPagar.juros,
                ContaAPagar.multa,
                ContaAPagar.desconto,
                ContaAPagar.saldo,
                ContaAPagar.pagamento,
                ContaAPagar.recebimento,
                ContaAPagar.id_conta
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new ContaPagarDAO().errors(err);
        }
    }
    async insert(Titulo: IContaAPagar) {
        try {
            const query = `
            INSERT INTO ${ContaPagarDAO.table}
            (fk_filial, tipo, fk_user, parcela, valor, multa, juros, desconto, emissao, vencimento, saldo, recebimento, observacao, fk_beneficiario, fk_despesa)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        `;
            const values = [
                Titulo.fk_filial,
                Titulo.tipo,
                Titulo.fk_user,
                Titulo.parcela,
                Titulo.valor,
                Titulo.multa,
                Titulo.juros,
                Titulo.desconto,
                Titulo.emissao,
                Titulo.vencimento,
                Titulo.saldo,
                Titulo.recebimento,
                Titulo.observacao,
                Titulo.fk_beneficiario,
                Titulo.fk_despesa
            ];
            await postgreSQL.query(query, values);
            return "Título gerado com sucesso.";
        } catch (err) {
            return new ContaPagarDAO().errors(err);
        }
    }

}

export { ContaPagarDAO }