import { Router} from "express"
import {AuthenticateJwt}  from "../Authenticate/Authenticate"

const routerAutheticate = Router()
const authenticateJwt = new AuthenticateJwt()

routerAutheticate.post("/auth", authenticateJwt.handleJwt)

export {routerAutheticate}