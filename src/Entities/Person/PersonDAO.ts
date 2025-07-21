import { DAO } from "../DAO/DAO";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { IPerson } from "../../Interfaces/Person/Person";

class PersonDAO extends DAO {
    public static table = "persons";

    async insert(person: IPerson) {
        try {
            const query = `
                INSERT INTO ${PersonDAO.table}
                (name_pers, cpf_pers, phone_pers, address_pers, num_address,
                fk_name_filial, fk_id_user, bairro_pers, fk_cep, rg, cnpj,
                inscricao, fantasia, limit_cred, fk_grupo, date_of_birth, age )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`;
            const values = [
                person.name,
                person.cpf_pers,
                person.phone_pers,
                person.address_pers,
                person.num_address,
                person.fk_name_filial,
                person.fk_id_user,
                person.bairro_pers,
                person.fk_cep,
                person.rg,
                person.cnpj,
                person.inscricao,
                person.fantasia,
                person.limit_cred,
                person.fk_grupo,
                person.date_of_birth,
                person.age
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new PersonDAO().errors(err);
        }
    }

    async update(person: IPerson) {
        try {
            const query = `
                UPDATE ${PersonDAO.table}
                SET 
                    updated_at = now(),
                    name_pers = $1,
                    cpf_pers = $2,
                    phone_pers = $3,
                    address_pers = $4,
                    num_address = $5,
                    bairro_pers = $6,
                    fk_cep = $7,
                    fk_name_filial = $8,
                    rg = $9,
                    cnpj = $10,
                    inscricao = $11,
                    fantasia = $12,
                    limit_cred = $13,
                    fk_grupo = $14,
                    date_of_birth = $16,
                    age = $17
                WHERE id_person = $15
            `;
            const values = [
                person.name,
                person.cpf_pers,
                person.phone_pers,
                person.address_pers,
                person.num_address,
                person.bairro_pers,
                person.fk_cep,
                person.fk_name_filial,
                person.rg,
                person.cnpj,
                person.inscricao,
                person.fantasia,
                person.limit_cred,
                person.fk_grupo,
                person.id,
                person.date_of_birth,
                person.age
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new PersonDAO().errors(err);
        }
    }
}

export { PersonDAO }