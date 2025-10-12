import { Router } from "express"
import { SubSectorConttrollers } from "../Controllers/SubSector/SubSectorControllers";

const routeSubSectors = Router();
const subSectorconttrollers = new SubSectorConttrollers()

routeSubSectors.get('/sub_sectors', subSectorconttrollers.findAll)
routeSubSectors.post('/sub_sector', subSectorconttrollers.insert)
routeSubSectors.put('/sub_sector', subSectorconttrollers.update)

export { routeSubSectors }