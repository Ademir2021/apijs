import { Router } from "express"
import { DespesaControllers } from "../Controllers/Despesa/DespesasControllers";

const routeDespesas = Router();
const despesaControllers = new DespesaControllers()
routeDespesas.post('/despesa', despesaControllers.insert)
routeDespesas.put('/despesa', despesaControllers.update)
routeDespesas.get('/despesas', despesaControllers.findAll)
routeDespesas.get('/setor_despesas', despesaControllers.findAllSetorDespesas)
routeDespesas.post('/setor_despesa', despesaControllers.insertSetorDespesa)
routeDespesas.put('/setor_despesa', despesaControllers.updateSetorDespesa)

export { routeDespesas }