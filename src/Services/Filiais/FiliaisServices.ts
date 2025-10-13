import { FiliaisDTO } from "../../Dtos/Filiais/FiliaisDTO";
import { IFilial } from "../../Interfaces/Filial/Filial";

class FiliaisServices {
    async findAll() {
        const resp = await new FiliaisDTO().findAll()
        return resp
    }

    async insert(Filial: IFilial) {
        const resp = await new FiliaisDTO().insert(Filial)
        return resp
    }

    async update(Filial: IFilial) {
        const resp = await new FiliaisDTO().update(Filial)
        return resp
    }
}

export { FiliaisServices }