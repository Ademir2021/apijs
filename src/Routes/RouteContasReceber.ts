import { Router } from "express"
import { ContasReceberControllers } from "../Controllers/ContasReceber/ContasReceberControllers"
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const routeContasReceber = Router()
const contasReceberControllers = new ContasReceberControllers()

routeContasReceber.post('/contas_receber_list', ensureAuthenticated, contasReceberControllers.findAllContasReceberlist);
routeContasReceber.put('/contas_receber', contasReceberControllers.updateContasReceber);
routeContasReceber.post('/contas_receber', contasReceberControllers.saveContasReceber);
export {routeContasReceber}