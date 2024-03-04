import mongoose from "mongoose";

const {Schema , model} = mongoose;

const PostSchema = new Schema({
    title : String ,
    summary : String ,
    cover : String ,
    content : String ,
    author : String 
} ,{
    timestamps : true
}
)

const Post = model('Post' , PostSchema);
export default Post;
