import { ContaPagarDAO } from "../../Entities/ContaPagar/ContaPagarDAO";
import { IContaAPagar } from "../../Interfaces/ContaPagar/ContaPagar";

const table = ContaPagarDAO.table

class ContasAPagarDTO {
    private async findContasAPagarByLoggedInUser(id: number) { // Cliente
        const contas = await new ContaPagarDAO().selectOne(table, id, "fk_user")
        return (contas)
    };
    private async findContasAPagarAdmin() { // Admin Privilege == 2
        const contas = await new ContaPagarDAO().select(table, "vencimento")
        return (contas)
    };
    async insert(contaPagar:IContaAPagar){
        const res = new ContaPagarDAO().insert(contaPagar)
        return res;
    };
    async update(contaPagar:IContaAPagar){
        const res = new ContaPagarDAO().update(contaPagar)
        return res;
    };
    async listContasAPagarByLoggedInUser(id: number, privilege: number) {
        if (privilege == 2) {
            const contas = await this.findContasAPagarAdmin()
            return contas
        } else {
            const contas = await this.findContasAPagarByLoggedInUser(id)
            return contas
        }
    };
}
export { ContasAPagarDTO }