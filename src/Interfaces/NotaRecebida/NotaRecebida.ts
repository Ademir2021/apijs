import { IContaAPagar } from "../ContaPagar/ContaPagar"
import { IValPago } from "../ValPago/ValPago"

export type INotaRecebida = {
    fk_fornecedor: number
    data: Date
    emissao: Date
    numNota: number
    modelo: string
    vFrete: number
    vSeguro: number
    despAcessorias: number
    encargos: number
    acrescimo: number
    desconto: number
    tProdutos: number
    total: number
    items: IItems[]
    contaAPagar:IContaAPagar[]
    valsPago: IValPago[]
}

export type IItems = {
    id: number
    tipo: string
    item: number
    descric: string | number
    quantidade: number
    unitario: number
    total: number
}

export type ITrib = {
    vIpi: number
    bcIcmsSt: number
    icmsSubst: number
    pisSubst: number
    cofinsSubst: number
    icmsSobreIpi: number
}
