import mongoose,{Schema} from "mongoose"

interface Ibook {
    name: string,
    author:string,
    publishYear:number,
    description:string
}

const bookSchema = new Schema<Ibook>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publishYear: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

export default mongoose.model("Book",bookSchema);