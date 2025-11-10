import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";
import { DespesasServices } from "../../Services/ContasAPagar/DespesasServices";
import { Despesa } from "../../Entities/ContaPagar/Despesa";
import { SetorDespesa } from "../../Entities/ContaPagar/SetorDespesa";
import { SetorDespesasServices } from "../../Services/ContasAPagar/SetorDespesasServices";
import { IDespesa, ISetorDespesa } from "../../Interfaces/ContaPagar/ContaPagar";

class DespesaControllers extends DAO {
    async findAll(request: Request, response: Response) {
        const despesas = await new DespesaControllers().select('despesas', 'id')
        response.json(despesas)
    };

    async findAllSetorDespesas(request: Request, response: Response) {
        const setorDespesas = await new DespesaControllers().select('setor_despesas', 'id')
        response.json(setorDespesas)
    };

    async insert(request: Request, response: Response) {
        const res: IDespesa = <IDespesa>request.body
        const despesa = new Despesa(res.id, res.name, res.fk_setor)
        const resp = await new DespesasServices().insert(despesa)
        response.json(resp)
    };

    async update(request: Request, response: Response) {
        const res: IDespesa = <IDespesa>request.body
        const despesa = new Despesa(res.id, res.name, res.fk_setor)
        const resp = await new DespesasServices().update(despesa)
        response.json(resp)
    };

    async insertSetorDespesa(request: Request, response: Response) {
        const res: ISetorDespesa = <ISetorDespesa>request.body
        const despesa = new SetorDespesa(res.id, res.name, res.tipo)
        const resp = await new SetorDespesasServices().insert(despesa)
        response.json(resp)
    };

    async updateSetorDespesa(request: Request, response: Response) {
        const res: ISetorDespesa = <ISetorDespesa>request.body
        const despesa = new SetorDespesa(res.id, res.name, res.tipo)
        const resp = await new SetorDespesasServices().update(despesa)
        response.json(resp)
    };
}

export { DespesaControllers }