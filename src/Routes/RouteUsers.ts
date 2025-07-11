import { Router } from "express"
import { UserControllers } from "../Controllers/User/UserControllers";
import { postgreSQL } from "../Providers/Storages/pg/postgreSQL";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

postgreSQL.connect()

const routeUsers = Router();
const userControllers= new UserControllers()

routeUsers.post('/users_list', ensureAuthenticated, userControllers.listUsers)
routeUsers.post('/user_list', userControllers.listUser)
routeUsers.post('/user', userControllers.saveUser)
routeUsers.put('/user_update', userControllers.updateUser)
routeUsers.delete('/user_delete', userControllers.deleteUser)
routeUsers.post('/login', ensureAuthenticated, userControllers.userLogin)
routeUsers.post('/user_recover_pass',  userControllers.userRecoverPass)

export { routeUsers }