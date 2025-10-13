import { IFilial } from "../../Interfaces/Filial/Filial"
import { FilialDAO } from "./FilialDAO"

class Filial extends FilialDAO implements IFilial {
    fantasia = ''
    address = ''
    cnpj = ''
    inscric = ''
    phone = ''
    email = ''
    id_person = 0
    constructor(
        id: number,
        name: string,
        fantasia: string,
        address: string,
        cnpj: string,
        inscric: string,
        phone: string,
        email: string,
        id_person: number
    ) {
        super()
        this.id = id
        this.name = name
        this.fantasia = fantasia
        this.address = address
        this.cnpj = cnpj
        this.inscric = inscric
        this.phone = phone
        this.email = email
        this.id_person = id_person
    }
}

export { Filial }