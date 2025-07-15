import { TInvoicesNote } from "../../../Interfaces/Note/Note";

export async function mountTableInvoice(invoices: TInvoicesNote[]) {
    const header = [
        { text: "Número", style: "columnsTitle" },
        { text: "Tipo", style: "columnsTitle" },
        { text: "Vencimento", style: "columnsTitle" },
        { text: "Valor", style: "columnsTitle" },
    ];

    const rows = invoices.map(invoice => [
        invoice.id_conta,
        invoice.tipo,
        new Date(invoice.vencimento).toLocaleDateString("pt-BR"),
        invoice.valor
    ]);

    return [header, ...rows];
}