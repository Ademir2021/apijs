import { Router } from "express"
import { NFeControllers } from "../Controllers/NFe/NFeControllers";

const routeNFe = Router();
const nfeControllers = new NFeControllers()

routeNFe.get('/nfe', nfeControllers.handleNFe)
routeNFe.put('/gerar_nfe', nfeControllers.gerarNFe)
// routeNFe.post('/ceps', nfeControllers.findNFe)

export { routeNFe }