import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL"

abstract class DAO {
    public id: number = 0;
    public name: string = "";

    protected errors(err: unknown) {
        return `Error occurred: ${err}`;
    }

    protected isValidIdentifier(value: string): boolean {
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
    }

    public async select(table: string, field: string) {
        if (!this.isValidIdentifier(table) || !this.isValidIdentifier(field)) {
            return this.errors("Invalid table or field name");
        }

        try {
            const query = `SELECT * FROM ${table} ORDER BY ${field}`;
            const res = await postgreSQL.query(query);
            return res.rows;
        } catch (err) {
            return this.errors(err);
        }
    }

    public async selectLimit(table: string, field: string, limit: number = 8) {
        if (!this.isValidIdentifier(table) || !this.isValidIdentifier(field)) {
            return this.errors("Invalid table or field name");
        }

        try {
            const query = `SELECT * FROM ${table} ORDER BY ${field} DESC LIMIT $1`;
            const res = await postgreSQL.query(query, [limit]);
            return res.rows;
        } catch (err) {
            return this.errors(err);
        }
    }

    public async selectOne(table: string, id: number, field: string) {
        try {
            const query = `SELECT * FROM ${table} WHERE ${field} = $1`;
            const res = await postgreSQL.query(query, [id]);

            if (res.rowCount !== 0) {
                return res.rows;
            } else {
                return `ID: ${id} não localizado`;
            }
        } catch (err) {
            return this.errors(err);
        }
    }


    public async selectHandle(table: string, field: string, value: string | number) {
        if (!this.isValidIdentifier(table) || !this.isValidIdentifier(field)) {
            return this.errors("Invalid table or field name");
        }

        try {
            const query = `SELECT * FROM ${table} WHERE ${field} = $1`;
            const res = await postgreSQL.query(query, [value]);
            return res.rows;
        } catch (err) {
            return this.errors(err);
        }
    }

    public async delete(table: string, field: number | any, id: number | string) {
        if (!this.isValidIdentifier(table) || !this.isValidIdentifier(field)) {
            return this.errors("Invalid table or field name");
        }

        try {
            const query = `DELETE FROM ${table} WHERE ${field} = $1`;
            const res = await postgreSQL.query(query, [id]);
            return res.rowCount
                ? `ID: ${id} deletado com sucesso`
                : `ID: ${id} não localizado`;
        } catch (err) {
            return this.errors(err);
        }
    }
}

export { DAO }