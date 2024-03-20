import express from 'express';
import  cors from 'cors'
import vine, { errors } from '@vinejs/vine'
import { schema } from './validation/dataValidation.js';
import prisma from './DB/db.config.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    origin:"https://takeuforward-two.vercel.app",
    }));

app.use(express.json());

app.use('/submit',async(req,res)=>{
    try {
        const data=req.body;
        const validator = vine.compile(schema)
        const output = await validator.validate(data)

        const newEntry = await prisma.Data.create({
            data: output
        });
        res.status(200).json({
            message:"user created successfully",
            data: newEntry
        });
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(400).json({
                errors:error.messages
            })
    }
}
})

app.use('/getdata',async (req,res)=>{
    const page= Number(req.query.page) || 1;
    const limit= Number(req.query.limit) || 5;

    if(page<=0){
        page=1;
    }
    if(limit<=0 || limit>10){
        limit=5;
    }

    const skip= (page-1)*limit;

    const data=await prisma.Data.findMany({
        take:limit,
        skip:skip,
    });

    const totalEntry= await prisma.Data.count();
    const totalPage= Math.ceil(totalEntry/limit);

    res.status(200).json({
        data:data,
        metadata:{
            totalEntry,
            totalPage,
            limit,
            page
        }
    })
}
)


export default app;