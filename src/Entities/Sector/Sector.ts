import { ISector } from "../../Interfaces/Sector/Sector";
import { SectorDAO } from "./SectorDAO";

class Sector extends SectorDAO implements ISector {
    constructor(
        id: number,
        name: string
    ) {
        super()
        this.id = id
        this.name = name
    }
}

export { Sector }