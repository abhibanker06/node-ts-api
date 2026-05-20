import {Request,Response} from "express"
import bcrypt from "bcrypt"
import userModel from "../models/user"
import jwt, { Secret } from "jsonwebtoken"

export const getUser= async(req:Request,res:Response)=>{
    
    const user = await userModel.find();

    if(!user) return res.status(404).json({success:true, message:"No user Found"})

    return res.status(200).json({success:true, message:"User Found", data:user})
}

export const registerUser= async(req:Request,res:Response)=>{
    let {name,email,phone,username,password,role}= req.body;

    try {
        if(!name || !email || !phone || !username) return res.status(404).json({success:false,message:"please fill all the fields",data:null})

        let user= await userModel.findOne({email})
        if(user) return res.status(500).json({success:false,message:"User already exists,please login"})

        const hashedPassword = await bcrypt.hash(password, 10);
            
        user= await userModel.create({
            name,
            email,
            phone,
            username,
            password:hashedPassword,
            role
        })
        return res.status(201).json({success:true,message:"Sign Up success",data:user})

    } catch (error:any) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    let { email, password } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ success: false, message: "Please fill all the fields", data: null })

        const user = await userModel.findOne({ email })
        if (!user) return res.status(404).json({ success: false, message: "User not found, please register" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" })

            // _ means im using it but i dont intend to use this varibale and saves us from ESLint error
        const {password:_ , ...userWithoutPassword} = user.toObject();            

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as Secret,
            { expiresIn: "2hr" }
        )
        return res.status(200).cookie('token',token).json({ success: true, message: "Login success", data: userWithoutPassword})

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({ success: true, message: "Logout success" })
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
