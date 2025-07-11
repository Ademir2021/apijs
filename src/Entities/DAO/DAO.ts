import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL"

abstract class DAO {
    public id: number = 0
    public name: string = ""
    protected errors(err: unknown) {
        return "Error occurred ! " + err
    };
    
    public async select(table: string, filed: string) {
        try {
            const res = await postgreSQL.query("SELECT * FROM " + table + " ORDER BY " + filed + "")
            return res.rows
        } catch (err) {
            return (this.errors(err))
        }
    };

    public async selectLimit(table: string, filed: string) {
        try {
            const res = await postgreSQL.query("SELECT * FROM " + table + " ORDER BY " + filed + " DESC LIMIT 8")
            return res.rows
        } catch (err) {
            return (this.errors(err))
        }
    };

    public async selectOne(table: string, id: number, field: string) {
        try {
            const res = await postgreSQL.query("SELECT * FROM " + table + " WHERE " + field + " = " + id + "")
            if (res.rowCount !== 0) {
                return res.rows
            } else {
                return "ID:" + id + ", não localizado"
            }
        } catch (err) {
            return (this.errors(err))
        }
    };

    async selectHandle(table: string, field1: string, field2: string | number) {
        try {
            const res = await postgreSQL.query("SELECT * FROM " + table + " WHERE " + field1 + " = '" + field2 + "'")
            return (res.rows);
        } catch (err) {
            return (this.errors(err))
        }
    };

    public async delete(table: string, id: number, id_: string) {
        try {
            const res = await postgreSQL.query("DELETE FROM " + table + " WHERE " + id + " = " + id_ + "")
            if (res.rowCount !== 0) {
                return "ID:" + res.rowCount + ", deletado com sucesso"
            } else {
                return "ID:" + id + ", não localizado"
            }
        } catch (err) {
            return (this.errors(err))
        }
    };
}

export { DAO }