import { Router } from "express"
import { PagSeguroControllers } from "../Controllers/PagSeguro/PagSeguroControllers";

const routePagSeguro = Router();
const pagSeguroControllers = new PagSeguroControllers()

routePagSeguro.post('/pix', pagSeguroControllers.insertPix)
routePagSeguro.post('/boleto', pagSeguroControllers.insertBoleto)
routePagSeguro.post('/card', pagSeguroControllers.insertCard)
routePagSeguro.get('/publickey', pagSeguroControllers.publicKeyPagSeguro)

export { routePagSeguro }