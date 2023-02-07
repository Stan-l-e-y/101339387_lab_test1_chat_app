import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
  },
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  createOn: {
    type: Date,
    default: Date.now(),
  },
});

export const User = model('User', UserSchema, 'User');
