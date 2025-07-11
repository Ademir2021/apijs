import { Request, Response } from "express"
import { TSale } from "../../Interfaces/Sale/Sale"
import { IUser } from "../../Interfaces/User/User"
import { Sale } from "../../Entities/Sale/Sale"
import { SalesServices } from "../../Services/Sales/SalesServices"

class SaleControllers {
  async registerSale(request: Request, response: Response) {
    const sale_: TSale = <TSale>request.body
    const sale: Sale = new Sale(sale_.person.fk_name_pers, sale_.disc_sale,
      sale_.filial, sale_.user.user_id, sale_.tItens, sale_.paySale,
      sale_.dinheiro, sale_.itens, sale_.duplicatas)
    const resp = await new SalesServices().registerSale(sale)
    response.json([resp])
  };
  async findUserSale(request: Request, response: Response) {
    const { id, privilege }: IUser = <IUser>request.body[0]
    const resp = await new SalesServices().listSalesByLoggedInUser(id, privilege)
    response.json(resp)
  };
  async findSales(request: Request, response: Response) {
    const resp = await new SalesServices().findSales()
    response.json(resp)
  };
}

export { SaleControllers }