export type IValRecebido = {
    id_val: number
    fk_conta: number
    fk_venda: number
    fk_user: number
    valor: number
    data_recebimento: Date
    descricao: string
    fk_person: number
}