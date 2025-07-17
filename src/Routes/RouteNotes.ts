import { Router } from "express"
import { ConttrolersNotes } from "../Controllers/Notes/NotesControllers";

const routeNotes = Router();
const conttrolersNotes = new ConttrolersNotes()

routeNotes.get('/note/:num_nota', conttrolersNotes.createNote)

export { routeNotes }