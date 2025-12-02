import { Request, Response } from "express"
require('dotenv').config()
import fs from 'fs'
import PDFPrinter from 'pdfmake'
import QRCode from 'qrcode';

import { HandleService } from "../../Providers/Mail/nodeMailer"
import { IReportNotes, TMoney, TNote } from "../../Interfaces/Note/Note"
import { mountTableInvoice } from "./utils/mountTableInvoice"
import { mountTableItems } from "./utils/mountTableItems"
import { Note } from "../../Entities/Note/Note"
import { NotesServices } from "../../Services/Notes/NotesServices"
import { HandleTicket } from "./ticket/HandleTicket";

const handleService: HandleService = new HandleService()
const notesServices = new NotesServices()
const handleTicket = new HandleTicket()

const url_note: any = process.env.URL_NOTE
const url_site: any = process.env.URL_SITE
const title: any = process.env.TITLE

class ConttrolersNotes {

    async createNote(request: Request, response: Response) {
        try {
            const { num_nota: num_note } = request.params;
            const res: TNote = await notesServices.getNote(num_note);
            const itens = await notesServices.getItemsNote(num_note);
            const invoices = await notesServices.getInvoice(num_note);
            const money: TMoney = await notesServices.getMoney(num_note);
            const newNote: TNote = new Note(res.nota, res.filial, res.comprador,
                res.cpf, res.endereco, res.num_endereco, res.telefone, res.usuario,
                res.email, res.emitida, res.val_rec, res.desc_venda,
                res.total_venda, res.fantasia, res.f_endereco, res.cnpj, res.inscricao,
                res.f_telefone, res.f_email, res.bairro, res.cep, res.uf,
                res.municipio, itens, invoices, money);
            const bodyItems = await mountTableItems(newNote.items ?? []);
            const bodyInvoice = await mountTableInvoice(newNote.invoices ?? []);
            const qrText = `${url_note}/${newNote.nota}`;
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
                                text: `${title} - ${url_site}`,
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
                                    { text: `${newNote.fantasia}\n`, style: 'empresaTitulo' },
                                    `Filial: ${newNote.filial}\n`,
                                    `CNPJ: ${newNote.cnpj} | IE: ${newNote.inscricao}\n`,
                                    `Endereço: ${newNote.f_endereco}\n`,
                                    `Telefone: ${newNote.f_telefone} | Email: ${newNote.f_email}`
                                ],
                                margin: [10, 0, 0, 0],
                                fontSize: 9
                            },
                            {
                                text: [
                                    { text: `Nota de Venda Nº ${String(newNote.nota).padStart(6, '0')}\n`, bold: true },
                                    `Espécie: [PE]\n`,
                                    `Emissão: ${new Date(newNote.emitida).toLocaleDateString('pt-BR')}`
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
                                [`Nome: ${newNote.comprador}`, `Telefone: ${newNote.telefone}`],
                                [`CPF: ${newNote.cpf}`, ``],
                                [`Endereço: ${newNote.endereco}, Nº ${newNote.num_endereco}`, `Bairro: ${newNote.bairro}`],
                                [`Cidade: ${newNote.municipio}`, `Estado: ${newNote.uf}`],
                                [`CEP: ${newNote.cep}`, `Email: ${newNote.email}`],
                                [`Usuário: ${newNote.usuario}`, ``]
                            ]
                        }
                    },

                    // Valor recebido
                    { text: '\nVALOR RECEBIDO EM DINHEIRO / ESPÉCIE', style: 'sectionHeader' },
                    {
                        text: `R$ ${parseFloat(newNote.money?.valor || '0').toFixed(2)}`,
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
                                { text: `Produtos/Serviços:\nR$ ${newNote.total_venda}`, alignment: 'right' },
                                { text: `Desconto:\nR$ ${newNote.desc_venda}`, alignment: 'right' },
                                { text: `Total a pagar:\nR$ ${newNote.val_rec}`, alignment: 'right' },
                                { text: `Total Nota:\nR$ ${newNote.val_rec}`, alignment: 'right' }
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
                                        `Valor recebido em dinheiro: R$ ${parseFloat(money?.valor || '0').toFixed(2)}\n` +
                                        `Esta nota Nº ${String(newNote.nota).padStart(6, '0')} não possui valor fiscal.\n` +
                                        `Nota emitida on-line pelo site: ${url_site}\n`,
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
            pdfDoc.pipe(fs.createWriteStream(`notes/note_${num_note}.pdf`))
            const chunks: any = [];
            pdfDoc.on("data", (chunk: any) => {
                chunks.push(chunk)
            });
            pdfDoc.end();
            pdfDoc.on("end", () => {
                const result = Buffer.concat(chunks)
                response.end(result);
            });
            handleService.setSendMailNote(num_note, res.email, res.telefone, res.comprador, res.endereco)
        } catch (err: unknown) {
            response.json("Error Occurred ! " + err)
        }
    };

    async createTicket(request: Request, response: Response) {
        try {
            const { num_nota: num_note } = request.params;

            const res = await notesServices.getNote(num_note);
            const itens = await notesServices.getItemsNote(num_note);
            const invoices = await notesServices.getInvoice(num_note);
            const money = await notesServices.getMoney(num_note);

            const newNote = new Note(
                res.nota, res.filial, res.comprador,
                res.cpf, res.endereco, res.num_endereco, res.telefone, res.usuario,
                res.email, res.emitida, res.val_rec, res.desc_venda,
                res.total_venda, res.fantasia, res.f_endereco, res.cnpj, res.inscricao,
                res.f_telefone, res.f_email, res.bairro, res.cep, res.uf,
                res.municipio, itens, invoices, money
            );

            const filePath: any = await handleTicket.generateFileTXT(
                newNote,
                itens,
                invoices,
                `ticket_${newNote.nota}.txt`
            );
            return response.download(filePath, `ticket_${newNote.nota}.txt`, (err) => {
                if (err) {
                    console.error("Erro ao enviar arquivo:", err);
                    return response.status(500).send("Erro ao enviar arquivo.");
                }
            });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao gerar ticket" });
        }
    }
}

export { ConttrolersNotes }