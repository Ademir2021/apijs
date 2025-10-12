import { ISubSector } from "../../Interfaces/SubSector/SubSector";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";


class SubSectorDAO extends DAO {

    public static table = 'sub_sectors'

    async insert(SubSector: ISubSector) {
        try {
            const query = `INSERT INTO ${SubSectorDAO.table} (name_sub_sector, description_sub_sector, fk_sector) VALUES($1,$2,$3)`;
            const values = [
                SubSector.name,
                SubSector.description,
                SubSector.id_sector
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new SubSectorDAO().errors(err);
        }
    }

    async update(SubSector: ISubSector) {
        try {
            const query = `UPDATE ${SubSectorDAO.table}
            SET
             updated_at = now(),
             name_sub_sector = $1,
             description_sub_sector = $2,
             fk_sector = $3
             WHERE id_sub_sector = $4`;
            const values = [
                SubSector.name,
                SubSector.description,
                SubSector.id_sector,
                SubSector.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            // console.log(Sector)
            return new SubSectorDAO().errors(err);
        }
    }
}

export { SubSectorDAO }