export type IPerson = {
    id: number
    name: string
    date_of_birth:Date | "2000-01-01" | any
    age?:number
    cpf_pers: string
    phone_pers: string
    address_pers: string
    num_address:string
    bairro_pers: string
    fk_cep: number
    fk_name_filial: number
    fk_id_user: number
    rg:string
    cnpj:string
    inscricao:string
    fantasia:string
    limit_cred:number
    fk_grupo:number
}

export type TPerson = {
    id_person: number
    name_pers: string
    date_of_birth:Date | "2000-01-01" | any
    // age:number
    cpf_pers: string
    phone_pers: string
    address_pers: string
    num_address: string
    bairro_pers: string
    fk_cep: number
    fk_name_filial: number
    fk_id_user: number
    rg: string
    cnpj: string
    inscricao: string
    fantasia: string
    limit_cred: number
    fk_grupo: number
}

