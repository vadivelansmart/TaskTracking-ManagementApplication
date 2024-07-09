export interface IUser {
    firstName?: string,
    lastName?: string;
    email?: string,
    phoneNumber?: string,
    password?: string,
    role?: string
    createdAt?: string,
    updatedAt?: string
}
export interface ILogin {
    email?: string,
    password?: string,
}