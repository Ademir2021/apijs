import { Router } from "express"
import { BrandsControllers } from "../Controllers/Brand/BrandControllers";

const routeBrands = Router();
const brandsControllers = new BrandsControllers()

routeBrands.get('/brands', brandsControllers.findAll)

export { routeBrands }