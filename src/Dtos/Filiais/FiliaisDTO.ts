import { FilialDAO } from "../../Entities/Filial/FilialDAO";
import { IFilial } from "../../Interfaces/Filial/Filial";

class FiliaisDTO {
    async findAll() {
        const resp = await new FilialDAO().select(FilialDAO.table, 'id_filial')
        return resp
    }

    async insert(Filial: IFilial) {
        const resp = await new FilialDAO().insert(Filial)
        return resp
    }

    async update(Filial: IFilial) {
        const resp = await new FilialDAO().update(Filial)
        return resp
    }
}

export { FiliaisDTO }