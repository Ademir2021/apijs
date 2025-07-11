import { Router } from "express"
import { ConttrollersNotes } from "../Controllers/Notes/NotesControllers";

const routeNotes = Router();
const conttrollersNotes = new ConttrollersNotes()

routeNotes.get('/note/:num_nota', conttrollersNotes.select)

export { routeNotes }