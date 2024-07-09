import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from "../dto";

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is not Provided"],
        lowecase: true,
        trim: true,
        unique: true,
        validate: [
            {
                validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
                message: "{VALUE} is not a valid email!",
            },
        ],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: [true, "Please specify the role"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Password not Provided"],
        minlength: [8, "Password must have minimum 8 character"],
    },
    phoneNumber: {
        type: String,
        minlength: [10, "phone Number must have minimum 10 character"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

const User = mongoose.model<IUser>("User", UserSchema);
export { User };
