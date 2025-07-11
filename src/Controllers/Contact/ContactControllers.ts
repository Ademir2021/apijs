import { Request, Response } from "express"
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { HandleService } from "../../Providers/Mail/nodeMailer"

type TContact = {
    name: string;
    email: string;
    phone: string;
    comments: string;
}

const handleService: HandleService = new HandleService()

class ContactConttrollers {

    async select(request: Request, response: Response) {
        const { user_id } = request.params
        try {
            const res_ = await postgreSQL.query("SELECT * FROM users WHERE  id = '" + user_id + "'")
            if (res_.rows[0].privilege != 2) {
                response.json(null)
            } else {
                const res = await postgreSQL.query("SELECT * FROM contacts ")
                response.json(res.rows);
            }
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insert(request: Request, response: Response) {
        const { name, email, phone, comments } = <TContact>request.body
        try {
            handleService.setSendMail(name, email, phone, comments)
            await postgreSQL.query('INSERT INTO contacts(name, email, phone, comments) VALUES (' + "'" + name + "', '" + email + "', '" + phone + "', '" + comments + "');")
            const res_name = await postgreSQL.query("SELECT name FROM contacts WHERE name = '" + name + "' LIMIT(1)")
            response.json(res_name.rows[0].name + ' Seu contato foi registrado com sucesso !')
        } catch (err) {
            response.json("Error Occurred !" + err)
        }
    }
}

export { ContactConttrollers }