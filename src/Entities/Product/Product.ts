import { IProduct, IBrand, ISector } from "../../Interfaces/Product/Product";
import { ProductDAO } from "./ProductDAO";

class Product extends ProductDAO implements IProduct {
    valMax = 0
    valMin = 0
    fkBrand = new Brand().id
    fkSector = new Sector().id
    fk_un_med = 1
    barCode = ""
    image = ""
    fk_classe = 1
    fk_grupo_fiscal = 1
    fk_tipo_prod = 1
    ncm = ''
    constructor(
        id:number,
        name:string,
        valMax:number,
        valMin:number,
        fkBrand:number,
        fkSector:number,
        fk_un_med:number,
        barCode:string,
        image:string,
        fk_classe:number,
        fk_grupo_fiscal:number,
        fk_tipo_prod:number,
        ncm:string
    ) {
        super()
        this.id = id
        this.name = name
        this.valMax = valMax
        this.valMin = valMin
        this.fkBrand = fkBrand
        this.fkSector = fkSector
        this.fk_un_med = fk_un_med
        this.barCode = barCode
        this.image = image
        this.fk_classe = fk_classe
        this.fk_grupo_fiscal = fk_grupo_fiscal
        this.fk_tipo_prod = fk_tipo_prod
        this.ncm = ncm
    }
}

class Brand extends ProductDAO implements IBrand {
    constructor() {
        super()
    }
    getId() {
        return this.id
    }
    setId(id: number) {
        this.id = id
    }
};

class Sector extends ProductDAO implements ISector {
    constructor() {
        super()
    }
    getId() {
        return this.id
    }
    setId(id: number) {
        this.id = id
    }
}

export { Product }