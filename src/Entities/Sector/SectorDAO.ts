import { ISector } from "../../Interfaces/Sector/Sector";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class SectorDAO extends DAO {
    public static table = 'sectors'
    async insert(Sector: ISector) {
        try {
            const query = `INSERT INTO ${SectorDAO.table} (name_sector) VALUES($1)`;
            const values = [Sector.name];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new SectorDAO().errors(err);
        }
    }
    async update(Sector: ISector) {
        try {
            const query = `UPDATE ${SectorDAO.table}
            SET
             updated_at = now(),
             name_sector = $1
             WHERE id_sector = $2`;
            const values = [
                Sector.name,
                Sector.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            // console.log(Sector)
            return new SectorDAO().errors(err);
        }
    }
}

export { SectorDAO }