import mongoose,{Schema} from "mongoose"

interface Iuser {
    name: string,
    email:string,
    phone:string,
    username:string,
    password:string,
    booksAdded?:string[],
    role:string
    
}

const userSchema = new Schema<Iuser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum:["Admin","Visitor","Creator"]
    },
    booksAdded: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }
})

export default mongoose.model("User",userSchema);