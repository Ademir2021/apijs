import { Request, Response } from "express"
import { FiliaisServices } from "../../Services/Filiais/FiliaisServices"
import { TFilial } from "../../Interfaces/Filial/Filial"
import { Filial } from "../../Entities/Filial/Filial"

class FilialControllers {

    async findAll(request: Request, response: Response) {
        const resp = await new FiliaisServices().findAll()
        response.json(resp)
    }

    async insert(request: Request, response: Response) {
        const res: TFilial = <TFilial>request.body
        const filial = new Filial(res.id_filial, res.name_filial, res.fantasia, res.address, res.cnpj, res.inscric, res.phone, res.email, res.fk_person)
        const resp = await new FiliaisServices().insert(filial)
        response.json(resp)

    }

    async update(request: Request, response: Response) {
        const res: TFilial = <TFilial>request.body
        const filial = new Filial(res.id_filial, res.name_filial, res.fantasia, res.address, res.cnpj, res.inscric, res.phone, res.email, res.fk_person)
        const resp = await new FiliaisServices().update(filial)
        response.json(resp)
    }
}

export { FilialControllers }