export class CreateUserDto {
    readonly _id?: string;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly birthDay?: Date;
    readonly gender?: number;
    readonly registrationDate: Date;
    readonly favorites?: [string];
  }