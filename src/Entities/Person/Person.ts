import { IPerson } from "../../Interfaces/Person/Person";
import { PersonDAO } from "./PersonDAO";

class Person extends PersonDAO implements IPerson {
    cpf_pers = '0'
    phone_pers = ''
    address_pers = ''
    num_address = '0'
    bairro_pers = ''
    fk_cep = 0
    fk_name_filial = 0
    fk_id_user = 0
    rg = '0'
    cnpj = '0'
    inscricao = '0'
    fantasia = '0'
    limit_cred = 0
    fk_grupo = 0
    constructor(
        id: number,
        name: string,
        cpf_pers: string,
        phone_pers: string,
        address_pers: string,
        num_address: string,
        bairro_pers: string,
        fk_cep: number,
        fk_name_filial: number,
        fk_id_user: number,
        rg: string,
        cnpj: string,
        inscricao: string,
        fantasia: string,
        limit_cred: number,
        fk_grupo: number
    ) {
        super()
        this.id = id
        this.name = name
        this.cpf_pers = cpf_pers
        this.phone_pers = phone_pers
        this.address_pers = address_pers
        this.num_address = num_address
        this.bairro_pers = bairro_pers
        this.fk_cep = fk_cep
        this.fk_name_filial = fk_name_filial
        this.fk_id_user = fk_id_user
        this.rg = rg
        this.cnpj = cnpj
        this.inscricao = inscricao
        this.fantasia = fantasia
        this.limit_cred = limit_cred
        this.fk_grupo = fk_grupo
    }
}

export { Person }