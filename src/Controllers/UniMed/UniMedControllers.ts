import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";

class UniMedControllers extends DAO {
    async findAll(request: Request, response: Response) {
        const uniMeds = await new UniMedControllers().select('un_meds', 'id_un')
        response.json(uniMeds)
    };
}

export { UniMedControllers }