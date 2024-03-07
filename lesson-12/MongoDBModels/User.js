import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true },
    role: { type: Number, default: 0, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

export default model('User', UserSchema);