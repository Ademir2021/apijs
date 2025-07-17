import { DAO } from "../DAO/DAO";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { IPerson } from "../../Interfaces/Person/Person";

class PersonDAO extends DAO {
    public static table = "persons";

    async insert(Person: IPerson) {
        try {
            const query = `
                INSERT INTO ${PersonDAO.table}
                (name_pers, cpf_pers, phone_pers, address_pers, num_address, fk_name_filial, fk_id_user, bairro_pers, fk_cep, rg, cnpj, inscricao, fantasia, limit_cred, fk_grupo)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            `;
            const values = [
                Person.name,
                Person.cpf_pers,
                Person.phone_pers,
                Person.address_pers,
                Person.num_address,
                Person.fk_name_filial,
                Person.fk_id_user,
                Person.bairro_pers,
                Person.fk_cep,
                Person.rg,
                Person.cnpj,
                Person.inscricao,
                Person.fantasia,
                Person.limit_cred,
                Person.fk_grupo
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new PersonDAO().errors(err);
        }
    }

    async update(Person: IPerson) {
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
                    fk_grupo = $14
                WHERE id_person = $15
            `;
            const values = [
                Person.name,
                Person.cpf_pers,
                Person.phone_pers,
                Person.address_pers,
                Person.num_address,
                Person.bairro_pers,
                Person.fk_cep,
                Person.fk_name_filial,
                Person.rg,
                Person.cnpj,
                Person.inscricao,
                Person.fantasia,
                Person.limit_cred,
                Person.fk_grupo,
                Person.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new PersonDAO().errors(err);
        }
    }
}

export { PersonDAO }