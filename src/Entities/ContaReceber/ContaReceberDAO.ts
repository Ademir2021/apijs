import { DAO } from "../DAO/DAO";
import { IContaAreceber } from "../../Interfaces/ContaReceber/ContaReceber"
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";

class ContaReceberDAO extends DAO {
    static table = 'contas_receber';

    async insert(Titulo: IContaAreceber) {
        try {
            const query = `
                INSERT INTO ${ContaReceberDAO.table} 
                (fk_filial, tipo, fk_user, parcela, valor, multa, juros, desconto, emissao, vencimento, saldo, recebimento, observacao, fk_pagador, situacao) 
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
                Titulo.fk_pagador,
                Titulo.situacao
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
                SET 
                    fk_filial = $1,
                    tipo = $2,
                    fk_venda = $3,
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
                    fk_pagador = $16,
                    situacao = $17
                WHERE id_conta = $18
            `;
            const values = [
                ContaRec.fk_filial,
                ContaRec.tipo,
                ContaRec.fk_venda,
                ContaRec.fk_user,
                ContaRec.parcela,
                ContaRec.valor,
                ContaRec.multa,
                ContaRec.juros,
                ContaRec.desconto,
                ContaRec.emissao,
                ContaRec.vencimento,
                ContaRec.saldo,
                ContaRec.pagamento,
                ContaRec.recebimento,
                ContaRec.observacao,
                ContaRec.fk_pagador,
                ContaRec.situacao,
                ContaRec.id_conta
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new ContaReceberDAO().errors(err);
        }
    }
}

export { ContaReceberDAO }