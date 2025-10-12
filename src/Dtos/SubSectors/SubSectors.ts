import { SubSectorDAO } from "../../Entities/SubSector/SubSectorDAO";
import { ISubSector } from "../../Interfaces/SubSector/SubSector";

class SubSectorsDTO {
    async insert (SubSector:ISubSector){
        const resp = await new SubSectorDAO().insert(SubSector)
        return resp
    }

    async update (SubSector:ISubSector){
        const resp = await new SubSectorDAO().update(SubSector)
        return resp
    }
}

export { SubSectorsDTO }