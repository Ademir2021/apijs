import { ContaReceberDAO } from "../../Entities/ContaReceber/ContaReceberDAO";
import { IContaAreceber } from "../../Interfaces/ContaReceber/ContaReceber";

const table = ContaReceberDAO.table

class ContasAReceberDTO {
    private async findContasAReceberByLoggedInUser(id: number) { // Cliente
        const contas = await new ContaReceberDAO().selectOne(table, id, "fk_user")
        return (contas)
    };
    private async findContasAReceberAdmin() { // Admin Privilege == 2
        const contas = await new ContaReceberDAO().select(table, "vencimento")
        return (contas)
    };
    async insert(contaReceber:IContaAreceber){
        const resp = new ContaReceberDAO().insert(contaReceber)
        return resp;
    };
    async update(contaReceber:IContaAreceber){
        const resp = new ContaReceberDAO().update(contaReceber)
        return resp
    };
    async listContasAReceberByLoggedInUser(id: number, privilege: number) {
        if (privilege == 2) {
            const contas = await this.findContasAReceberAdmin()
            return contas
        } else {
            const contas = await this.findContasAReceberByLoggedInUser(id)
            return contas
        }
    };
}
export { ContasAReceberDTO }