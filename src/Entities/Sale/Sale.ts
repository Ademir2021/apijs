import { IItens, ISale } from "../../Interfaces/Sale/Sale";
import { IContaAreceber } from "../../Interfaces/ContaReceber/ContaReceber";
import { SaleDAO } from "./SaleDAO";

class Sale extends SaleDAO implements ISale {
    fk_person = 0
    disc_sale = 0
    fk_filial = 0
    fk_user = 0
    tNote = 0
    paySale = 0
    dinheiro = 0
    itens?: IItens[] = []
    contasReceber?: IContaAreceber[] = []
    constructor(
        fk_person: number,
        disc_sale: number,
        fk_filial: number, 
        fk_user: number,
        tNote:number,
        paySale:number,
        dinheiro:number,
        itens: IItens[],
        contasReceber: IContaAreceber[]) {
        super()
        this.fk_person = fk_person
        this.disc_sale = disc_sale
        this.fk_filial = fk_filial
        this.fk_user = fk_user
        this.tNote = tNote
        this.paySale = paySale
        this.dinheiro = dinheiro
        this.itens = itens
        this.contasReceber = contasReceber
    }
}

export { Sale }