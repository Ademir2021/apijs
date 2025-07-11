import { Router } from "express"
import { ContactConttrollers } from "../Controllers/Contact/ContactControllers";

const routeContacts = Router();
const contactConttrollers = new ContactConttrollers()

routeContacts.get('/contacts/:user_id', contactConttrollers.select)
routeContacts.post('/contact', contactConttrollers.insert)

export { routeContacts }