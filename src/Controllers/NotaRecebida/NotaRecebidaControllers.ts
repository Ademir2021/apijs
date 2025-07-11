import { Request, Response } from "express"
import { NotaRecebida } from "../../Entities/NotaRecebida/NotaRecebida"
import { INotaRecebida } from "../../Interfaces/NotaRecebida/NotaRecebida"
import { NotaRecebidaDAO } from "../../Entities/NotaRecebida/NotaRecebidaDAO"

class NotaRecebidaControllers{
   async registerNotaRecebida(request: Request, response: Response){
        const resp:INotaRecebida = request.body
        const notaRecebida:NotaRecebida = new NotaRecebida(
            resp.fk_fornecedor,
            resp.data,
            resp.emissao,
            resp.numNota,
            resp.modelo,
            resp.vFrete,
            resp.vSeguro,
            resp.despAcessorias,
            resp.encargos,
            resp.acrescimo,
            resp.desconto,
            resp.tProdutos,
            resp.total,
            resp.items,
            resp.contaAPagar,
            resp.valsPago
        )
        const notaRecebidaRegister = await new NotaRecebidaDAO().insert(notaRecebida)
        return response.json(notaRecebidaRegister)
    };
}

export { NotaRecebidaControllers }