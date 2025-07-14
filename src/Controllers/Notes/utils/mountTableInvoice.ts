export async function mountTableInvoice(faturas: any[]) {
    const header = [
        { text: "Número", style: "columnsTitle" },
        { text: "Tipo", style: "columnsTitle" },
        { text: "Vencimento", style: "columnsTitle" },
        { text: "Valor", style: "columnsTitle" },
    ];

    const rows = faturas.map(fatura => [
        fatura.id_conta,
        fatura.tipo,
        new Date(fatura.vencimento).toLocaleDateString("pt-BR"),
        fatura.valor
    ]);

    return [header, ...rows];
}