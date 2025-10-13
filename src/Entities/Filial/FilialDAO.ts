import { IFilial } from "../../Interfaces/Filial/Filial";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class FilialDAO extends DAO {

    public static table = 'filiais'

    async insert(Filial: IFilial) {
        try {
            const query = `INSERT INTO ${FilialDAO.table}
            (name_filial, fantasia, address, cnpj, inscric, phone, email, fk_person)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
            const values = [
                Filial.name,
                Filial.fantasia,
                Filial.address,
                Filial.cnpj,
                Filial.inscric,
                Filial.phone,
                Filial.email,
                Filial.id_person
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new FilialDAO().errors(err);
        }
    }

    async update(Filial: IFilial) {
        try {
            const query = `UPDATE ${FilialDAO.table}
            SET
             updated_at = now(),
             name_filial = $1,
             fantasia = $2,
             address =$3,
             cnpj = $4,
             inscric = $5,
             phone = $6,
             email = $7,
             fk_person = $8
             WHERE id_filial = $9`;
            const values = [
                Filial.name,
                Filial.fantasia,
                Filial.address,
                Filial.cnpj,
                Filial.inscric,
                Filial.phone,
                Filial.email,
                Filial.id_person,
                Filial.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            // console.log(Sector)
            return new FilialDAO().errors(err);
        }
    }
}

export { FilialDAO }