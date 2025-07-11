export type IUser = {
    id:number
    name:string 
    username:string
    password:string
    privilege:number
}

export type IUserRecoverPass = {
    username: string // Email
    password:string
    hash:string
  }