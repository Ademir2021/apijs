import { Request, Response } from "express"
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";

interface ICep {
    id_cep?: number;
    num_cep: string;
    code_city: number;
    type_cep: string;
    public_place: string; //logradouro
    num_initial: Number
    num_final: number
    complement: string
    created_at?: Date
    city: string | undefined | any;
    uf: string;
};

class CepControllers {

    async select(request: Request, response: Response) {
        try {
            const res = await postgreSQL.query("SELECT * FROM ceps");
            response.json(res.rows);

        } catch (err) {
            console.log("Error Ocurred ! " + err)
        }
    }

    async insert(request: Request, response: Response) {
        try {
            const cep: ICep = <ICep>request.body
            const res_cep = await postgreSQL.query("SELECT num_cep FROM ceps WHERE num_cep = '" + cep.num_cep + "' LIMIT(1)")
            try {
                cep.num_cep !== res_cep.rows[0].num_cep
                response.json("CEP já Cadastrado ! " + cep.num_cep)
            } catch {

                await postgreSQL.query('INSERT INTO cities(name_city, uf, code_ibge, code_state_revenue, code_country, code_federal_revenue) VALUES (' + "'" + cep.city + "', '" + cep.uf + "', '" + "0.0" + "' ,'" + 0.0 + "', '" + 1 + "', '" + 0 + "');")

                const res_num_city = await postgreSQL.query("SELECT MAX(id_city) FROM cities");
                const num_city: number = res_num_city.rows[0].max;

                await postgreSQL.query('INSERT INTO ceps(num_cep, code_city, type_cep, public_place, num_initial, num_final, complement, city, uf) VALUES (' + "'" + cep.num_cep + "', '" + num_city + "', '" + cep.type_cep + "', '" + cep.public_place + "', '" + cep.num_final + "', '" + cep.num_final + "', '" + cep.complement + "', '" + cep.city + "', '" + cep.uf + "');")
                const res = await postgreSQL.query("SELECT num_cep FROM ceps WHERE num_cep = '" + cep.num_cep + "' LIMIT(1)")
                response.json("CEP registrado com sucesso: " + res.rows[0].num_cep)
            }
        } catch (err) {
            console.log("Error Occurred !!: " + err)
        }
    };
}

export {CepControllers}