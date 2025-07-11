import { Router } from "express"
import { SectorConttrollers } from "../Controllers/Sector/SectorControllers";

const routeSectors = Router();
const sectorconttrollers = new SectorConttrollers()

routeSectors.get('/sectors', sectorconttrollers.findAll)

export { routeSectors }