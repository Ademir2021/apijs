import { Request, Response } from "express"
import { postgreSQL } from "../Providers/Storages/pg/postgreSQL"
import { compare } from "bcrypt"
import { GenerateRefreshToken } from './RefreshToken/GenerateRefreshToken';
import { GenerateTokenProvider } from "./RefreshToken/GenerateTokenProvider";

interface IRequest {
    id:number
    username: string
    password: string
}

export class AuthenticateJwt {

    async handleJwt(request: Request, response: Response) {
        try {
            const { username, password}: IRequest = <IRequest>request.body
            const userAlreadExists = await postgreSQL.query("SELECT id, username, password FROM users WHERE username = '" + username + "' LIMIT(1)")

            const passwordMatch = await compare(password, userAlreadExists.rows[0].password)
            if (!passwordMatch) {
                response.json("Nome de Usuário ou senha inválido(a)")
            }
            else {
                let str_id = userAlreadExists.rows[0].id.toString()

                /**Gera token do Usuário */
                const generateTokenProvider = new GenerateTokenProvider()
                const token = await generateTokenProvider.handleExecute(str_id)

                /**Apaga token do usuario */
                const user_ = userAlreadExists.rows[0].id
                await postgreSQL.query("DELETE FROM refresh_token WHERE user_ = '" + user_ + "'")

                /**Gera refresh_token no banco */
                const generateRefreshToken = new GenerateRefreshToken()
                const refreshToken = await generateRefreshToken.insert(userAlreadExists.rows[0].id)

                response.json({ token, refreshToken })

                // return {token, refreshToken}
            }
        } catch (err) {
            // console.log("Error Ocorred !!: " + err)
            response.json("Usuário ou senha inválido")
        }
    }
}