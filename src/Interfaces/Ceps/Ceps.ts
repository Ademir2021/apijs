export interface ICep {
    id_cep?: number;
    num_cep: string;
    code_city: number;
    type_cep: string;
    public_place: string; //logradouro
    num_initial: Number
    num_final: number
    complement: string
    created_at?: Date
    city: string | undefined | any;
    uf: string;
}

export type ICity = {
    id_city: number
    name_city: string
    uf: string
    code_ibge: string
    code_state_revenue: number
    code_country: number
    created_at: Date
    code_federal_revenue: number
}

export type ICountry = {
    id_country:number
    name_country:string
    acronym:string
    ddi:number
    code_country:number
    code_revenue:number,
    created_at:Date
}

export type IPais = {
    created_at:Date
    id:number
    nome_pais:string
    sigla:string
    ddi:string
    cod_pais:string
}