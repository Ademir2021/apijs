import { SetorDespesasDTO } from "../../Dtos/ContasAPagar/SetorDespesasDTO";
import { ISetorDespesa } from "../../Interfaces/ContaPagar/ContaPagar";

class SetorDespesasServices {
    async insert(SetorDespesas: ISetorDespesa) {
        const res = await new SetorDespesasDTO().insert(SetorDespesas)
        return res
    };

    async update(SetorDespesas: ISetorDespesa) {
        const res = await new SetorDespesasDTO().update(SetorDespesas)
        return res
    };
}

export { SetorDespesasServices }