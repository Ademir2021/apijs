import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL"
import { GenerateTokenProvider } from '../RefreshToken/GenerateTokenProvider';
import dayjs from "dayjs"

export class RefreshTokenUser {

    async handleRefreshToken(refresh_token: string) {

        const user_id = refresh_token

        try {
            const res_refresh_token = await postgreSQL.query("SELECT expires_in, user_, user_id FROM refresh_token WHERE user_id = '" + user_id + "' LIMIT(1)")

            /**Verifica se o token expirou */
            const refreshTokenExpired = dayjs().isAfter(dayjs.unix(res_refresh_token.rows[0].expires_in))

            const generateTokenProvider = new GenerateTokenProvider()
            const token = await generateTokenProvider.handleExecute(res_refresh_token.rows[0].user_id)

            if (refreshTokenExpired) {
                // Apaga tokens invalidos
                const user_ = res_refresh_token.rows[0].user_
                await postgreSQL.query("DELETE FROM refresh_token WHERE user_ = '" + user_ + "'")
                //Gera token novamente
                const generateTokenProvider = new GenerateTokenProvider()
                const newRefreshToken = await generateTokenProvider.handleExecute(res_refresh_token.rows[0].user_id)

                return { token, newRefreshToken }
            }

            return { token }

        } catch (err) {
            console.log("Error Occurred !!" + err)
            return "Refresh_token invalido"
        }
    }
}
