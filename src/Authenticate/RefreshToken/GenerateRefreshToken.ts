import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL"
import dayjs from "dayjs"
import { v4 as uuidv4 } from 'uuid'

export class GenerateRefreshToken {
    async insert(userId: string) {
        try {
            const uuid_token = uuidv4()
            const expiresIn: number = dayjs().add(15, "second").unix()
            await postgreSQL.query('INSERT INTO refresh_token(expires_in, user_, user_id) VALUES (' + "'" + expiresIn + "', '" + userId + "', '" + uuid_token + "');")
            const generateRefreshToken = await postgreSQL.query("SELECT *FROM refresh_token ORDER BY id DESC LIMIT 1");
            return generateRefreshToken.rows[0]
        } catch (err) {
            console.log("Error Occurred !" + err)
        }
    };
}