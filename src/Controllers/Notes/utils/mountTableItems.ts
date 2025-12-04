import { TItemsNote } from "../../../Interfaces/Note/Note";

export async function mountTableItems(itens: TItemsNote[]) {
    const header = [
        { text: "Item", style: "columnsTitle" },
        { text: "Descrição produtos", style: "columnsTitle" },
        { text: "Marca", style: "columnsTitle" },
        { text: "UN", style: "columnsTitle" },
        { text: "Quant", style: "columnsTitle" },
        { text: "Valor Unit", style: "columnsTitle" },
        { text: "Total Item", style: "columnsTitle" },
    ];

    const rows = itens.map(item => [
        item.item || 0,
        item.descricao || '',
        item.marca || '',
        item.unMed || '',
        item.quant || 0,
        item.valor || 0,
        item.total || 0
    ]);

    return [header, ...rows];
}