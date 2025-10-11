import { SectorsDTO } from "../../Dtos/Sectors/SectorsDTO";
import { ISector } from "../../Interfaces/Sector/Sector";

class SectorsServices {
    async insert(Sector: ISector) {
        const resp = await new SectorsDTO().insert(Sector)
        return resp
    }

    async update(Sector: ISector) {
        const resp = await new SectorsDTO().update(Sector)
        return resp
    }
}

export { SectorsServices }