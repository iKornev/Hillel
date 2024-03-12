import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

const PostModel = mongoose.model('Post', PostSchema);


export { PostModel }