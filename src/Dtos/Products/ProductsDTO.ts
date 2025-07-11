import { IProduct, IListProductQuery } from "../../Interfaces/Product/Product";
import { ProductDAO } from "../../Entities/Product/ProductDAO";

const table = ProductDAO.table
const msgNameAlreadyExists = 'Produto já existe'
const msgBarCodeAlreadyExists = "Còdigo de barras pertence a outro produto"
const msgRecordSucess = 'Produto gravado com sucesso'
const msgProductNotFound = 'Produto não localiado'
const msgProductUpdatedSuccessfully = 'Produto atualizado com sucesso'

class ProductsDTO {
    private async findProduct(Product: IProduct) {
        const product = await new ProductDAO().selectHandle(table, 'id_product', Product.id)
        return product
    };
    private async findProductName(Product: IProduct) {
        const product = await new ProductDAO().selectHandle(table, 'descric_product', Product.name)
        return product
    };

    private async findProductBarCode(Product: IProduct) {
        const product = await new ProductDAO().selectHandle(table, 'bar_code', Product.barCode)
        return product
    };
    async saveProduct(Product: IProduct) {
        const productBarCode = await this.findProductBarCode(Product)
        if (!productBarCode[0]) {
            const productName = await this.findProductName(Product)
            if (productName[0]) {
                return (msgNameAlreadyExists)
            } else {
                const product = await new ProductDAO().insert(Product)
                return (msgRecordSucess)
            }
        } else {
            return (msgBarCodeAlreadyExists)
        }
    };
    public async updateProduct(Product: IProduct) {
        const product: any = await this.findProduct(Product)
        if (product[0].id_product === Product.id) {
            const personUpdate = await new ProductDAO().update(Product)
            if (personUpdate) {
                return personUpdate
            } else {
                return (msgProductUpdatedSuccessfully)
            }
        } else {
            return (msgProductNotFound)
        }
    };
    async listProducts() {
        const resp = await new ProductDAO().select(table, 'id_product')
        return resp
    };
    async listProduct(id: number) {
        const resp = await new ProductDAO().selectOne(table, id, 'id_product')
        return resp
    };
    async listProductQuery(list: IListProductQuery) {
        const resp: ProductDAO = await new ProductDAO().selectQuery(list)
        return resp
    };
    async deleteProduct(id: number) {
        const resp = await new ProductDAO().delete(table, id, 'id_product')
        return resp
    }
}

export { ProductsDTO }