import {IProduct, IListProductQuery } from "../../Interfaces/Product/Product";
import { ProductsDTO } from "../../Dtos/Products/ProductsDTO";
import { ProductDAO } from "../../Entities/Product/ProductDAO";

class ProductsServices {
    async saveProduct(Product:IProduct){
        const resp = await new ProductsDTO().saveProduct(Product)
        return resp
    };
    async updateProduct(Product:IProduct){
        const resp = await new ProductsDTO().updateProduct(Product)
        return resp
    };
    async listProducts(){
        const resp = await new ProductsDTO().listProducts()
        return resp
    };
    async listProduct(id:number){
        const resp = await new ProductsDTO().listProduct(id)
        return resp
    }
    async listProductQuery(list:IListProductQuery) {
        const resp:ProductDAO = await new ProductsDTO().listProductQuery(list)
        return resp
    };
    async deleteProduct(id:number){
        const resp = await new ProductsDTO().deleteProduct(id)
        return resp
    }
}
export { ProductsServices }