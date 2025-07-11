import { IUser } from "../../Interfaces/User/User"
import { UserDAO } from "./UserDAO"

class User extends UserDAO implements IUser {
    
    username: string = ''
    password: string = ''
    privilege: number = 0

    constructor(id: number, name: string, username: string, password: string, privilege: number) {
        super()
        this.id = id
        this.name = name
        this.username = username
        this.password = password
        this.privilege = privilege
    }

    getId() {
        if (this.id < 1)
            return "ID:" + this.id + " não pode ser menor que 1"
        if (this.id > 0)
            return "ID:" + this.id + " ID válido"
    };

    setId(id: number) {
        this.id = id
    };

    getName() {
        if (this.name === "Joao")
            return "Seu nome:" + this.name + " não pode ser este"
        if (this.name !== "Joao")
            return "Seu Nome:" + this.name + " é válido"
    };
    setName(name: string) {
        this.name = name
    };

}

export { User }