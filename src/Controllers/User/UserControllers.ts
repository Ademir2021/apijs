import { Request, Response } from "express"
import { IUser, IUserRecoverPass } from "../../Interfaces/User/User"
import { User } from "../../Entities/User/User"
import { UsersServices } from "../../Services/Users/UsersServices"

class UserControllers {
    async saveUser(request: Request, response: Response) {
        const { id, name, username, password, privilege }: IUser = <IUser>request.body
        const user: User = new User(id, name, username, password, privilege)
        const resp = await new UsersServices().saveUser(user)
        response.json(resp)
    };
    async updateUser(request: Request, response: Response) {
        const { id, name, username, password, privilege }: IUser = <IUser>request.body
        const user: User = new User(id, name, username, password, privilege)
        const resp = await new UsersServices().updateUser(user)
        response.json([resp, user])
    };
    async listUsers(request: Request, response: Response) {
        const { id, privilege }: IUser = <IUser>request.body[0]
        const resp = await new UsersServices().listUsersByLoggedInUser(id, privilege)
        response.json(resp)
    };
    async listUser(request: Request, response: Response) {
        const { id }: IUser = <IUser>request.body
        const resp = await new UsersServices().listUser(id)
        response.json(resp)
    };
    async userLogin(request: Request, response: Response) {
        const { id, name, username, password, privilege }: IUser = <IUser>request.body
        const user: User = new User(id, name, username, password, privilege)
        const userLogin = await new UsersServices().loginUser(user)
        response.json(userLogin)
    };
    async userRecoverPass(request:Request, response:Response){
        const userRecover:IUserRecoverPass = request.body
        const resp = await new UsersServices().userRecoverPass(userRecover)
        response.json(resp)
    };
    async deleteUser(request: Request, response: Response) {
        const { id }: IUser = <IUser>request.body
        const resp = await new UsersServices().deleteUser(id)
        response.json(resp)
    };
}

export { UserControllers }
