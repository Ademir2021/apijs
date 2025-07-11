import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";
import { INotaRecebida } from "../../Interfaces/NotaRecebida/NotaRecebida";

class NotaRecebidaDAO extends DAO {

    static table = "notas_recebidas"
    static tableItensComprados = 'itens_comprados'
    static tableContasPagar = 'contas_pagar'
    static tableValsPagos = 'vals_pagos'

    async insert(NotaRecebida: INotaRecebida) {
        try {
            await postgreSQL.query('INSERT INTO ' + NotaRecebidaDAO.table + '(fk_fornecedor, data_nota, emissao, num_nota, modelo, v_frete, v_seguro, desp_acessorias, acrescimo, desconto, t_produto, total) VALUES ('
                + "'"
                + NotaRecebida.fk_fornecedor
                + "','"
                + NotaRecebida.data
                + "','"
                + NotaRecebida.emissao
                + "','"
                + NotaRecebida.numNota
                + "','"
                + NotaRecebida.modelo
                + "','"
                + NotaRecebida.vFrete
                + "','"
                + NotaRecebida.vSeguro
                + "','"
                + NotaRecebida.despAcessorias
                + "','"
                + NotaRecebida.acrescimo
                + "','"
                + NotaRecebida.desconto
                + "','"
                + NotaRecebida.tProdutos
                + "','"
                + NotaRecebida.total
                + "')");

            const num_compra_ = await postgreSQL.query("SELECT MAX(id_nota) FROM " + NotaRecebidaDAO.table + "");
            const num_compra: number = num_compra_.rows[0].max;

            if (NotaRecebida.items)
                for (let item of NotaRecebida.items) {
                    await postgreSQL.query('INSERT INTO ' + NotaRecebidaDAO.tableItensComprados + '(fk_nota, fk_item, quant, v_unit, total) VALUES ('
                        + "'"
                        + num_compra + "','"
                        + item.item + "','"
                        + item.quantidade + "','"
                        + item.unitario + "','"
                        + item.total
                        + "')")
                };

            if (NotaRecebida.contaAPagar)
                for (let conta of NotaRecebida.contaAPagar) {
                    await postgreSQL.query('INSERT INTO ' + NotaRecebidaDAO.tableContasPagar + '(fk_filial, tipo, fk_compra, fk_user, parcela, valor, multa, juros, desconto, emissao, vencimento, saldo, recebimento, observacao, fk_beneficiario, fk_despesa) VALUES ('
                        + "'"
                        + conta.fk_filial + "','"
                        + conta.tipo + "','"
                        + num_compra + "','"
                        + conta.fk_user + "','"
                        + conta.parcela + "','"
                        + conta.valor + "','"
                        + conta.multa + "','"
                        + conta.juros + "','"
                        + conta.desconto + "','"
                        + conta.emissao + "','"
                        + conta.vencimento + "','"
                        + conta.saldo + "','"
                        + conta.recebimento + "','"
                        + conta.observacao + "','"
                        + conta.fk_beneficiario + "','"
                        + conta.fk_despesa
                        + "')")
                };

            if (NotaRecebida.valsPago.length > 0) {
                for (let NotaRec of NotaRecebida.valsPago) {
                    await postgreSQL.query('INSERT INTO ' + NotaRecebidaDAO.tableValsPagos + '(fk_conta, fk_compra, fk_user, valor, data_recebimento, descricao, fk_person) VALUES ('
                        + "'" + 0
                        + "','" + num_compra
                        + "','" + NotaRec.fk_user
                        + "','" + NotaRec.valor
                        + "','" + NotaRec.data_recebimento
                        + "','" + NotaRec.descricao
                        + "','" + NotaRec.fk_person
                        + "')")
                }
            }
            return (num_compra)
        } catch (err) {
            return new NotaRecebidaDAO().errors(err);
        }
    }
}

export { NotaRecebidaDAO }