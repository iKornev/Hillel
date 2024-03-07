import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
});

const PostModel = mongoose.model('Post', PostSchema);


export { PostModel }