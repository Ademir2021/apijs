import { SetorDespesaDAO } from "../../Entities/ContaPagar/SetorDespesaDAO";
import { ISetorDespesa } from "../../Interfaces/ContaPagar/ContaPagar";

class SetorDespesasDTO {
    async insert(SetorDespesas: ISetorDespesa) {
        const res = await new SetorDespesaDAO().insert(SetorDespesas)
        return res
    };
    async update(SetorDespesas: ISetorDespesa) {
        const res = await new SetorDespesaDAO().update(SetorDespesas)
        return res
    };
}

export { SetorDespesasDTO }