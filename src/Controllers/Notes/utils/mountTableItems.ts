export async function mountTableItems(itens: any[]) {
    const header = [
        { text: "Item", style: "columnsTitle" },
        { text: "Descrição produtos", style: "columnsTitle" },
        { text: "Marca", style: "columnsTitle" },
        { text: "Quant", style: "columnsTitle" },
        { text: "Valor Unit", style: "columnsTitle" },
        { text: "Total Item", style: "columnsTitle" },
    ];

    const rows = itens.map(item => [
        item.item,
        item.descricao,
        item.marca,
        item.quant,
        item.valor,
        item.total
    ]);

    return [header, ...rows];
}