import { NoteDAO } from "../../Entities/Note/NoteDAO"
const noteDAO = new NoteDAO()
class NoteDTO {
    async getNote(id: string) {
        const note = await noteDAO.getNote(id)
        return note
    }
    async getItemsNote(id: string) {
        const itemsNote = await noteDAO.getItemsNote(id)
        return itemsNote
    }
    async getInvoices(id: string) {
        const invoiceNote = await noteDAO.getInvoices(id)
        return invoiceNote
    }
    async getMoney(id: string) {
        const moneyNote = await noteDAO.getMoney(id)
        return moneyNote
    }
}
export { NoteDTO }