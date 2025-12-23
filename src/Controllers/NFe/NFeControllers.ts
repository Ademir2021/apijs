import { Request, Response } from "express"
import { NFe } from "../../Entities/NFe/NFe";
import { INFe, TNFe } from "../../Interfaces/NFe/NFe";
import { NFeServices } from "../../Services/NFe/NFeServices";

const nfe: TNFe = {
    id_sale: 0,
    fk_name_filial: 0,
    fk_name_user: 0,
    fk_name_pers: 0,
    items: [],
    val_rec: 0,
    disc_sale: 0,
    total_sale: 0
};

const nfeServices = new NFeServices()

class NFeControllers {
    async handleNFe(request: Request, response: Response) {
        const note:INFe = new NFe(
            nfe.id_sale,
            nfe.fk_name_filial,
            nfe.fk_name_user,
            nfe.fk_name_pers,
            [],
            nfe.val_rec,
            nfe.disc_sale,
            nfe.total_sale
        )
        const res:INFe = await nfeServices.handleNota(note)
        response.json(res)
    }

    async gerarNFe(request: Request, response: Response) {
        const res:TNFe = <TNFe>request.body
        const note:INFe = new NFe(
            res.id_sale,
            res.fk_name_filial,
            res.fk_name_user,
            res.fk_name_pers,
            [],
            res.val_rec,
            res.disc_sale,
            res.total_sale
        )
        const resp:INFe = await nfeServices.handleNota(note)
        response.json(resp)
    }  
}

export { NFeControllers }