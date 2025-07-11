import { Request, Response } from "express"
import { NFe } from "../../Entities/NFe/NFe";
import { INFe, TNFe } from "../../Interfaces/NFe/NFe";
import { NFeServices } from "../../Services/NFe/NFeServices";

const nfe: TNFe = {
    id_sale: 10,
    fk_name_filial: 1,
    fk_name_user: 1,
    fk_name_pers: 6,
    items: [],
    val_rec: 100.00,
    disc_sale: 2.20,
    total_sale: 97.80
};

class NFeControllers {
    async handleNFe(request: Request, response: Response) {
        const res = new NFe(
            nfe.id_sale,
            nfe.fk_name_filial,
            nfe.fk_name_user,
            nfe.fk_name_pers,
            [],
            nfe.val_rec,
            nfe.disc_sale,
            nfe.total_sale
        )
        const resp:INFe = await new NFeServices().handleNota(res)
        // console.log(resp)
        return response.json(resp)
    }

    async gerarNFe(request: Request, response: Response) {
        const res:TNFe = <TNFe>request.body
        const resp = new NFe(
            res.id_sale,
            res.fk_name_filial,
            res.fk_name_user,
            res.fk_name_pers,
            [],
            res.val_rec,
            res.disc_sale,
            res.total_sale
        )
        const resp_:INFe = await new NFeServices().handleNota(resp)
        return response.json(resp_)
    }  
}

export { NFeControllers }