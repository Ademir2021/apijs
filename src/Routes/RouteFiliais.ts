import { Router } from "express"
import { FilialControllers } from "../Controllers/Filial/FilialControllers";

const routeFiliais = Router();
const filialControllers = new FilialControllers()

routeFiliais.get('/filiais', filialControllers.findAll)
routeFiliais.post('/filial', filialControllers.insert)
routeFiliais.put('/filial', filialControllers.update)

export { routeFiliais }