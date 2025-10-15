import { ClassesProdsDTO } from "../../Dtos/ClassesProds/ClassesProdsDTO";
import { IClasse } from "../../Interfaces/Classe/Classe";

class ClassesProdsServices {
    async insert(ClasseProd: IClasse) {
        const resp = await new ClassesProdsDTO().insert(ClasseProd)
        return resp
    }

    async update(ClasseProd: IClasse) {
        const resp = await new ClassesProdsDTO().update(ClasseProd)
        return resp
    }
}

export { ClassesProdsServices }