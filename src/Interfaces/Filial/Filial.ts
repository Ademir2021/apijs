export type IFilial = {
    id: number //id_filial
    created_at?: Date | any
    updated_at?: Date | any
    name: string //name_filial
    fantasia: string
    address: string
    cnpj: string
    inscric: string
    phone: string
    email: string
    id_person: number //fk_person
}

export type TFilial = {
    id_filial: number
    created_at: Date | any
    updated_at: Date | any
    name_filial: string
    fantasia: string
    address: string
    cnpj: string
    inscric: string
    phone: string
    email: string
    fk_person: number
}

