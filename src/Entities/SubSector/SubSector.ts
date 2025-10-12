import { ISubSector } from "../../Interfaces/SubSector/SubSector";
import { SubSectorDAO } from "./SubSectorDAO";

class SubSector extends SubSectorDAO implements ISubSector{
    description: string;
    id_sector: number; //fk_sector
    constructor(id:number, name:string, description:string, id_sector:number){
        super()
        this.id = id
        this.name = name
        this.description = description
        this.id_sector=id_sector
    }

}

export { SubSector }