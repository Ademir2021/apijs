import { ISale } from "../../Interfaces/Sale/Sale"
import { SalesDTO } from "../../Dtos/Sales/SalesDTO"

class SalesServices {
    async registerSale(Sale: ISale) {
        const resp = await new SalesDTO().registerSale(Sale)
        return resp
    };
    async listSalesByLoggedInUser(id: number, privilege: number) {
        const resp = await new SalesDTO().listSalesByLoggedInUser(id, privilege)
        return resp
    };
    async findSales() {
        const resp = await new SalesDTO().findSales()
        return resp
    };
}

export { SalesServices }