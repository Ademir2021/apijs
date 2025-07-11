import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL"
import { DAO } from "../DAO/DAO";
import { IUser, IUserRecoverPass } from "../../Interfaces/User/User";

class UserDAO extends DAO {
    public static table = "users"
    async insertUser(User: IUser) {
        try {
            await postgreSQL.query('INSERT INTO ' + UserDAO.table + ' (name, username, password) VALUES (' + "'" + User.name + "', '" + User.username + "', '" + User.password + "')")
        } catch (err) {
            return (new UserDAO().errors(err))
        }
    };
    async updateUSer(User: IUser) {
        try {
            await postgreSQL.query("UPDATE " + UserDAO.table + " SET updated_at = now(), name = '" + User.name + "', username = '" + User.username + "', password = '" + User.password + "' WHERE id = '" + User.id + "'")
        } catch (err) {
            return (new UserDAO().errors(err))
        }
    };
    async selectUsername(User: IUser) {
        try {
            const res = await postgreSQL.query("SELECT id, name, username, password, privilege FROM " + UserDAO.table + " WHERE username = '" + User.username + "'")
            return res.rows
        } catch (err) {
            return (new UserDAO().errors(err))
        }
    };

    async userRecoverPass(User:IUserRecoverPass){
        try {
            const res = await postgreSQL.query("SELECT username FROM " + UserDAO.table + " WHERE username = '" + User.username + "'")
            return res.rows
        } catch (err) {
            return (new UserDAO().errors(err))
        }
    };

    async recoverUpdateUSer(User: IUserRecoverPass) {
        try {
            await postgreSQL.query("UPDATE " + UserDAO.table + " SET updated_at = now(), password = '" + User.password + "' WHERE username = '" + User.username + "'")
        } catch (err) {
            return (new UserDAO().errors(err))
        }
    };
}
export { UserDAO }

