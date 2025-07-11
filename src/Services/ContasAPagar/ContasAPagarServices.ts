import { ContasAPagarDTO } from "../../Dtos/ContasAPagar/ContasAPagarDTO";
import { IContaAPagar } from "../../Interfaces/ContaPagar/ContaPagar";

class ContasAPagarServices {
    async insert(contaPagar:IContaAPagar){
        const res = new ContasAPagarDTO().insert(contaPagar)
        return res;
    };
    async update(contaPagar:IContaAPagar){
        const res = new ContasAPagarDTO().update(contaPagar)
        return res
    };
    async listContasAPagarByLoggedInUser(id: number, privilege: number){
        const res = new ContasAPagarDTO().listContasAPagarByLoggedInUser(id, privilege)
        return res
    };
}
export { ContasAPagarServices }