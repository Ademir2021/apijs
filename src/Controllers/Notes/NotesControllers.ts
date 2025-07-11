import { Request, Response } from "express"
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL"
import PDFPrinter from 'pdfmake'
import fs from 'fs'
import { IReportNotes } from "../../Interfaces/Note/Note"
import { HandleService } from "../../Providers/Mail/nodeMailer"

type TDinheiro = {
    valor: 0
}

const handleService: HandleService = new HandleService()

export class ConttrollersNotes {

    async select(request: Request, response: Response) {
        try {
            const { num_nota } = request.params
            const res_nota = await postgreSQL.query("SELECT *FROM nota WHERE nota = '" + num_nota + "'")
            const { nota, filial, comprador, cpf, endereco, num_endereco, telefone, usuario, email, emitida,
                val_rec, desc_venda, total_venda, fantasia, f_endereco, cnpj, inscricao,
                f_telefone, f_email, bairro, cep, uf, municipio } = res_nota.rows[0];
            const res_itens_nota = await postgreSQL.query("SELECT  *FROM itens_nota WHERE id_venda = '" + num_nota + "'")
            const itens = res_itens_nota.rows
            const res_faturas = await postgreSQL.query("SELECT *FROM contas_receber WHERE fk_venda = '" + num_nota + "' ORDER BY vencimento")
            const faturas = res_faturas.rows
            const res_dinheiro = await postgreSQL.query("SELECT  valor FROM vals_recebidos WHERE fk_venda = '" + num_nota + "' and fk_conta = 0 ")
            const dinheiro: TDinheiro | any = res_dinheiro.rows[0]

            function setDinheiro() {
                let valor:any = 0
                if (dinheiro?.valor != null) {
                    valor = dinheiro?.valor
                    return "R$ " + parseFloat(valor).toFixed(2)
                }
                else if (dinheiro?.valor == null)
                    return 0
            }

            const bodyItems = [];
            const columnsTitle = [
                { text: "Item", style: "columnsTitle" },
                { text: "Descrição produtos", style: "columnsTitle" },
                { text: "Marca", style: "columnsTitle" },
                { text: "Quant", style: "columnsTitle" },
                { text: "Valor Unit", style: "columnsTitle" },
                { text: "Total Item", style: "columnsTitle" },
            ]

            const columnsBody = new Array();
            columnsTitle.forEach(column => columnsBody.push(column));
            bodyItems.push(columnsBody)

            for (let item of itens) {
                const rows = new Array();
                rows.push(item.item)
                rows.push(item.descricao)
                rows.push(item.marca)
                rows.push(item.quant)
                rows.push(`R$ ${item.valor}`)
                rows.push(`R$ ${item.total}`)
                bodyItems.push(rows)
            }

            const bodyFaturas = []
            const columnsTitleFaturas = [
                { text: "Número", style: "columnsTitle" },
                { text: "Tipo", style: "columnsTitle" },
                { text: "Vencimento", style: "columnsTitle" },
                { text: "Valor", style: "columnsTitle" },
            ]

            const columnsBodyFaturas = new Array();
            columnsTitleFaturas.forEach(column => columnsBodyFaturas.push(column));
            bodyFaturas.push(columnsBodyFaturas)

            for (let fatura of faturas) {
                const rows = new Array();
                rows.push(fatura.id_conta)
                rows.push(fatura.tipo)
                rows.push(fatura.vencimento.toLocaleString('pt-BR', { timezone: 'UTC' }))
                rows.push(`R$ ${parseFloat(fatura.valor).toFixed(2)}`)
                bodyFaturas.push(rows)
            }

            const img = {
                image: 'logo.png',
                alignment: 'center',
                width: 136,
                height: 48,
                opacity: 0.9,
                margin: 2,
            }

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
                content: [
                    {
                        style: 'columnsFilial',
                        table: {
                            heights: function (row: any) {
                                return 10;
                            },

                            widths: ["28%", "28%", "21%", "23%"],
                            body: [
                                [
                                    img,
                                    `Filial: ${filial}
                             Empresa: ${fantasia}
                                Cnpj: ${cnpj}
                   Incrição estadual: ${inscricao}
                            Endereço: ${f_endereco}
                            Telefone: ${f_telefone}
                               Email: ${f_email}\n`,
                                    `\nNota de venda\n Nº 000${nota}
                                  \nEspécie\n[PE]`,
                                    `\n\nData de emissão\n\n${emitida.toLocaleString('pt-BR', { timezone: 'UTC' })}`,
                                ]
                            ]
                        }
                    },
                    {
                        text: '\nCLIENTE/DESTINATÁRIO', style: 'title'
                    },
                    {
                        style: 'columnsPerson',
                        table: {
                            widths: ["50%", "50%"],
                            body: [
                                [`Nome:${comprador}`, `Telefone:${telefone}`],
                                [`CPF:${cpf}`, `Telefone:`],
                                [`Endereço:${endereco} - Nº${num_endereco}`, `Bairro:${bairro}`],
                                [`Cidade: ${municipio}`, `Email:${email}`],
                                [`Estado: ${uf}`, `User:${usuario}`],
                                [`CEP: ${cep}`, `Email: ${email}`]
                            ]
                        }
                    },
                    {
                        text: `\n\nVALOR RECEBIDO EM DINHEIRO/ESPÉCIE - ${setDinheiro()}`, style: 'title',
                    },
                    {
                        text: '\n\n FATURA', style: 'title'
                    },
                    {
                        style: 'columnsNota',
                        table: {
                            heights: function (row: any) {
                                return 10;
                            },
                            widths: ["8%", "5%", "20%", "15%"],
                            body: bodyFaturas
                        },
                    },
                    {
                        text: `\n\n DADOS PRODUTOS/SERVIÇOS`, style: "title"
                    },
                    {
                        style: 'columnsNota',
                        table: {
                            heights: function (row: any) {
                                return 10;
                            },
                            widths: ["6%", "46%", "15%", "7%", "12%", "14%"],
                            body: bodyItems
                        },
                    },
                    {
                        text: '\nVALORES/TOTAIS', style: 'title'
                    },
                    {
                        style: '',
                        table: {
                            widths: ['*', '*', '*', 100],
                            body: [
                                [`Produtos/Serviços\nR$ ${total_venda}`,
                                `Desconto/Produtos\nR$ ${desc_venda}`,
                                `Total à pagar\nR$ ${val_rec}`,
                                `Total Nota\nR$ ${val_rec}`]
                            ]
                        }
                    },
                    {
                        text: '\nDADOS COMPLEMENTARES', style: 'title'
                    },
                    {
                        style: "",
                        table: {
                            widths: ["*"],
                            body: [
                                [`\nObservações:\n
                                    Valor recebido em dinheiro - ${setDinheiro()}\n
                                Está nota Nº ${nota} não possui valor fiscal\n
                                Nota emitida on-line pelo site: https://www.centroinfo.com.br`]
                            ]
                        }
                    }

                ],
                styles: {
                    title: {
                        bold: true,
                        fontSize: 9,
                    },
                    columnsFilial: {
                        fontSize: 9,
                        fonts: "Helvetica-BoldOblique",
                        alignment: "left",
                        margin: 2,
                        bold: false,
                    },
                    columnsPerson: {
                        fontSize: 9,
                        alignment: "left",
                        margin: 2
                    },
                    columnsNota: {
                        fontSize: 9,
                        alignment: "left",
                        color: "",
                        margin: 2,
                        bold: false,
                    },
                    columnsTitle: {
                        fontSize: 9,
                        bold: true,
                        fillColor: "",
                        color: "black",
                        margin: 2
                    },
                }
            };

            const pdfDoc = printer.createPdfKitDocument(docDefinitions)

            pdfDoc.pipe(fs.createWriteStream("res_note.pdf"))

            const chunks: any = [];

            pdfDoc.on("data", (chunk: any) => {
                chunks.push(chunk)
            })

            pdfDoc.end();

            pdfDoc.on("end", () => {
                const result = Buffer.concat(chunks)
                response.end(result)
                // console.log(result)
            })

            //console.log("Relatório concluido");
            handleService.setSendMailNote(num_nota, email, telefone, comprador, endereco)

        } catch (err) {
            response.json("Error Occurred ! " + err)
        }
    };
}