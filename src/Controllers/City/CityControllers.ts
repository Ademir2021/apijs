import { Request, Response } from "express"
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";

class CityControllers {
    async select(request: Request, response: Response) {
        try {
            const res = await postgreSQL.query("SELECT * FROM cities");
            response.json(res.rows);
        } catch (err) {
            console.log("Error Ocurred ! " + err)
        }
    };

    async selectOnCity(request: Request, response: Response) {
        try {
            const { id } = request.params
            const res = await postgreSQL.query("SELECT name_city FROM cities WHERE id_city = '" + id + "' LIMIT(1)")
            response.json(res.rows[0]);
        } catch (err) {
            response.json("Error Occurred !!" + err)
        }
    };
}

export {CityControllers}