import { IClasse } from "../../Interfaces/Classe/Classe";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class ClasseProdDAO extends DAO {
    public static table = 'classes_prods'
    async insert(ClasseProd: IClasse) {
        try {
            const query = `INSERT INTO ${ClasseProdDAO.table} (name_classe) VALUES($1)`;
            const values = [ClasseProd.name];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new ClasseProdDAO().errors(err);
        }
    }
    async update(ClasseProd: IClasse) {
        try {
            const query = `UPDATE ${ClasseProdDAO.table}
            SET
             name_classe = $1
             WHERE id_classe = $2`;
            const values = [
                ClasseProd.name,
                ClasseProd.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            // console.log(ClasseProd)
            return new ClasseProdDAO().errors(err);
        }
    }
}

export { ClasseProdDAO }