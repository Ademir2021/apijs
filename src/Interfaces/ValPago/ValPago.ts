export type IValPago = {
    id_val: number
    fk_conta: number
    fk_compra: number
    fk_user: number
    valor: number
    data_recebimento: Date
    descricao:string
    fk_person:number
    fk_despesa:number
}