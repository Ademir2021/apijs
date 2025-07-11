import { IValPago } from "../../Interfaces/ValPago/ValPago";
import { ValPagoDAO } from "./ValPagoDAO"

class ValPago extends ValPagoDAO implements IValPago {
    id_val = 0
    fk_conta = 0
    fk_compra = 0
    fk_user = 0
    valor = 0
    data_recebimento: Date
    descricao =''
    fk_person = 0
    fk_despesa = 0
    constructor(
        id_val: number,
        fk_conta: number,
        fk_compra: number,
        fk_user: number,
        valor: number,
        data_recebimento: Date,
        descricao: string,
        fk_person: number,
        fk_despesa:number
    ) {
        super()
        this.id_val = id_val
        this.fk_conta = fk_conta
        this.fk_compra = fk_compra
        this.fk_user = fk_user
        this.valor = valor
        this.data_recebimento = data_recebimento
        this.descricao = descricao
        this.fk_person = fk_person
        this.fk_despesa = fk_despesa
    }
}

export { ValPago }