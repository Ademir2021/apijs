import { Router } from "express"
import { ValRecebidoControllers } from "../Controllers/ValRecebido/ValRecebidoControllers"
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated"

const routerValsRecebidos = Router()
const valRecebidoControllers = new ValRecebidoControllers()

routerValsRecebidos.post('/val_recebido', valRecebidoControllers.registerValRecebido)
routerValsRecebidos.post('/vals_recebidos_list', ensureAuthenticated, valRecebidoControllers.findAllList)

export { routerValsRecebidos }