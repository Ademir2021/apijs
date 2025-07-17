import { IUser, IUserRecoverPass } from "../../Interfaces/User/User"
import { UserDAO } from "../../Entities/User/UserDAO"
import { UsersDTO } from "../../Dtos/Users/UsersDTO"
import { HandleService } from "../../Providers/Mail/nodeMailer"

class UsersServices {
    async saveUser(User:IUser){
        const resp = await new UsersDTO().saveUser(User)
        return resp
    };
    async updateUser(User:IUser){
        const resp = await new UsersDTO().updateUser(User)
        return resp
    };
    async listUsersByLoggedInUser(id:number, privilege:number){
        const resp = await new UsersDTO().listUsersByLoggedInUser(id, privilege)
        return resp
    };
    async listUser(id:number){
        const resp = await new UsersDTO().listUser(id)
    };
    async loginUser(User: IUser) {
        const userLogin = await new UserDAO().selectUsername(User)
        return (userLogin)
    };
    async userRecoverPass(User: IUserRecoverPass) {
        const resp = await new UsersDTO().userRecoverPass(User)
        const res = await new UserDAO().recoverUpdateUser(User)
        const handleService = new HandleService()
        handleService.setSendMailRecoverUserPass(User.username, User.hash )
        return resp
    };
    async deleteUser(id:number){
        const resp = await new UsersDTO().deleteUser(id)
        return resp
    }

}

export { UsersServices }