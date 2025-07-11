import { Router } from "express"
import { UniMedControllers } from "../Controllers/UniMed/UniMedControllers";

const routeUniMeds = Router();
const uniMedControllers = new UniMedControllers()

routeUniMeds.get('/un_meds', uniMedControllers.findAll)

export { routeUniMeds }