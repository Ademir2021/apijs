import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL"
import { DAO } from "../DAO/DAO";
import { IUser, IUserRecoverPass } from "../../Interfaces/User/User";

class UserDAO extends DAO {
    public static table = "users";

    async insertUser(User: IUser) {
        try {
            const query = `
                INSERT INTO ${UserDAO.table} (name, username, password)
                VALUES ($1, $2, $3)
            `;
            const values = [User.name, User.username, User.password];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new UserDAO().errors(err);
        }
    }

    async updateUser(User: IUser) {
        try {
            const query = `
                UPDATE ${UserDAO.table}
                SET 
                    updated_at = now(),
                    name = $1,
                    username = $2,
                    password = $3
                WHERE id = $4
            `;
            const values = [User.name, User.username, User.password, User.id];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new UserDAO().errors(err);
        }
    }

    async selectUsername(User: IUser) {
        try {
            const query = `
                SELECT id, name, username, password, privilege
                FROM ${UserDAO.table}
                WHERE username = $1
            `;
            const values = [User.username];
            const res = await postgreSQL.query(query, values);
            return res.rows;
        } catch (err) {
            return new UserDAO().errors(err);
        }
    }

    async userRecoverPass(User: IUserRecoverPass) {
        try {
            const query = `
                SELECT username
                FROM ${UserDAO.table}
                WHERE username = $1
            `;
            const values = [User.username];
            const res = await postgreSQL.query(query, values);
            return res.rows;
        } catch (err) {
            return new UserDAO().errors(err);
        }
    }

    async recoverUpdateUser(User: IUserRecoverPass) {
        try {
            const query = `
                UPDATE ${UserDAO.table}
                SET 
                    updated_at = now(),
                    password = $1
                WHERE username = $2
            `;
            const values = [User.password, User.username];
            await postgreSQL.query(query, values);
        } catch (err) {
            return new UserDAO().errors(err);
        }
    }
}

export { UserDAO }


