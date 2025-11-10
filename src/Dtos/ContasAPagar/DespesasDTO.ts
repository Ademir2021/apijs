import { DespesaDAO } from "../../Entities/ContaPagar/DespesaDAO";
import { IDespesa } from "../../Interfaces/ContaPagar/ContaPagar";


class DespesasDTO{

    async insert(Despesa:IDespesa){
        const res = await new DespesaDAO().insert(Despesa)
        return res
    };

    async update(Despesa:IDespesa){
        const res = await new DespesaDAO().update(Despesa)
        return res
    };
    
}

export { DespesasDTO }