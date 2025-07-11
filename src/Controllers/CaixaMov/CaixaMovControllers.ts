import { Request, Response } from "express"
import { CaixaMovDAO } from "../../Entities/CaixaMov/CaixaMovDAO"

const table = CaixaMovDAO.table

class CaixaMovControllers {
    async listCaixaMovs(request: Request, response: Response) {
        const product = await new CaixaMovDAO().selectLimit(table, 'id_caixa')
        response.json(product)
    };
}

export { CaixaMovControllers }