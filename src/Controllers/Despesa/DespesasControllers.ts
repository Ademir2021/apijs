import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";

class DespesaControllers extends DAO {
    async findAll(request: Request, response: Response) {
        const despesas = await new DespesaControllers().select('despesas', 'id')
        response.json(despesas)
    };
}

export { DespesaControllers }