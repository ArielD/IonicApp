import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  password: String,
  birthDay: Date,
  gender: Number,
  registrationDate: Date,
  favorites: [String]
});

UserSchema.pre('save', function(next){
  let user = this;

  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
          if(err) return next(err);
          user.password = hash;
          next();
      });
  });
}); 

UserSchema.methods.checkPassword = function(attempt, callback){
  let user = this;

  bcrypt.compare(attempt, user.password, (err, isMatch) => {
      if(err) return callback(err);
      callback(null, isMatch);
  });
};