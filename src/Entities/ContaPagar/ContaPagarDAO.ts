import { IContaAPagar } from "../../Interfaces/ContaPagar/ContaPagar";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class ContaPagarDAO extends DAO {

    static table = 'contas_pagar'

    async update(ContaAPagar: IContaAPagar) {
        try {
            await postgreSQL.query("UPDATE " + ContaPagarDAO.table
                + " SET juros = '" + ContaAPagar.juros
                + "', multa = '" + ContaAPagar.multa
                + "', desconto ='" + ContaAPagar.desconto
                + "', saldo ='" + ContaAPagar.saldo
                + "', pagamento = '" + ContaAPagar.pagamento
                + "', recebimento = '" + ContaAPagar.recebimento
                + "' WHERE id_conta = '" + ContaAPagar.id_conta
                + "'")
        } catch (err) {
            return (new ContaPagarDAO().errors(err))
        }
    };

    async insert(Titulo: IContaAPagar) {
        try {
            await postgreSQL.query('INSERT INTO ' + ContaPagarDAO.table + '(fk_filial, tipo, fk_user, parcela, valor, multa, juros, desconto, emissao, vencimento, saldo, recebimento, observacao, fk_beneficiario, fk_despesa) VALUES ('
                + "'"
                + Titulo.fk_filial + "','"
                + Titulo.tipo + "','"
                // + Titulo.fkVenda + "','"
                + Titulo.fk_user + "','"
                + Titulo.parcela + "','"
                + Titulo.valor + "','"
                + Titulo.multa + "','"
                + Titulo.juros + "','"
                + Titulo.desconto + "','"
                + Titulo.emissao + "','"
                + Titulo.vencimento + "','"
                + Titulo.saldo + "','"
                + Titulo.recebimento + "','"
                + Titulo.observacao + "','"
                + Titulo.fk_beneficiario + "','"
                + Titulo.fk_despesa
                + "')")
            return "Título gerado com sucesso."
        } catch (err) {
            return (new ContaPagarDAO().errors(err))
        }
    };

}

export { ContaPagarDAO }