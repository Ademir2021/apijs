import { IProduct, IListProductQuery } from "../../Interfaces/Product/Product";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class ProductDAO extends DAO {

    public static table = "products"

    async insert(Product: IProduct) {
        try {
            await postgreSQL.query('INSERT INTO ' + ProductDAO.table + '("descric_product", "val_max_product", "val_min_product", "fk_brand", "fk_sector", "fk_un_med", "bar_code", "image", "fk_classe", "fk_grupo_fiscal", "fk_tipo_prod", "ncm") VALUES ('
                + "'" + Product.name + "', '" + Product.valMax + "', '" + Product.valMin + "', '" + Product.fkBrand + "', '" + Product.fkSector + "', '" + Product.fk_un_med + "' ,'" + Product.barCode + "', '" + Product.image + "', '" + Product.fk_classe + "', '" + Product.fk_grupo_fiscal + "','" + Product.fk_tipo_prod + "','" + Product.ncm + "')")
        } catch (err) {
            return (new ProductDAO().errors(err))
        }
    };

    async update(Product: IProduct) {
        try {
            await postgreSQL.query("UPDATE " + ProductDAO.table + " SET updated_at = now(), descric_product = '" + Product.name + "', val_max_product = '"
                + Product.valMax + "', val_min_product ='" + Product.valMin + "', fk_brand = '" + Product.fkBrand + "', fk_sector = '" + Product.fkSector + "',fk_un_med= '" + Product.fk_un_med + "', bar_code = '" + Product.barCode + "', image = '" + Product.image + "', fk_classe = '" + Product.fk_classe + "', fk_grupo_fiscal = '" + Product.fk_grupo_fiscal + "', fk_tipo_prod = '" + Product.fk_tipo_prod + "', ncm = '" + Product.ncm + "' WHERE id_product = '" + Product.id + "'")
        } catch (err) {
            return (new ProductDAO().errors(err))
        }
    };

    async selectQuery(list: IListProductQuery) {
        try {
            const res = await postgreSQL.query("SELECT *FROM " + ProductDAO.table + " WHERE descric_product ILIKE '" + "%" + list.descric_product + "%" + "' OR fk_brand = '" + list.fk_brand + "' OR fk_sector = '" + list.fk_sector + "' ORDER BY descric_product")
            return res.rows
        } catch (err) {
            return (new ProductDAO().errors(err))
        }
    };
}

export { ProductDAO }