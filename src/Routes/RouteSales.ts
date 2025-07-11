import {Router} from "express"
import { SaleControllers } from "../Controllers/Sale/SaleControllers"
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated"

const routerSales =  Router()
const saleControllers = new SaleControllers()

routerSales.post('/sale_register', saleControllers.registerSale)
routerSales.post('/sale_user', ensureAuthenticated, saleControllers.findUserSale)
routerSales.post('/sales_list', saleControllers.findSales)

export { routerSales }