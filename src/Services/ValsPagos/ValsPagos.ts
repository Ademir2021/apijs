import { ValsPagosDTO } from "../../Dtos/ValsPagos/ValsPagosDTO";
import { IValPago } from "../../Interfaces/ValPago/ValPago";

class ValsPagosService {
   async registerValsPagos(ValPago:IValPago){
    const resp = await new ValsPagosDTO().registerValsPagos(ValPago)
    return resp
   };
}

export { ValsPagosService }