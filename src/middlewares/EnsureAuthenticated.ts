import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ")

    try {
        verify(token, "0103adcc-3d80-45f6-a2b3-9425aeff7ce7")

        return next()
    } catch (err) {
        return response.status(401).json({
            message: "Token invalid"
        })
    }
}