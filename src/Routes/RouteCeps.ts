import { Router } from "express"
import { CepControllers } from "../Controllers/Cep/CepControllers";

const routeCeps = Router();
const cepControllers = new CepControllers()

routeCeps.get('/ceps', cepControllers.select)
routeCeps.post('/ceps', cepControllers.insert)

export { routeCeps }