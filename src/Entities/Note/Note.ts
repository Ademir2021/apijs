import { TInvoicesNote, TItemsNote, TMoney, TNote } from "../../Interfaces/Note/Note";
import { NoteDAO } from "./NoteDAO";


class Note extends NoteDAO implements TNote {
    nota: string;
    filial: string;
    comprador: string;
    cpf: string;
    endereco: string;
    num_endereco: string;
    telefone: string;
    usuario: string;
    email: string;
    emitida: Date;
    val_rec: number;
    desc_venda: number;
    total_venda: number;
    fantasia: string;
    f_endereco: string;
    cnpj: string;
    inscricao: string;
    f_telefone: string;
    f_email: string;
    bairro: string;
    cep: string;
    uf: string;
    municipio: string;
    items?: TItemsNote[] = []
    invoices?: TInvoicesNote[] = [];
    money:TMoney
    constructor(
        nota: string,
        filial: string,
        comprador: string,
        cpf: string,
        endereco: string,
        num_endereco: string,
        telefone: string,
        usuario: string,
        email: string,
        emitida: Date,
        val_rec: number,
        desc_venda: number,
        total_venda: number,
        fantasia: string,
        f_endereco: string,
        cnpj: string,
        inscricao: string,
        f_telefone: string,
        f_email: string,
        bairro: string,
        cep: string,
        uf: string,
        municipio: string,
        items: TItemsNote[],
        invoices: TInvoicesNote[],
        money:TMoney
    ) {
        super()
        this.nota = nota;
        this.filial = filial
        this.comprador = comprador
        this.cpf = cpf
        this.endereco = endereco
        this.num_endereco = num_endereco
        this.telefone = telefone
        this.cpf = cpf
        this.usuario = usuario
        this.email = email
        this.emitida = emitida
        this.val_rec = val_rec
        this.desc_venda = desc_venda
        this.total_venda = total_venda
        this.fantasia = fantasia
        this.f_endereco = f_endereco
        this.cnpj = cnpj
        this.inscricao = inscricao
        this.f_telefone = f_telefone
        this.f_email = f_email
        this.bairro = bairro
        this.cep = cep
        this.uf = uf
        this.municipio = municipio
        this.items = items
        this.invoices = invoices
        this.money = money
    }

}

export { Note }