import { Router } from "express"
import { CityControllers } from "../Controllers/City/CityControllers";

const routeCities = Router();
const cityControllers = new CityControllers()

routeCities.get('/on_city/:id', cityControllers.selectOnCity)
routeCities.get('/cities', cityControllers.select)

export { routeCities }