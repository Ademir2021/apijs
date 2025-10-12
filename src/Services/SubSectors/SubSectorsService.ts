import { SubSectorsDTO } from "../../Dtos/SubSectors/SubSectors";
import { ISubSector } from "../../Interfaces/SubSector/SubSector";

class SubSectorsServices {
    async insert(SubSector: ISubSector) {
        const resp = await new SubSectorsDTO().insert(SubSector)
        return resp
    }

    async update(SubSector: ISubSector) {
        const resp = await new SubSectorsDTO().update(SubSector)
        return resp
    }
}

export { SubSectorsServices }