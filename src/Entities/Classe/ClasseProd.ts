import { IClasse } from "../../Interfaces/Classe/Classe";
import { ClasseProdDAO } from "./ClasseProdDAO";

class ClasseProd extends ClasseProdDAO implements IClasse {
    constructor(id: number, name: string) {
        super()
        this.id = id
        this.name = name
    }
}

export { ClasseProd }