import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";
import { ClasseProd } from "../../Entities/Classe/ClasseProd";
import { ClassesProdsServices } from "../../Services/ClassesProds/ClassesProdsServices";

type TClasseProd = {
    id_classe: number;
    name_classe: string;
};

class ContabilidadeControllers extends DAO {


    async findAllClassesProds(request: Request, response: Response) {
        const classesProds = await new ContabilidadeControllers().select('classes_prods', 'id_classe')
        response.json(classesProds)
    };

    async insertClasseProd(request: Request, response: Response) {
        const res: TClasseProd = <TClasseProd>request.body
        const classeProd = new ClasseProd(res.id_classe, res.name_classe)
        const resp = await new ClassesProdsServices().insert(classeProd)
        response.json(resp)
    }

    async updateClasseProd(request: Request, response: Response) {
        const res: TClasseProd = <TClasseProd>request.body
        const classeProd = new ClasseProd(res.id_classe, res.name_classe)
        const resp = await new ClassesProdsServices().update(classeProd)
        response.json(resp)
    }

    async findAllTiposProds(request: Request, response: Response) {
        const tiposProds = await new ContabilidadeControllers().select('tipos_prods', 'id_tipo')
        response.json(tiposProds)
    };
    async findAllGruposFiscais(request: Request, response: Response) {
        const gruposFiscais = await new ContabilidadeControllers().select('grupos_fiscais', 'id_grupo_fiscal')
        response.json(gruposFiscais)
    };
};

export { ContabilidadeControllers }