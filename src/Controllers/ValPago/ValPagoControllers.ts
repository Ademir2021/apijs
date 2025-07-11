import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";
import { IValPago } from "../../Interfaces/ValPago/ValPago";
import { ValPago } from "../../Entities/ValPago/ValPago";
import { ValsPagosDTO } from "../../Dtos/ValsPagos/ValsPagosDTO"
import { IUser } from "../../Interfaces/User/User";
import { ValsPagosService } from "../../Services/ValsPagos/ValsPagos";

class ValPagoControllers extends DAO{
    async registerValPago(request: Request, response: Response) {
        const resp: IValPago = <IValPago>request.body
        const valPago = new ValPago(
            resp.id_val, resp.fk_conta, resp.fk_compra, resp.fk_user,
            resp.valor, resp.data_recebimento, resp.descricao, resp.fk_person, resp.fk_despesa)
        const res = await new ValsPagosService().registerValsPagos(valPago)
        return response.json(res)
    };
    async findAllList(request: Request, response: Response) {
        const { id, privilege }: IUser = <IUser>request.body[0]
        const vals = await new ValsPagosDTO().listValsPagosByLoggedInUser(id, privilege)
        response.json(vals)
    };
}

export { ValPagoControllers }