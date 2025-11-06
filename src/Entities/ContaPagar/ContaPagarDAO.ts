import { IContaAPagar } from "../../Interfaces/ContaPagar/ContaPagar";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class ContaPagarDAO extends DAO {

    static table = 'contas_pagar'

    async update(ContaAPagar: IContaAPagar) {
        try {
            const query = `
            UPDATE ${ContaPagarDAO.table}
            SET fk_filial = $1,
                tipo = $2,
                fk_compra = $3,
                fk_user = $4,
                parcela = $5,
                valor = $6,
                multa = $7,
                juros = $8,
                desconto = $9,
                emissao = $10,
                vencimento = $11,
                saldo = $12,
                pagamento = $13,
                recebimento = $14,
                observacao = $15,
                fk_beneficiario = $16,
                fk_despesa = $17
            WHERE id_conta = $18
        `;

            const values = [
                ContaAPagar.fk_filial,
                ContaAPagar.tipo,
                ContaAPagar.fk_compra,
                ContaAPagar.fk_user,
                ContaAPagar.parcela,
                ContaAPagar.valor,
                ContaAPagar.multa,
                ContaAPagar.juros,
                ContaAPagar.desconto,
                ContaAPagar.emissao,
                ContaAPagar.vencimento,
                ContaAPagar.saldo,
                ContaAPagar.pagamento,
                ContaAPagar.recebimento,
                ContaAPagar.observacao,
                ContaAPagar.fk_beneficiario,
                ContaAPagar.fk_despesa,
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