export type IProduct = {
    id:number
    name:string
    valMax:number
    valMin:number
    fkBrand:number
    fkSubSector:number
    fk_un_med: number
    barCode:string
    image:string
    fk_classe: number
    fk_grupo_fiscal: number
    fk_tipo_prod:number
    ncm:string
}

export type IBrand = {
    id:number
    name:string
}

export type ISubSector = {
    id:number
    name:string
    description?:string
}

export type IListProductQuery = {
    id_product:number
    descric_product: string
    fk_brand:number
    fk_sub_sector:number
}