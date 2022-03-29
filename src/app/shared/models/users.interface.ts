export interface UserLogin{
  email:string,
  password:string
}

export interface UserReg{
  email:string,
  password:string,
  rol:number
}

export interface Users{
  id_user:number,
  email:string,
  rol:string
}

export interface User{
  email:string,
  password:string,
  rol:string
}

export interface AuthLog{
  type?:string;
  token?: any
}
