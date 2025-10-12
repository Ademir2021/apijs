import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";
import { Brand } from "../../Entities/Brand/Brand";
import { BrandsServices } from "../../Services/Brands/BrandsServices";

export type TBrand = {
    id_brand: number;
    name_brand: string;
};

class BrandsControllers extends DAO {
    async findAll(request: Request, response: Response) {
        const brands = await new BrandsControllers().select('brands', 'id_brand')
        response.json(brands)
    };

    async insert(request: Request, response: Response){
        const res:TBrand = <TBrand>request.body
        const brand = new Brand(res.id_brand, res.name_brand)
        const resp = await new BrandsServices().insert(brand)
        response.json(resp)
    }

    async update(request: Request, response: Response){
        const res:TBrand = <TBrand>request.body
        const brand = new Brand(res.id_brand, res.name_brand)
        const resp = await new BrandsServices().update(brand)
        response.json(resp)
    }
}

export { BrandsControllers }