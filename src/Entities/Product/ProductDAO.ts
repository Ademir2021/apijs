import { IProduct, IListProductQuery } from "../../Interfaces/Product/Product";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";
class ProductDAO extends DAO {
    public static table = "products";

    async insert(Product: IProduct) {
        try {
            const query = `
                INSERT INTO ${ProductDAO.table}
                (descric_product, val_max_product, val_min_product, fk_brand, fk_sub_sector, fk_un_med, bar_code, image, fk_classe, fk_grupo_fiscal, fk_tipo_prod, ncm)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            `;
            const values = [
                Product.name,
                Product.valMax,
                Product.valMin,
                Product.fkBrand,
                Product.fkSubSector,
                Product.fk_un_med,
                Product.barCode,
                Product.image,
                Product.fk_classe,
                Product.fk_grupo_fiscal,
                Product.fk_tipo_prod,
                Product.ncm
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new ProductDAO().errors(err);
        }
    }

    async update(Product: IProduct) {
        try {
            const query = `
                UPDATE ${ProductDAO.table}
                SET 
                    updated_at = now(),
                    descric_product = $1,
                    val_max_product = $2,
                    val_min_product = $3,
                    fk_brand = $4,
                    fk_sub_sector = $5,
                    fk_un_med = $6,
                    bar_code = $7,
                    image = $8,
                    fk_classe = $9,
                    fk_grupo_fiscal = $10,
                    fk_tipo_prod = $11,
                    ncm = $12
                WHERE id_product = $13
            `;
            const values = [
                Product.name,
                Product.valMax,
                Product.valMin,
                Product.fkBrand,
                Product.fkSubSector,
                Product.fk_un_med,
                Product.barCode,
                Product.image,
                Product.fk_classe,
                Product.fk_grupo_fiscal,
                Product.fk_tipo_prod,
                Product.ncm,
                Product.id
            ];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new ProductDAO().errors(err);
        }
    }

    async selectQuery(list: IListProductQuery) {
        try {
            const conditions: string[] = [];
            const values: any[] = [];
            let paramIndex = 1;

            if (list.descric_product) {
                conditions.push(`descric_product ILIKE $${paramIndex++}`);
                values.push(`%${list.descric_product}%`);
            }

            if (list.fk_brand) {
                conditions.push(`fk_brand = $${paramIndex++}`);
                values.push(list.fk_brand);
            }

            if (list.fk_sub_sector) {
                conditions.push(`fk_sub_sector = $${paramIndex++}`);
                values.push(list.fk_sub_sector);
            }

            const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" OR ")}` : "";

            const query = `
                SELECT * FROM ${ProductDAO.table}
                ${whereClause}
                ORDER BY descric_product
            `;

            const res = await postgreSQL.query(query, values);
            return res.rows;
        } catch (err) {
            return new ProductDAO().errors(err);
        }
    }
}

export { ProductDAO }