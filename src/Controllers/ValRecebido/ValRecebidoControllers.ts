import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";
import { ValRecebido } from "../../Entities/ValRecebido/ValRecebido";
import { ValRecebidoDAO } from "../../Entities/ValRecebido/ValRecebidoDAO";
import { IValRecebido } from "../../Interfaces/ValRecebido/ValRecebido";
import { IUser } from "../../Interfaces/User/User";
import { ValsRecebidosDTO } from "../../Dtos/ValsRecebidos/ValsRecebidosDTO";

class ValRecebidoControllers extends DAO {
    async registerValRecebido(request: Request, response: Response) {
        const resp: IValRecebido = <IValRecebido>request.body
        const valRecebido = new ValRecebido(
            resp.id_val, resp.fk_conta, resp.fk_venda, resp.fk_user,
            resp.valor, resp.data_recebimento, resp.descricao, resp.fk_person)
        const registerVal = await new ValRecebidoDAO().insert(valRecebido)
        return response.json(registerVal)
    };
    async findAllList(request: Request, response: Response) {
        const { id, privilege }: IUser = <IUser>request.body[0]
        const vals = await new ValsRecebidosDTO().listValsRecebidosByLoggedInUser(id, privilege)
        response.json(vals)
    };
}

export { ValRecebidoControllers }