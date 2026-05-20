import { Request,Response,NextFunction } from "express"
import jwt, { Secret } from "jsonwebtoken"


export const verifyToken= async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({ success: false, message: "Access denied" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret )
        req.user = decoded
        next()
    } catch (error: any) {
        return res.status(401).json({ success: false, message: "Invalid token" })
    }        
}