import { INFe } from "../../Interfaces/NFe/NFe";
import { IProduct } from "../../Interfaces/Product/Product";
import { NFeDAO } from "./NFeDAO";

class NFe extends NFeDAO implements INFe {
    id_nota = 0
    fk_name_filial = 0
    fk_name_user = 0
    fk_name_pers = 0
    items: IProduct[] = []
    val_rec = 0
    disc_sale = 0
    total_sale = 0
    constructor(
        id_nota: number,
        fk_name_filial: number,
        fk_name_user: number,
        fk_name_pers:number,
        items: IProduct[],
        val_rec: number,
        disc_sale: number,
        total_sale: number
    ) {
        super()
        this.id_nota = id_nota
        this.fk_name_filial = fk_name_filial
        this.fk_name_user = fk_name_user
        this.fk_name_pers = fk_name_pers
        this.items = items
        this.val_rec = val_rec
        this.disc_sale = disc_sale
        this.total_sale = total_sale
    }
}
export { NFe }