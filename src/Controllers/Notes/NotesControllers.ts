import { HandleService } from "../../Providers/Mail/nodeMailer"
import { IReportNotes } from "../../Interfaces/Note/Note"
import { mountTableInvoice } from "./utils/mountTableInvoice"
import { mountTableItems } from "./utils/mountTableItems"
import { NotesServices } from "../../Services/Notes/NotesServices"
import { Request, Response } from "express"
import fs from 'fs'
import PDFPrinter from 'pdfmake'
import QRCode from 'qrcode';

const handleService: HandleService = new HandleService()
const noteService = new NotesServices()

export class ConttrollersNotes {

    async select(request: Request, response: Response) {
        try {
            const { num_nota: num_note } = request.params;
            const resNota = await noteService.getNote(num_note);
            const { nota, filial, comprador, cpf, endereco, num_endereco,
                telefone, usuario, email, emitida, val_rec, desc_venda,
                total_venda, fantasia, f_endereco, cnpj, inscricao,
                f_telefone, f_email, bairro, cep, uf, municipio } = resNota;
            const resItemsNota = await noteService.getItemsNote(num_note);
            const itens = resItemsNota;
            const invoices = await noteService.getInvoice(num_note);
            const resMoney = await noteService.getMoney(num_note);
            const dinheiro: number | any = resMoney;
            const bodyItems = await mountTableItems(itens);
            const bodyInvoice = await mountTableInvoice(invoices);
            // const qrText = `Nota Nº ${nota} - Emitida em: ${new Date(emitida).toLocaleDateString('pt-BR')}`;
            const qrText = `https://api.centroinfo.com.br/note/${nota}`;
            const qrDataUrl = await QRCode.toDataURL(qrText); // Gera imagem base64

            const fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                },
            };

            const printer = new PDFPrinter(fonts)

