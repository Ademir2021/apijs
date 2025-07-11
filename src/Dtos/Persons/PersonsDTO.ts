import { IPerson } from "../../Interfaces/Person/Person"
import { PersonDAO } from "../../Entities/Person/PersonDAO"

const table = PersonDAO.table
const msgPhoneAlreadyExists = 'Este número de telefone já existe'
const msgCPFAlreadyExists = 'Este CPF pertence a outro Cliente'
const msgCNPJAlreadyExists = 'Este CNPJ pertence a outro Cliente'
const msgRecordSucess = 'Cliente gravado com sucesso'
const msgPersonNotFound = 'Cliente não localizada'
const msgPersonUpdatedSuccessfully = 'Cliente atualizado com sucesso'

class PersonsDTO {
    private async findPerson(Person: IPerson) {
        const person = await new PersonDAO().selectHandle(table, 'id_person', Person.id)
        return person
    };
    private async findPersonPhone(Person: IPerson) {
        const person = await new PersonDAO().selectHandle(table, 'phone_pers', Person.phone_pers)
        return person
    };
    private async findPersonCPF(Person: IPerson) {
        const person = await new PersonDAO().selectHandle(table, 'cpf_pers', Person.cpf_pers)
        return person
    };
    private async findPersonCNPJ(Person: IPerson) {
        const person = await new PersonDAO().selectHandle(table, 'cnpj', Person.cnpj)
        return person
    };
    async savePerson(Person: IPerson) {
        const personCPF = await this.findPersonCPF(Person)
        if (!personCPF[0] || personCPF[0].cpf_pers == '0' || personCPF[0].cpf_pers == '') {
            const personPhone = await this.findPersonPhone(Person)
            if (personPhone[0]) {
                return (msgPhoneAlreadyExists)
            } else {
                const personCNPJ = await this.findPersonCNPJ(Person)
                if (!personCNPJ[0] || personCNPJ[0].cnpj == '0' || personCNPJ[0].cnpj == '') {
                    const person = await new PersonDAO().insert(Person)
                    return (msgRecordSucess)
                } else {
                    return msgCNPJAlreadyExists
                }
            }
        } else {
            return (msgCPFAlreadyExists)
        }
    };
    async updatePerson(Person: IPerson) {
        const person: any = await this.findPerson(Person)
        if (person[0].id_person === Person.id) {
            const res = await new PersonDAO().update(Person)
            return (msgPersonUpdatedSuccessfully)
        } else {
            return (msgPersonNotFound)
        }
    };
    async listPersons() {
        const resp = await new PersonDAO().select(table, 'id_person')
        return resp
    };
    async listPerson(id: number) {
        const resp = await new PersonDAO().selectOne(table, id, 'id_person')
        return resp
    };
    async listPersonsByLoggedInUser(id: number, privilege: number) {
        if (privilege == 2) {
            const resp = await new PersonDAO().select(table, 'id_person')
            return resp
        } else {
            const resp = await new PersonDAO().selectOne(table, id, 'fk_id_user')
            return resp
        }
    };
    async deletePerson(id: number) {
        const resp = await new PersonDAO().delete(table, id, 'id_person')
        return resp
    };
}
export { PersonsDTO }