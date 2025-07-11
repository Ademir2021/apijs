import { Router } from "express"
import { PersonsControllers } from "../Controllers/Person/PersonsControllers"
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated"

const routerPersons = Router()
const personsControllers = new PersonsControllers()

routerPersons.post('/persons_list', personsControllers.listPersons)
routerPersons.post('/persons_user', ensureAuthenticated, personsControllers.listUserPersons)
routerPersons.post('/person_list', personsControllers.listPerson)
routerPersons.post('/person', personsControllers.savePerson)
routerPersons.put('/person_update', personsControllers.updatePerson)
routerPersons.delete('/person_delete', personsControllers.deletePerson)

export { routerPersons }