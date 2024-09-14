import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { SignInSchema, SignUpSchema } from "../types";
import { prismaClient } from "../db";
import jwt from 'jsonwebtoken';
import { JWT_password } from "../config";
import bcrypt from 'bcrypt'


const router = Router();

router.post('/signup' , async(req,res)=>{
    const body = req.body;
    const parsedData = SignUpSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({message : "Incorrect inputs"});
    }

    const userExists = await prismaClient.user.findFirst({
        where:{
            email : parsedData.data.username
        }
    })

    if(userExists){
        return res.status(403).json({message : "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password , 10);

    await prismaClient.user.create({
        data :{
            email : parsedData.data.username,
            password : hashedPassword,
            name : parsedData.data.name
        }
    })
    return res.json({
        message : "Please verify your account"
    });
})

router.post('/signin' , async(req,res)=>{
    const body = req.body;
    const parsedData = SignInSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({message : "Incorrect inputs"});
    }

    
    const user = await prismaClient.user.findFirst({
        where:{
            email : parsedData.data.username,
        }
    })
    const decodedPassword = bcrypt.compare(parsedData.data.password , user?.password || "")

    if(!user || !decodedPassword){
        return res.status(403).json({message : "Sorry credentials are incorrect"});
    }

    const token = jwt.sign({
        id : user.id,
    } , JWT_password)

    res.json({
        token : token
    })
})

router.get('/' , authMiddleware, async(req,res)=>{
    //@ts-ignore
    const  id = req.id;
    const user = await prismaClient.user.findFirst({
        where:{
            id
        },
        select:{
            name : true,
            email : true
        }
    })

    return res.json({
        user
    })
})

router.delete("/delete", async (req, res) => {
    const { id } = req.body; // Expecting `id` in the request body

    try {
        await prismaClient.user.delete({
            where: {
                id: id
            }
        });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
        console.log(error);
    }
});




export const userRouter = router;