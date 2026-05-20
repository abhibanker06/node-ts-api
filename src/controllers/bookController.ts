import {Request,Response} from "express"
import bookModel from "../models/books"

export const getBooks= async(req:Request,res:Response)=>{
    
    const book = await bookModel.find();

    if(!book) return res.status(404).json({success:true, message:"No Books Found"})

    return res.status(200).json({success:true, message:"Books Found", data:book})    
}

export const addBooks= async (req:Request,res:Response)=>{

    if(req.user.role !== "Creator") return res.status(403).json({success:false,message:"You are not eligible",data:req.user.role})
    

    let {name,author,description,publishYear} = req.body;

    try{

        const book= await bookModel.create({
            name,
            author,
            description,
            publishYear
        })

        return res.status(201).json({success : true, message: "Book added", data:book})

    }catch(error:any){
        return res.status(500).json({success:false,message:error.message})
    }
}
export const updateBooks= async (req:Request,res:Response)=>{
    
    if(req.user.role !== "Creator") return res.status(403).json({success:false,message:"You are not eligible",data:req.user.role})

    let {id}= req.params
    let {name,author,description,publishYear} = req.body;

    const book= await bookModel.findByIdAndUpdate(id,{name,author,description,publishYear},{new:true});

    if(!book) return res.status(404).json({success:true, message:"No Books Found"});
   
    return res.status(200).json({success:true, message:"Books Found", data:book})    

}

export const deleteBook = async (req: Request, res: Response) => {

    let { id } = req.params;

    try {

        const book = await bookModel.findByIdAndDelete(id);

        if (!book) return res.status(404).json({ success: false, message: "Book Not Found" });

        return res.status(200).json({ success: true, message: "Book Deleted", data: book })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


