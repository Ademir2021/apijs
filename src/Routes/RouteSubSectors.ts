import { Router } from "express"
import { SubSectorConttrollers } from "../Controllers/SubSector/SubSectorControllers";

const routeSubSectors = Router();
const subSectorconttrollers = new SubSectorConttrollers()

routeSubSectors.get('/sub_sectors', subSectorconttrollers.findAll)

export { routeSubSectors }