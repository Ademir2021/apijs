import { BrandsDTO } from "../../Dtos/Brands/BrandsDTO";
import { IBrand } from "../../Interfaces/Brand/Brand";

class BrandsServices {
    async insert(Brand: IBrand) {
        const resp = await new BrandsDTO().insert(Brand)
        return resp
    }

    async update(Brand: IBrand) {
        const resp = await new BrandsDTO().update(Brand)
        return resp
    }
}

export { BrandsServices }