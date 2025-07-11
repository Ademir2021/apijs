import { Router } from "express"
import { RefreshTokenUserController} from "./RefreshTokenUserController";

const routeRefreshToken = Router();
const refreshTokenUserController = new RefreshTokenUserController()

routeRefreshToken.post("/refresh_token", refreshTokenUserController.handle)

export { routeRefreshToken }