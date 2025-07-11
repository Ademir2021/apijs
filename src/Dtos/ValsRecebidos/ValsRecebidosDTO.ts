import { ValRecebidoDAO } from "../../Entities/ValRecebido/ValRecebidoDAO";

const table = ValRecebidoDAO.table

class ValsRecebidosDTO{
    private async findValsRecebidosByLoggedInUser(id: number) { // Cliente
        const vals = await new ValRecebidoDAO().selectOne(table, id, "fk_user")
        return (vals)
    };
    private async findValsRecebidosAdmin() { // Admin Privilege == 2
        const vals = await new ValRecebidoDAO().selectLimit(table, "id_val")
        return (vals)
    };
    async listValsRecebidosByLoggedInUser(id: number, privilege: number) {
        if (privilege == 2) {
            const vals = await this.findValsRecebidosAdmin()
            return vals
        } else {
            const vals = await this.findValsRecebidosByLoggedInUser(id)
            return vals
        }
    };
}

export { ValsRecebidosDTO }