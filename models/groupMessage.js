import { Schema, model } from 'mongoose';

const GroupMessageSchema = new Schema({
  from_user: {
    type: String,
    required: [true, 'username is required'],
  },
  room: {
    type: String,
    required: [true, 'room is required'],
  },
  message: {
    type: String,
    required: [true, 'message is required'],
  },
  date_sent: {
    type: Date,
    default: Date.now(),
  },
});

export const GroupMessage = model('GroupMessage', GroupMessageSchema);
