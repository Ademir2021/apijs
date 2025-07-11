import { IValRecebido } from "../../Interfaces/ValRecebido/ValRecebido";
import { ValRecebidoDAO } from "./ValRecebidoDAO"

class ValRecebido extends ValRecebidoDAO implements IValRecebido {
    id_val = 0
    fk_conta = 0
    fk_venda = 0
    fk_user = 0
    valor = 0
    data_recebimento: Date;
    descricao = ''
    fk_person = 0
    constructor(
        id_val: number,
        fk_conta: number,
        fk_venda: number,
        fk_user: number,
        valor: number,
        data_recebimento: Date,
        descricao:string,
        fk_person:number
        ) {
        super()
        this.id_val = id_val
        this.fk_conta = fk_conta
        this.fk_venda = fk_venda
        this.fk_user = fk_user
        this.valor = valor
        this.data_recebimento = data_recebimento
        this.descricao = descricao
        this.fk_person = fk_person
    }
}
export { ValRecebido }