            const docDefinitions: IReportNotes | any = {
                defaultStyle: { font: "Helvetica" },
                footer: function (currentPage: number, pageCount: number) {
                    return {
                        columns: [
                            {
                                text: 'CentroInfo - https://www.centroinfo.com.br',
                                alignment: 'left',
                                fontSize: 7,
                                margin: [40, 0, 0, 0]
                            },
                            {
                                text: `Página ${currentPage} de ${pageCount}`,
                                alignment: 'right',
                                fontSize: 7,
                                margin: [0, 0, 40, 0]
                            }
                        ]
                    };
                },
                content: [
                    // Cabeçalho da empresa com logo + dados
                    {
                        columns: [
                            {
                                image: 'logo.png',
                                width: 100
                            },
                            {
                                width: '*',
                                text: [
                                    { text: `${fantasia}\n`, style: 'empresaTitulo' },
                                    `Filial: ${filial}\n`,
                                    `CNPJ: ${cnpj} | IE: ${inscricao}\n`,
                                    `Endereço: ${f_endereco}\n`,
                                    `Telefone: ${f_telefone} | Email: ${f_email}`
                                ],
                                margin: [10, 0, 0, 0],
                                fontSize: 9
                            },
                            {
                                text: [
                                    { text: `Nota de Venda Nº 000${nota}\n`, bold: true },
                                    `Espécie: [PE]\n`,
                                    `Emissão: ${new Date(emitida).toLocaleDateString('pt-BR')}`
                                ],
                                alignment: 'right',
                                fontSize: 9
                            }
                        ],
                        columnGap: 10,
                        margin: [0, 0, 0, 10]
                    },

                    // Divisor visual
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0, lineWidth: 1 }], margin: [0, 10, 0, 10] },

                    // Cliente
                    { text: 'CLIENTE / DESTINATÁRIO', style: 'sectionHeader' },
                    {
                        style: 'columnsPerson',
                        layout: 'lightHorizontalLines',
                        table: {
                            widths: ["50%", "50%"],
                            body: [
                                [`Nome: ${comprador}`, `Telefone: ${telefone}`],
                                [`CPF: ${cpf}`, ``],
                                [`Endereço: ${endereco}, Nº ${num_endereco}`, `Bairro: ${bairro}`],
                                [`Cidade: ${municipio}`, `Estado: ${uf}`],
                                [`CEP: ${cep}`, `Email: ${email}`],
                                [`Usuário: ${usuario}`, ``]
                            ]
                        }
                    },

                    // Valor recebido
                    { text: '\nVALOR RECEBIDO EM DINHEIRO / ESPÉCIE', style: 'sectionHeader' },
                    {
                        text: `R$ ${parseFloat(dinheiro?.valor || 0).toFixed(2)}`,
                        style: 'valorDestaque'
                    },

                    // Faturas
                    { text: '\nFATURA(S)', style: 'sectionHeader' },
                    {
                        style: 'columnsNota',
                        layout: 'lightHorizontalLines',
                        table: {
                            widths: ["15%", "20%", "30%", "20%"],
                            body: bodyInvoice
                        }
                    },

                    // Itens
                    { text: '\nDADOS DOS PRODUTOS / SERVIÇOS', style: 'sectionHeader' },
                    {
                        style: 'columnsNota',
                        layout: 'lightHorizontalLines',
                        table: {
                            widths: ["8%", "46%", "12%", "9%", "11%", "14%"],
                            body: bodyItems
                        }
                    },

                    // Totais
                    { text: '\nVALORES / TOTAIS', style: 'sectionHeader' },
                    {
                        layout: 'noBorders',
                        table: {
                            widths: ['25%', '25%', '25%', '25%'],
                            body: [[
                                { text: `Produtos/Serviços:\nR$ ${total_venda}`, alignment: 'right' },
                                { text: `Desconto:\nR$ ${desc_venda}`, alignment: 'right' },
                                { text: `Total a pagar:\nR$ ${val_rec}`, alignment: 'right' },
                                { text: `Total Nota:\nR$ ${val_rec}`, alignment: 'right' }
                            ]]
                        },
                        margin: [0, 5, 0, 10]
                    },

                    // Complementares
                    { text: 'DADOS COMPLEMENTARES', style: 'sectionHeader' },
                    {
                        table: {
                            widths: ['*'],
                            body: [[
                                {
                                    text:
                                        `Observações:\n` +
                                        `Valor recebido em dinheiro: R$ ${parseFloat(dinheiro?.valor || 0).toFixed(2)}\n` +
                                        `Esta nota Nº ${nota} não possui valor fiscal.\n` +
                                        `Nota emitida on-line pelo site: https://www.centroinfo.com.br`,
                                    fontSize: 9
                                }
                            ]]
                        },
                        layout: 'lightHorizontalLines'
                    },
                    {
                        image: qrDataUrl,
                        width: 100,
                        alignment: 'left',
                        margin: [0, 10, 0, 20]
                    }
                ],
                styles: {
                    empresaTitulo: {
                        fontSize: 11,
                        bold: true,
                        color: '#1a1a1a'
                    },
                    sectionHeader: {
                        bold: true,
                        fontSize: 10,
                        margin: [0, 10, 0, 5],
                        color: '#333'
                    },
                    valorDestaque: {
                        fontSize: 12,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 0, 0, 10]
                    },
                    columnsNota: {
                        fontSize: 9,
                        alignment: "left",
                        margin: 2
                    },
                    columnsPerson: {
                        fontSize: 9,
                        margin: 2
                    },
                    columnsTitle: {
                        fontSize: 9,
                        bold: true,
                        fillColor: '#eeeeee',
                        color: 'black',
                        margin: 2
                    }
                },
            };



            const pdfDoc = printer.createPdfKitDocument(docDefinitions)
            pdfDoc.pipe(fs.createWriteStream("res_note.pdf"))
            const chunks: any = [];
            pdfDoc.on("data", (chunk: any) => {
                chunks.push(chunk)
            });
            pdfDoc.end();
            pdfDoc.on("end", () => {
                const result = Buffer.concat(chunks)
                response.end(result);
            });
            // handleService.setSendMailNote(num_note, email, telefone, comprador, endereco)
        } catch (err) {
            response.json("Error Occurred ! " + err)
        }
    };
}