import { Request, Response } from "express"
import { ContaReceber } from "../../Entities/ContaReceber/ContaReceber";
import { IContaAreceber } from "../../Interfaces/ContaReceber/ContaReceber";
import { IUser } from "../../Interfaces/User/User";
import { ContasAReceberServices } from "../../Services/ContasAReceber/ContasAReceberService";

class ContasReceberControllers {
    async saveContasReceber(request: Request, response: Response) {
        const resp: IContaAreceber = <IContaAreceber>request.body
        const contaReceber: ContaReceber = new ContaReceber(
            resp.id_conta, resp.fk_filial, resp.tipo, resp.fk_venda,
            resp.fk_user, resp.parcela, resp.valor, resp.multa, resp.juros,
            resp.desconto, resp.emissao, resp.vencimento, resp.saldo,
            resp.pagamento, resp.recebimento, resp.observacao, resp.fk_pagador)
        const insertConta = await new ContasAReceberServices().insert(contaReceber)
        return response.json(insertConta)
    };
    async updateContasReceber(request: Request, response: Response) {
        const resp: IContaAreceber = <IContaAreceber>request.body
        const contaReceber: ContaReceber = new ContaReceber(
            resp.id_conta, resp.fk_filial, resp.tipo, resp.fk_venda,
            resp.fk_user, resp.parcela, resp.valor, resp.multa, resp.juros,
            resp.desconto, resp.emissao, resp.vencimento, resp.saldo,
            resp.pagamento, resp.recebimento, resp.observacao, resp.fk_pagador)
        const updateConta = await new ContasAReceberServices().update(contaReceber)
        console.log(updateConta)
        return response.json(updateConta)
    };
    async findAllContasReceberlist(request: Request, response: Response) {
        const { id, privilege }: IUser = <IUser>request.body[0]
         const listConta = await new ContasAReceberServices().listContasAReceberByLoggedInUser(id, privilege)
        response.json(listConta)
    };
}

export {ContasReceberControllers }