import fs from "fs";
import path from "path";
// import QRCode from 'qrcode';
import { TInvoicesNote, TMoney, TNote } from "../../../Interfaces/Note/Note"
import { TItemsNote } from "../../../Interfaces/Note/Note";

// const url_ticket: any = process.env.URL_TICKET

class HandleTicket {

    private async bodyTicket(
        Note: TNote,
        Itens: TItemsNote[],
        InvoicesNote: TInvoicesNote[]
    ) {

        const fmtDate = (d: string | Date) =>
            new Date(d).toLocaleDateString('pt-BR');

        const fmtMoney = (v: number = 0) =>
            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

        const col = (text: any, size: number) =>
            String(text ?? '').padEnd(size, ' ');

        const line = '---------------------------------------------------------------------------------------------------------------';

        const duplicatas =
            InvoicesNote.length > 0
                ? InvoicesNote.map(inv =>
                    col(inv.id_conta, 4) +
                    col(inv.tipo, 10) +
                    col(fmtMoney(inv.valor), 17) +
                    fmtDate(inv.vencimento)
                ).join('\n')
                : 'Nenhuma duplicata';

        const itens =
            Itens.length > 0
                ? Itens.map(p =>
                    col(p.item, 6) +
                    col(p.descricao, 70) +
                    col('UN', 7) +
                    col(p.quant, 6) +
                    col(fmtMoney(p.valor), 12) +
                    col(fmtMoney(p.total), 12)
                ).join('\n')
                : 'Nenhum item.';

        return `Venda: ${String(Note.nota).padStart(6, '0')}, Emitida: ${fmtDate(Note.emitida)}
${Note.fantasia}
${Note.filial}
CNPJ: ${Note.cnpj}, IE: ${Note.inscricao}
${Note.f_endereco}

Cliente..: ${Note.comprador}, CPF: ${Note.cpf}
Telefone.: ${Note.telefone}, Email: ${Note.email}
Endereço.: ${Note.endereco},${Note.bairro}
Cidade...: ${Note.municipio}, CEP: ${Note.cep}

Dinheiro: ${fmtMoney(parseFloat(Note.money?.valor) || 0)}
${line}
ID   Tipo       Valor            Vencimento
${line}
${duplicatas}
${line}
${line}
Item  Descrição                                                             Un   Qtde    Preço       Total
${line}
${itens}
${line}
Quantidade de Itens Comprados.: ${Itens.length}
Total dos ITens...............: ${fmtMoney(Note.total_venda)}
Desconto na Nota..............: ${fmtMoney(Note.desc_venda)}
Total da Nota.................: ${fmtMoney(Note.val_rec - (Note.desc_venda || 0))}





---------------------------------------------
   Cliente: ${Note.comprador}
   CPF: ${Note.cpf}                                                          Vendedor: ${Note.usuario}`;
    }

    async generateFileTXT(Note: TNote, Itens: TItemsNote[], InvoicesNote: TInvoicesNote[], nameFile: string) {
        const content = await this.bodyTicket(Note, Itens, InvoicesNote);
        // Pasta onde o arquivo será criado
        const outputDir = path.resolve(__dirname, "../../../tmp");
        // Garantir que a pasta existe
        await fs.promises.mkdir(outputDir, { recursive: true });
        // Caminho completo para salvar o arquivo
        const filePath = path.join(outputDir, nameFile);
        // Gravar arquivo em disco
        await fs.promises.writeFile(filePath, content, "utf8");
        // Retorna caminho do arquivo para o controller
        return filePath;
    }
}

export default new HandleTicket();


export { HandleTicket }