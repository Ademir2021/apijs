import { DespesasDTO } from "../../Dtos/ContasAPagar/DespesasDTO";
import { IDespesa } from "../../Interfaces/ContaPagar/ContaPagar";


class DespesasServices{

    async insert (Despesa:IDespesa){
        const res = await new DespesasDTO().insert(Despesa)
        return res
    };

    async update (Despesa:IDespesa){
        const res = await new DespesasDTO().update(Despesa)
        return res
    }
}

export { DespesasServices }