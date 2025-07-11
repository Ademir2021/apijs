import { PersonsDTO } from "../../Dtos/Persons/PersonsDTO";
import { IPerson } from "../../Interfaces/Person/Person";

class PersonsServices {
    async savePerson(Person: IPerson) {
        const resp = await new PersonsDTO().savePerson(Person)
        return resp
    };
    async updatePerson(Person: IPerson) {
        const resp = await new PersonsDTO().updatePerson(Person)
        return resp
    };
    async listPersons() {
        const resp = await new PersonsDTO().listPersons()
        return resp
    };
    async listPerson(id: number) {
        const resp = await new PersonsDTO().listPerson(id)
        return resp
    };
    async listPersonsByLoggedInUser(id: number, privilege: number) {
        const resp = await new PersonsDTO().listPersonsByLoggedInUser(id, privilege)
        return resp
    };
    async deletePerson(id: number) {
        const resp = await new PersonsDTO().deletePerson(id)
        return resp
    };
}
export { PersonsServices }