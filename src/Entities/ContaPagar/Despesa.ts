import { IDespesa } from "../../Interfaces/ContaPagar/ContaPagar";
import { DespesaDAO } from "./DespesaDAO";

class Despesa extends DespesaDAO implements IDespesa {
    fk_setor = 0;
    constructor(id: number, name: string, fk_setor: number) {
        super()
        this.id = id
        this.name = name
        this.fk_setor = fk_setor
    }
}

export { Despesa }