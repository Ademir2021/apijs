import { Router } from "express"
import { ContasPagarControllers } from "../Controllers/ContasPagar/ContasPagarControllers"
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const routeContasPagar = Router()
const contasPagarControllers = new ContasPagarControllers()

routeContasPagar.post('/contas_pagar_list', ensureAuthenticated, contasPagarControllers.findAllContasPagarList);
routeContasPagar.put('/contas_pagar', contasPagarControllers.updateContasPagar);
routeContasPagar.post('/contas_pagar', contasPagarControllers.saveContasPagar);
export {routeContasPagar}