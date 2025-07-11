import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";

class ContabilidadeControllers extends DAO {
    async findAllClassesProds(request: Request, response: Response) {
        const classesProds = await new ContabilidadeControllers().select('classes_prods', 'id_classe')
        response.json(classesProds)
    };
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