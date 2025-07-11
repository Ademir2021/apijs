import { Router } from "express"
import { DespesaControllers } from "../Controllers/Despesa/DespesasControllers";

const routeDespesas = Router();
const despesaControllers = new DespesaControllers()
routeDespesas.get('/despesas', despesaControllers.findAll)

export { routeDespesas }