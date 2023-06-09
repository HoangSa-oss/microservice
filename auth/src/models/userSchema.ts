import mongoose from "mongoose";
import {Password} from '../services/password'
interface UserAttrs{
    email:string,
    password:string
}
interface UserModel extends mongoose.Model<UserDoc>{
    build(attes:UserAttrs):UserDoc
}
interface UserDoc extends mongoose.Document {
    email:string,
    password:string
}
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
},{
    toJSON:{
        transform(doc, ret, options) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        },
    }
})
userSchema.statics.build = (attrs:UserAttrs)=>{
    return new User(attrs)
}
userSchema.pre('save',async function (done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password',hashed)
    }
    done()
})
export const User = mongoose.model<UserDoc,UserModel>('User',userSchema)
