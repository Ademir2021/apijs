import fs from "fs";
import path from "path";

import QRCode from 'qrcode';

import { TInvoicesNote, TMoney, TNote } from "../../../Interfaces/Note/Note"
import { TItemsNote } from "../../../Interfaces/Note/Note";

// const url_ticket: any = process.env.URL_TICKET

class HandleTicket {
    private async bodyTicket(Note: TNote, Itens: TItemsNote[], InvoicesNote: TInvoicesNote[]) {
        return `NOTA DE VENDA NÚMERO: ${String(Note.nota).padStart(6, '0')}
EMITIDA: ${new Date(Note.emitida).toLocaleDateString('pt-BR')}
FANTASIA: ${Note.fantasia}
RAZAO SOCIAL: ${Note.filial}
CNPJ: ${Note.cnpj}
USUÁRIO: ${Note.usuario}

DADOS DO CLIENTE
Nome: ${Note.comprador}
CPF: ${Note.cpf}
Telefone: ${Note.telefone}, Email: ${Note.email}
Endereço: ${Note.endereco}, Cidade: ${Note.municipio}, Estado: ${Note.cep}

PAGAMENTOS
Em Dinheiro: R$ ${Note.money.valor || 0}

DUPLICATAS
-------------------------------------------------------------------------------------------------------
id  Tipo      Valor          Vencimento
-------------------------------------------------------------------------------------------------------
${InvoicesNote.length > 0 && InvoicesNote.map((Invoice) =>
            Invoice.id_conta.toString().padEnd(4, ' ') +
            Invoice.tipo.toString().padEnd(10, ' ') +
            Invoice.valor.toString().padEnd(15, ' ') +
            new Date(Invoice.vencimento).toLocaleDateString('pt-BR')
        ).join(`\n`)}
------------------------------------------------------------------------------------------------------

DISCRIMINAÇÃO DOS PRODUTOS
------------------------------------------------------------------------------------------------------
Item  Descrição dos Produtos                                          Quant   Unit    Total 
------------------------------------------------------------------------------------------------------
${Itens.map((ITem) =>
            ITem.item.toString().padEnd(3, ' ') +
            ITem.descricao.padEnd(70, ' ') +
            ITem.quant.toString().padEnd(5, ' ') +
            ITem.valor.toString().padEnd(9, ' ') +
            ITem.total
        ).join(`\n`)}
-------------------------------------------------------------------------------------------------------

TOTAIS
TOTAL ITEMS: ${Note.total_venda}, DESCONTO: ${Note.desc_venda || 0}, TOTAL NOTA: ${Note.val_rec - Note.desc_venda}






---------------------------------------------
   Cliente ${Note.comprador}
   CPF: ${Note.cpf}
`;
    }

    private async bodyCupon(Note: TNote, Itens: TItemsNote[], InvoicesNote: TInvoicesNote[]) {
        let id = 0
        // const qrText = `${url_ticket +"/"+ Note.nota}`;
        // const qrDataUrl = await QRCode.toDataURL(qrText); // Gera imagem base64
        return `FANTASIA: ${Note.fantasia}
RAZÃO SOCIAL: ${Note.filial} CNPJ: ${Note.cnpj} IE: ${Note.inscricao}
TELEFONE: ${Note.f_telefone}
${Note.f_endereco}

DOCUMENTO AUXILIAR NOTA DE VENDA CONSUMIDOR ELETRÔNICA
--------------------------------------------------------
SEQ | CÒDIGO | DESCRIÇÃO | QTD | UN | VL UN | VL TOTAL
--------------------------------------------------------
${Itens.map((ITem) =>
            `${id += 1}` + " " +
            ITem.item.toString().padEnd(3, ' ') +
            ITem.descricao.padEnd(50, ' ') + ' ' +
            ITem.quant.toString() + ' X ' +
            ITem.valor.toString().padEnd(9, ' ') +
            ITem.total
        ).join(`\n`)}
---------------------------------------------------------
Qtd. Total de Itens                           ${Itens.length}
Valor Total R$                                ${Note.val_rec}
Crediário Loja                                ${InvoicesNote.length > 0 && Note.val_rec || 0}
Valor Troco R$                                ${0}
        Número ${String(Note.nota).padStart(6, '0')} Série PE Emissão ${new Date(Note.emitida).toLocaleDateString('pt-BR')}
        Consulte pelo número da Nota ${String(Note.nota).padStart(6, '0')}
        Cliente: ${Note.comprador}, CPF:${Note.cpf}
    
        USUÁRIO: ${Note.usuario}`
    }

    async generateFileTXT(Note: TNote, Itens: TItemsNote[], InvoicesNote: TInvoicesNote[], nameFile: string) {
        const content = this.bodyCupon(Note, Itens, InvoicesNote);
        // Pasta onde o arquivo será criado
        const outputDir = path.resolve(__dirname, "../../../tmp");
        // Garantir que a pasta existe
        await fs.promises.mkdir(outputDir, { recursive: true });
        // Caminho completo para salvar o arquivo
        const filePath = path.join(outputDir, nameFile);
        // Gravar arquivo em disco
        await fs.promises.writeFile(filePath, await content, "utf8");
        // Retorna caminho do arquivo para o controller
        return filePath;
    }
}

export default new HandleTicket();


export { HandleTicket }