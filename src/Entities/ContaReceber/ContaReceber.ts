import { IContaAreceber } from "../../Interfaces/ContaReceber/ContaReceber";
import { ContaReceberDAO } from "./ContaReceberDAO";

class ContaReceber extends ContaReceberDAO implements IContaAreceber {
    id_conta = 0
    fk_filial = 0
    tipo = ''
    fk_venda = 0
    fk_user = 0
    parcela = ''
    valor = 0
    multa = 0
    juros = 0
    desconto = 0
    emissao: Date
    vencimento: Date
    saldo = 0
    pagamento: Date 
    recebimento = 0
    observacao = ''
    fk_pagador = 0
    situacao = "Aberto"
    constructor(
        id_conta:number,
        fk_filial: number,
        tipo: string,
        fkVenda: number,
        fkUser: number,
        parcela: string,
        valor: number,
        multa: number,
        juros: number,
        desconto: number,
        emissao: Date,
        vencimento: Date,
        saldo: number,
        pagamento: Date,
        recebimento: number,
        observacao:string,
        fkPagador:number,
        situacao:string
    ) {
        super()
        this.id_conta = id_conta
        this.fk_filial = fk_filial
        this.tipo = tipo
        this.fk_venda = fkVenda
        this.fk_user = fkUser
        this.parcela = parcela
        this.valor = valor
        this.multa = multa
        this.juros = juros
        this.desconto = desconto
        this.emissao = emissao
        this.vencimento = vencimento
        this.saldo = saldo
        this.pagamento = pagamento
        this.recebimento = recebimento
        this.observacao = observacao
        this.fk_pagador = fkPagador
        this.situacao = situacao
    }
}

export { ContaReceber }