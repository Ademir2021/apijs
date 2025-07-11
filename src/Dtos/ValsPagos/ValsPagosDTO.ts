import { ValPagoDAO } from "../../Entities/ValPago/ValPagoDAO";
import { IValPago } from "../../Interfaces/ValPago/ValPago";

const table = ValPagoDAO.table

class ValsPagosDTO{
    private async findValsPagosByLoggedInUser(id: number) { // Cliente
        const vals = await new ValPagoDAO().selectOne(table, id, "fk_user")
        return (vals)
    };
    private async findValsPagosAdmin() { // Admin Privilege == 2
        const vals = await new ValPagoDAO().selectLimit(table, "id_val")
        return (vals)
    };
    async listValsPagosByLoggedInUser(id: number, privilege: number) {
        if (privilege == 2) {
            const vals = await this.findValsPagosAdmin()
            return vals
        } else {
            const vals = await this.findValsPagosByLoggedInUser(id)
            return vals
        }
    };
    async registerValsPagos(ValPago:IValPago){
        const resp = await new ValPagoDAO().insert(ValPago)
        return resp
    };
}

export { ValsPagosDTO }