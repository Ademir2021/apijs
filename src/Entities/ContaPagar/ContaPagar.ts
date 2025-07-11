import { IContaAPagar } from "../../Interfaces/ContaPagar/ContaPagar";
import { ContaPagarDAO } from "./ContaPagarDAO";

class ContasPagar extends ContaPagarDAO implements IContaAPagar {
    id_conta = 0
    fk_filial = 0
    tipo = ''
    fk_compra = 0
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
    fk_beneficiario = 0
    fk_despesa = 0
    constructor(
        id_conta: number,
        fk_filial: number,
        tipo: string,
        fk_compra: number,
        fk_user: number,
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
        observacao: string,
        fk_beneficiario: number,
        fk_despesa: number
    ) {
        super()
        this.id_conta = id_conta
        this.fk_filial = fk_filial
        this.tipo = tipo
        this.fk_compra = fk_compra
        this.fk_user = fk_user
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
        this.fk_beneficiario = fk_beneficiario
        this.fk_despesa = fk_despesa
    }
}

export { ContasPagar }