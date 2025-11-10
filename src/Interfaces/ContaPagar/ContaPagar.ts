export type IContaAPagar = {
    id_conta:number 
    fk_filial: number
    tipo: string
    fk_compra: number 
    fk_user:number
    parcela: string
    valor: number
    multa: number
    juros: number
    desconto:number
    emissao:Date
    vencimento:Date
    saldo:number
    pagamento:Date
    recebimento: number
    observacao:string
    fk_beneficiario:number
    fk_despesa:number
}

export type IDespesa = {
    id:number 
    name:string 
    fk_setor:number
}

export type ITipoSetor = {
    tipo: 'Fixa' | 'Variavel'
}

export type ISetorDespesa = {
    id:number
    name:string 
    tipo:ITipoSetor | ''
}