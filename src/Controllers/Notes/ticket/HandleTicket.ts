import { IReportNotes, TMoney, TNote } from "../../../Interfaces/Note/Note"

class HandleTicket {
    private bodyTicket (Note:TNote){
        const ticketTXT = `
        FANTASIA: ${Note.fantasia} 
        RAZAO SOCIAL: ${Note.filial}
        `

        return ticketTXT;
    };

     generateFileTXT(Note: TNote, nameFile: string) {
        const res: any | TNote = this.bodyTicket(Note)
        const blob = new Blob([res], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = nameFile;
        a.click();
        URL.revokeObjectURL(url);
    }
}

export { HandleTicket }