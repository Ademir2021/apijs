import { Router } from "express"
import { ValPagoControllers } from "../Controllers/ValPago/ValPagoControllers"
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated"

const routerValsPago = Router()
const valPagoControllers = new ValPagoControllers()

routerValsPago.post('/val_pago', valPagoControllers.registerValPago)
routerValsPago.post('/vals_pagos_list', ensureAuthenticated, valPagoControllers.findAllList)

export { routerValsPago }