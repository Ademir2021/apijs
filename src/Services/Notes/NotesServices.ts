import { NoteDTO } from "../../Dtos/Notes/NoteDTO";

const noteDTO = new NoteDTO()

class NotesServices {
    async getNote(id: string) {
        const note = await noteDTO.getNote(id)
        return note
    }
    async getItemsNote(id: string) {
        const itemsNote = await noteDTO.getItemsNote(id)
        return itemsNote
    }
    async getInvoice(id: string) {
        const invoiceNote = await noteDTO.getInvoices(id)
        return invoiceNote
    }
    async getMoney(id: string) {
        const moneyNote = await noteDTO.getMoney(id)
        return moneyNote
    }
}

export { NotesServices }