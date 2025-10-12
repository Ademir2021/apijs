import { BrandDAO } from "../../Entities/Brand/BrandDAO";
import { IBrand } from "../../Interfaces/Brand/Brand";

class BrandsDTO {
    async insert (Brand:IBrand){
        const resp = await new BrandDAO().insert(Brand)
        return resp
    }

    async update (Brand:IBrand){
        const resp = await new BrandDAO().update(Brand)
        return resp
    }
}

export { BrandsDTO } 