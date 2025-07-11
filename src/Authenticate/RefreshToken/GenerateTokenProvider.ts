import { sign } from "jsonwebtoken"

export class GenerateTokenProvider {

    async handleExecute(userId: string) {
        const token = sign({}, "0103adcc-3d80-45f6-a2b3-9425aeff7ce7", {
            subject: userId,
            expiresIn: "99s"
        })
        return token
    }
}