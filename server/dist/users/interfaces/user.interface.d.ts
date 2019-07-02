import { Document } from 'mongoose';
export interface User extends Document {
    readonly _id?: string;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly role: string;
    readonly password: string;
    readonly birthDay?: Date;
    readonly gender?: number;
    readonly registrationDate: Date;
    readonly favorites?: [string];
}
