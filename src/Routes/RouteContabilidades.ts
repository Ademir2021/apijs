import { Router } from "express"
import { ContabilidadeControllers } from "../Controllers/Contabilidade/ContabilidadeControllers"

const routeContabilidades = Router()
const contabilidadeControllers = new ContabilidadeControllers()

routeContabilidades.get('/classes_prods', contabilidadeControllers.findAllClassesProds);
routeContabilidades.post('/classe_prod', contabilidadeControllers.insertClasseProd);
routeContabilidades.put('/classe_prod', contabilidadeControllers.updateClasseProd);

routeContabilidades.get('/tipos_prods', contabilidadeControllers.findAllTiposProds)
routeContabilidades.get('/grupos_fiscais', contabilidadeControllers.findAllGruposFiscais)

export {routeContabilidades}