import { SectorDAO } from "../../Entities/Sector/SectorDAO";
import { ISector } from "../../Interfaces/Sector/Sector";

class SectorsDTO {
    async insert(Sector: ISector) {
        const resp = await new SectorDAO().insert(Sector)
        return resp
    }
    
    async update(Sector: ISector) {
        const resp = await new SectorDAO().update(Sector)
        return resp
    }
}

export { SectorsDTO }