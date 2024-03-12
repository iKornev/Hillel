import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

const PostModel = model('Post', PostSchema);


export { PostModel }