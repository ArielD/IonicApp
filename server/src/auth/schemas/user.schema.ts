import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: String,
  username: String,
  firstName: String,
  LastName: String,
  password: String,
  birthDay: Date,
  gender: Number,
  registrationDate: Date
});