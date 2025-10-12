import { IBrand } from "../../Interfaces/Brand/Brand";
import { BrandDAO } from "./BrandDAO";

class Brand extends BrandDAO implements IBrand {
    constructor(id:number, name:string){
        super()
        this.id = id
        this.name = name
    }
}

export { Brand }