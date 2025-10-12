import { IBrand } from "../../Interfaces/Brand/Brand";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class BrandDAO extends DAO {
    public static table = 'brands'
    async insert(Brand: IBrand) {
        try {
            const query = `INSERT INTO ${BrandDAO.table} (name_brand) VALUES($1)`;
            const values = [Brand.name];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new BrandDAO().errors(err);
        }
    }
    async update(Brand: IBrand) {
        try {
            const query = `UPDATE ${BrandDAO.table}
            SET
             updated_at = now(),
             name_brand = $1
             WHERE id_brand = $2`;
            const values = [
                Brand.name,
                Brand.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new BrandDAO().errors(err);
        }
    }
}

export { BrandDAO }