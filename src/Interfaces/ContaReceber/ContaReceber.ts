export type IContaAreceber = {
    id_conta: number 
    fk_filial: number
    tipo: string
    fk_venda: number
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
    observacao: string
    fk_pagador:number
}