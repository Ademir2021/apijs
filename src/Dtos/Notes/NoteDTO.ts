import { Note } from "../../Entities/Note/Note"
import { NoteDAO } from "../../Entities/Note/NoteDAO"

const noteDAO = new NoteDAO()
class NoteDTO {
    async getNote(id:string) {
        const resNote = await noteDAO.getNote(id)
        return resNote
    }
    async getItemsNote(id:string) {
        const itemsNote = await noteDAO.getItemsNote(id)
        return itemsNote
    }
    async getInvoices(id:string) {
        const invoiceNote = await noteDAO.getInvoices(id)
        return invoiceNote
    }
    async getMoney(id:string) {
        const moneyNote = await noteDAO.getMoney(id)
        return moneyNote
    }
}
export { NoteDTO }