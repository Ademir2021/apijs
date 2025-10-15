import { ClasseProdDAO } from "../../Entities/Classe/ClasseProdDAO";
import { IClasse } from "../../Interfaces/Classe/Classe";

class ClassesProdsDTO {
    async insert(ClasseProd: IClasse) {
        const resp = await new ClasseProdDAO().insert(ClasseProd)
        return resp
    }

    async update(ClassProd: IClasse) {
        const resp = await new ClasseProdDAO().update(ClassProd)
        return resp
    }
}

export { ClassesProdsDTO }