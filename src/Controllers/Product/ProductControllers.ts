import { Request, Response } from "express"
import { IProduct, IListProductQuery } from "../../Interfaces/Product/Product"
import { Product } from "../../Entities/Product/Product"
import { ProductsServices } from "../../Services/Products/ProductsServices"
import { DAO } from "../../Entities/DAO/DAO"

type TProduct = {
    id_product: number
    descric_product: string
    val_max_product: number
    val_min_product: number
    fk_brand: number
    fk_sector: number
    fk_un_med: number
    bar_code: string
    image: string
    fk_classe: number
    fk_grupo_fiscal: number
    fk_tipo_prod: number
    ncm: string
}

class ProductControllers extends DAO {
    async saveProduct(request: Request, response: Response) {
        const resp: TProduct = <TProduct>request.body
        const product: Product = new Product(resp.id_product, resp.descric_product, resp.val_max_product,
            resp.val_min_product, resp.fk_brand, resp.fk_sector, resp.fk_un_med, resp.bar_code, resp.image,
            resp.fk_classe, resp.fk_grupo_fiscal, resp.fk_tipo_prod, resp.ncm)
        const res = await new ProductsServices().saveProduct(product)
        response.json(res)
    };
    async updateProduct(request: Request, response: Response) {
        const resp: TProduct = <TProduct>request.body
        const product: Product = new Product(resp.id_product, resp.descric_product, resp.val_max_product,
            resp.val_min_product, resp.fk_brand, resp.fk_sector, resp.fk_un_med, resp.bar_code, resp.image,
            resp.fk_classe, resp.fk_grupo_fiscal, resp.fk_tipo_prod, resp.ncm)
        const res = await new ProductsServices().updateProduct(product)
        response.json(res)
    };
    async listProducts(request: Request, response: Response) {
        const resp = await new ProductsServices().listProducts()
        response.json(resp)
    };
    async listProduct(request: Request, response: Response) {
        const { id }: IProduct = <IProduct>request.body
        const resp = await new ProductsServices().listProduct(id)
        response.json(resp)
    };
    async listProductParam(request: Request, response: Response) {
        const { id } = request.params
        response.json(id)
    };
    async listProductQuery(request: Request, response: Response) {
        const list: IListProductQuery | any = request.query
        const resp = await new ProductsServices().listProductQuery(list)
        response.json(resp)
    };
    async deleteProduct(request: Request, response: Response) {
        const { id }: IProduct = <IProduct>request.body
        const resp = await new ProductsServices().deleteProduct(id)
        response.json(resp)
    };
    async findAllUnMeds(request: Request, response: Response) {
        const uniMeds = await new ProductControllers().select('un_meds', 'id_un')
        response.json(uniMeds)
    };
}

export { ProductControllers }