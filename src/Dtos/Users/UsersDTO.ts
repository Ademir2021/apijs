import { IUser, IUserRecoverPass } from "../../Interfaces/User/User"
import { UserDAO } from "../../Entities/User/UserDAO"

const table = UserDAO.table
const msgAlreadyExists = { msg: 'Email já existe' }
const msgRecordSucess = { msg: 'Usuário cadastrado com sucesso' }
const msgUserNotFound = { msg: 'User não Localizado' }
const msgUserUpdatedSuccessfully = { msg: 'Usuário Atualizado com Sucesso' }

class UsersDTO {
    private async findUser(User: IUser) {
        const user = await new UserDAO().selectOne(table, User.id, 'id')
        return user
    };
    private async findUserName(User: IUser) {
        const userName = await new UserDAO().selectUsername(User)
        return userName
    };
    async saveUser(User: IUser) {
        const user: any = await this.findUserName(User)
        if (user[0]) {
            return ([msgAlreadyExists])
        } else {
            await new UserDAO().insertUser(User)
            return ([msgRecordSucess])
        }
    };
    async updateUser(User: IUser) {
        const user: any = await this.findUser(User)
        if (user[0].id === User.id) {
            const user = await new UserDAO().updateUSer(User)
            return (msgUserUpdatedSuccessfully)
        } else {
            return (msgUserNotFound)
        }
    };
    async listUser(id:number){
        const resp = await new UserDAO().selectOne(table, id, 'id')
        return resp
    };
    async listUsersByLoggedInUser(id: number, privilege: number) {
        if (privilege == 2) {
            const users = await new UserDAO().select(table, 'id')
            return (users)
        } else {
            const users = await new UserDAO().selectOne(table, id, 'id')
            return (users)
        }
    };
    async userRecoverPass(User: IUserRecoverPass) {
        const resp: any = await new UserDAO().userRecoverPass(User)
        if (resp[0]) {
            return resp
        } else {
            return ([msgUserNotFound])
        }
    };
    async deleteUser(id:number){
        const resp = await new UserDAO().delete( table, id, 'id')
        return resp
    };
}

export { UsersDTO }