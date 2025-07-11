import { Router } from "express"
import { NotaRecebidaControllers } from "../Controllers/NotaRecebida/NotaRecebidaControllers";

const routeNotaRecebidas = Router();
const notaRecebidaControllers = new NotaRecebidaControllers()
routeNotaRecebidas.post('/registrar_nota_recebida', notaRecebidaControllers.registerNotaRecebida)

export { routeNotaRecebidas }