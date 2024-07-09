
import { IUser } from "../dto";
import { User } from "../models";

export const UserValidator = async (data: IUser) => {

    const isValidInput = Object.keys(data).length > 0 && data.password && data.password !== '';
    if(!isValidInput) {
        return {valid: false, type: "MALFORMED" as string}
    }
     const info = await User.findOne({email: data.email});
     return {valid: info === null, type: "EXISTS" as string, info}
     
}