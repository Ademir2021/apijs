import { ContasAReceberDTO } from "../../Dtos/ContasAReceber/ContasAReceberDTO";
import { IContaAreceber } from "../../Interfaces/ContaReceber/ContaReceber";

class ContasAReceberServices{
   async insert(contaReceber:IContaAreceber){
      const resp = await new ContasAReceberDTO().insert(contaReceber)
      return resp;
   };
   async update(contaReceber:IContaAreceber){
      const resp = await new ContasAReceberDTO().update(contaReceber)
      return resp;
   };
   async listContasAReceberByLoggedInUser(id: number, privilege: number){
        const resp = await new ContasAReceberDTO().listContasAReceberByLoggedInUser(id, privilege)
        return resp;
   };
}
export { ContasAReceberServices }