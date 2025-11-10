import { ISetorDespesa, ITipoSetor } from "../../Interfaces/ContaPagar/ContaPagar";
import { SetorDespesaDAO } from "./SetorDespesaDAO";

class SetorDespesa extends SetorDespesaDAO implements ISetorDespesa {
    tipo: ITipoSetor | '';
    constructor(id: number, name: string, tipo: ITipoSetor | '') {
        super()
        this.id = id
        this.name = name
        this.tipo = tipo
    }
}

export { SetorDespesa }