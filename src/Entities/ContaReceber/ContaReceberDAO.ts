import { DAO } from "../DAO/DAO";
import { IContaAreceber } from "../../Interfaces/ContaReceber/ContaReceber"
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";

class ContaReceberDAO extends DAO {
    static table = 'contas_receber';

    async insert(Titulo: IContaAreceber) {
        try {
            const query = `
                INSERT INTO ${ContaReceberDAO.table} 
                (fk_filial, tipo, fk_user, parcela, valor, multa, juros, desconto, emissao, vencimento, saldo, recebimento, observacao, fk_pagador) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
                Titulo.fk_pagador
            ];
            await postgreSQL.query(query, values);
            return "Título gerado com sucesso.";
        } catch (err) {
            return new ContaReceberDAO().errors(err);
        }
    }

    async update(ContaRec: IContaAreceber) {
        try {
            const query = `
                UPDATE ${ContaReceberDAO.table}
                SET juros = $1,
                    multa = $2,
                    desconto = $3,
                    saldo = $4,
                    pagamento = $5,
                    recebimento = $6
                WHERE id_conta = $7
            `;
            const values = [
                ContaRec.juros,
                ContaRec.multa,
                ContaRec.desconto,
                ContaRec.saldo,
                ContaRec.pagamento,
                ContaRec.recebimento,
                ContaRec.id_conta
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new ContaReceberDAO().errors(err);
        }
    }
}


export { ContaReceberDAO }