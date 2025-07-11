import { DAO } from "../DAO/DAO";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { IPerson } from "../../Interfaces/Person/Person";

class PersonDAO extends DAO {
    public static table = "persons"
    async insert(Person: IPerson) {
        try {
            await postgreSQL.query('INSERT INTO ' + PersonDAO.table + '(name_pers, cpf_pers, phone_pers, address_pers, num_address, fk_name_filial, fk_id_user, bairro_pers, fk_cep, rg, cnpj, inscricao, fantasia, limit_cred, fk_grupo) VALUES (' + "'" + Person.name + "', '" + Person.cpf_pers + "', '" + Person.phone_pers + "', '" + Person.address_pers + "', '" + Person.num_address + "', '" + Person.fk_name_filial + "', '" + Person.fk_id_user + "', '" + Person.bairro_pers + "', '" + Person.fk_cep + "', '" + Person.rg + "', '" + Person.cnpj + "', '" + Person.inscricao + "', '" + Person.fantasia + "', '" + Person.limit_cred + "', '" + Person.fk_grupo + "')")
        } catch (err) {
            return (new PersonDAO().errors(err))
        }
    };
    async update(Person: IPerson) {
        try {
            await postgreSQL.query("UPDATE " + PersonDAO.table + " SET updated_at =  now(), name_pers = '" + Person.name + "', cpf_pers = '" + Person.cpf_pers + "', phone_pers ='" + Person.phone_pers + "', address_pers ='" + Person.address_pers + "', num_address = '" + Person.num_address + "', bairro_pers = '" + Person.bairro_pers + "', fk_cep = '" + Person.fk_cep + "', fk_name_filial = '" + Person.fk_name_filial + "', rg = '" + Person.rg + "', cnpj = '" + Person.cnpj + "', inscricao = '" + Person.inscricao + "', fantasia = '" + Person.fantasia + "', limit_cred = '" + Person.limit_cred + "', fk_grupo = '" + Person.fk_grupo + "' WHERE id_person = '" + Person.id + "'")
        } catch (err) {
            return (new PersonDAO().errors(err))
        }
    };
}
export { PersonDAO }