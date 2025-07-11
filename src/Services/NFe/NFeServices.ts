import { NFeDTO } from "../../Dtos/NFe/NFeDTO";
import { INFe } from "../../Interfaces/NFe/NFe";

class NFeServices {
    async handleNota(NFe: INFe) {
        const res = await new NFeDTO().handleNota(NFe)
        return (res)
    }
}

export { NFeServices }