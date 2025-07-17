import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { ISale } from "../../Interfaces/Sale/Sale";
import { DAO } from "../DAO/DAO";

class SaleDAO extends DAO {
    static table = "sales"
    static tableItens = "itens_sale"
    static tableContasReceber = "contas_receber"
    static tableValsRecebidos = "vals_recebidos"
    async insert(sales: ISale) {
        try {
            await postgreSQL.query(`INSERT INTO  ${SaleDAO.table}
                ( fk_name_pers, disc_sale, fk_name_filial, fk_name_user, val_rec, total_sale )
                VALUES ($1, $2, $3, $4, $5, $6)`, [
                sales.fk_person,
                sales.disc_sale,
                sales.fk_filial,
                sales.fk_user,
                sales.paySale - sales.disc_sale,
                sales.tNote
            ]);

            const num_sale_ = await postgreSQL.query(`SELECT MAX(id_sale) FROM ${SaleDAO.table}`);
            const num_sale: number = num_sale_.rows[0].max;

            if (sales.itens)
                for (let item of sales.itens) {
                    const sum_total_item: number = 0;
                    await postgreSQL.query(`INSERT INTO  ${SaleDAO.tableItens}
                        (fk_sale, fk_product, amount_product, val_product, total_product)
                        VALUES ($1, $2, $3, $4, $5)`, [
                        num_sale,
                        item.item,
                        item.amount,
                        item.valor,
                        sum_total_item
                    ]);
                };

            if (sales.contasReceber)
                for (let conta of sales.contasReceber) {
                    await postgreSQL.query(`INSERT INTO ${SaleDAO.tableContasReceber} 
                        (fk_filial, tipo, fk_venda, fk_user, parcela,
                        valor, multa, juros, desconto, emissao,
                        vencimento, saldo, recebimento, observacao, fk_pagador)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14, $15)`, [
                        conta.fk_filial, conta.tipo, num_sale, conta.fk_user, conta.parcela,
                        conta.valor, conta.multa, conta.juros, conta.desconto, conta.emissao,
                        conta.vencimento, conta.saldo, conta.recebimento, conta.observacao, conta.fk_pagador
                    ])
                };
            if (sales.dinheiro > 0) {
                await postgreSQL.query(`INSERT INTO  ${SaleDAO.tableValsRecebidos}
                    (fk_conta, fk_venda, fk_user, valor, data_recebimento, descricao, fk_person)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
                    0, num_sale, sales.fk_user, sales.dinheiro,
                    new Date().toISOString(), "Venda", sales.fk_person
                ]);
            }
            return (num_sale)
        } catch (err) {
            return new SaleDAO().errors(err);
        }
    };
}
export { SaleDAO }