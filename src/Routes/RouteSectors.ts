import { Router } from "express"
import { SectorConttrollers } from "../Controllers/Sector/SectorControllers";

const routeSectors = Router();
const Sectorconttrollers = new SectorConttrollers()

routeSectors.get('/sectors', Sectorconttrollers.findAll)

export { routeSectors }