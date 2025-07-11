import { DAO } from "../DAO/DAO";
import { IContaAreceber } from "../../Interfaces/ContaReceber/ContaReceber"
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";

class ContaReceberDAO extends DAO {

    static table = 'contas_receber'

    async insert(Titulo: IContaAreceber) {
        try {
            await postgreSQL.query('INSERT INTO ' + ContaReceberDAO.table + '(fk_filial, tipo, fk_user, parcela, valor, multa, juros, desconto, emissao, vencimento, saldo, recebimento, observacao, fk_pagador) VALUES ('
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
                + Titulo.fk_pagador
                + "')")
            return "Título gerado com sucesso."
        } catch (err) {
            return (new ContaReceberDAO().errors(err))
        }
    };

    async update(ContaRec: IContaAreceber) {
        try {
            await postgreSQL.query("UPDATE " + ContaReceberDAO.table
                + " SET juros = '" + ContaRec.juros
                + "', multa = '" + ContaRec.multa
                + "', desconto ='" + ContaRec.desconto
                + "', saldo ='" + ContaRec.saldo
                + "', pagamento = '" + ContaRec.pagamento
                + "', recebimento = '" + ContaRec.recebimento
                + "' WHERE id_conta = '" + ContaRec.id_conta
                + "'")
        } catch (err) {
            return (new ContaReceberDAO().errors(err))
        }
    };
}

export { ContaReceberDAO }