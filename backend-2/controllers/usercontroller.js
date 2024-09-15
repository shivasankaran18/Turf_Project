
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import { PrismaClient } from '@prisma/client'
import Stripe from "stripe"


const prisma = new PrismaClient();



const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

const login = async (req,res)=>{
    const {email,password} = req.body;
    console.log(email);
    try{
        const user = await prisma.user.findUnique({
            where:{

                email:email
            },
           
        })
        console.log(user);
        
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        const match = await bcrypt.compare(password,user.password); 
        if(!match){
            return res.json({success:false,message:"Invalid Credantails"});
        }
        const token = createToken(user.id);
      
        res.json({success:true,token:`Bearer ${token}`});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


const createToken = (id) =>{
    console.log(process.env.JWT_SECRET);
    return jwt.sign({id},process.env.JWT_SECRET);
}

/* Register user */

const register = async (req,res) =>{
    const {name,password,email} = req.body;
    try{
        // checking is the user already exists
        const exists = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(exists){
            return res.json({success:false,message:"Email already exists"});
        }
        // validating the email and password using validator
        if(!validator.isEmail(email)){   /* This returns whether email is valid  */
            return res.json({success:false,message:"Enter valid email"});
        }

        if(password.length < 8){
            return res.json({success:false,message:"Password isn't strong"});
        }

        /* hashing the password using bcrypt by salting it */

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        
        const newUser = await prisma.user.create({
            data:{
                email,
                name,
                password:hashedPass
            },
           
        })
       
        const token = createToken(newUser.id);
        console.log(newUser)
        res.json({success:true,token:`Bearer ${token}`})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }



}

const detail=async(req,res)=>{
    const user=await prisma.user.findUnique({
        where:{
            id:req.headers.id
        }
    })
    return res.json(user)

}

const payment = async(req,res)=>{
    try {
        const data = req.body;
        console.log(process.env.FRONTEND_URL)
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'inr', // Use 'inr' for Indian Rupees
                product_data: {
                  name: data.turfName,
                },
                unit_amount: 100, // Replace with the actual amount in cents/paisa (2000 means ₹20.00)
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.FRONTEND_URL}/booked`, // Replace with your actual success URL
          cancel_url:  `${process.env.FRONTEND_URL}/turfs`,  // Replace with your actual cancel URL
          metadata: {
            area: data.area,
            state: data.state,
            city: data.city,
            date: data.date,
            slot: data.slot,
            mode: data.mode,
          },
        });
    
        res.json({ success: true, url: session.url });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: e.message });
      }
}

const getUsers=async(req,res)=>{
    try{
        const users=await prisma.user.findMany({
            where:{
                id:{not:req.headers.id}
            }
        })
        return res.json({users})
    }
    catch{
        return res.json({msg:"error"})
    }

}


export {login,register,detail,payment,getUsers}