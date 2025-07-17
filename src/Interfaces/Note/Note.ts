export interface IReportNotes {
    [index: string]: number | string | any;
}

export type TMoney ={
    valor:string
}

export type TItemsNote = {
    item:string // id_item
    descricao:string
    marca:string
    quant:number
    valor:number
    total:number
}

export type TInvoicesNote = {
    id_conta:string
    tipo:string
    vencimento:string
    valor:number
}

/** nota, filial, comprador, cpf, endereco, num_endereco,
                telefone, usuario, email, emitida, val_rec, desc_venda,
                total_venda, fantasia, f_endereco, cnpj, inscricao,
                f_telefone, f_email, bairro, cep, uf, municipio */
export type TNote = {
    nota: string  //id_nota
    filial: string
    comprador: string
    cpf: string
    endereco: string
    num_endereco: string;
    telefone: string
    usuario: string
    email: string
    emitida: Date
    val_rec: number
    desc_venda: number
    total_venda: number
    fantasia: string
    f_endereco: string
    cnpj: string
    inscricao: string
    f_telefone: string
    f_email: string
    bairro: string
    cep: string
    uf: string
    municipio: string
    money:TMoney
    items?:TItemsNote[]
    invoices?:TInvoicesNote[]
}