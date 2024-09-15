import { PutObjectAclCommand } from '@aws-sdk/client-s3';
import { S3Client, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto';

const prisma = new PrismaClient();



const bucket_name = process.env.BUCKET_NAME;
const bucket_region = process.env.BUCKET_REGION;
const access_key = process.env.ACCESS_KEY;
const secret_key = process.env.SECRET_ACCESS_KEY;

/* S3 Config */
const s3Client = new S3Client({
  region: bucket_region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key
  }
});

const addTimeSlot = async(req,res)=>{
    try{
        const TurfId = await prisma.turf.findUnique({
            where:{
                adminId: req.headers.id
            }
        })
        console.log("TurfId:"+TurfId);
        const turfSlots=await prisma.turfSlot.create({
            data:{
                turfId:TurfId.id,
                start:req.body.start,
                end:req.body.end,
                available:true,
                price:req.body.price
            }
        })
        return res.json({success:true,message:"Time Slot added successfully"});
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Time Slot not added"});
    }
}

const getTurf = async (req, res) => {
    const params = req.query.filter;
    console.log("Params:", params);
    
    try {
        const turf = await prisma.turf.findUnique({
            where: {
                adminId: req.headers.id,
            },
        });
        console.log(turf)
        if(!turf){
            return res.json({success:"false",message:"No turf is there"})
        }
        const turfSlots = await prisma.turfSlot.findMany({
            where: {
                turfId: turf.id,
                date: {
                    gte: params,
                    
                },
                available:true
            },
        });
        const groupedSlots = turfSlots.reduce((acc, slot) => {
            const key = `${slot.date}_${slot.turfId}`;
            if (!acc[key]) {
                acc[key] = {
                    id: [slot.id],
                    date: slot.date,
                    slot: [slot.slot],
                    price:[slot.price], 
                   
                    turfId: slot.turfId,
                };
            } else {
                acc[key].slot.push(slot.slot);
                acc[key].price.push(slot.price)
                acc[key].id.push(slot.id)

            }
            return acc;
        }, {});

        
        console.log(groupedSlots)
        const groupedSlotsArray = Object.values(groupedSlots);

        console.log("Grouped Slots:", groupedSlotsArray);

        return res.json({ success: true, turf, turfSlots: groupedSlotsArray });
    } catch (error) {
        console.error("Error fetching turf slots:", error);
        return res.status(200).json({ success: false, error: "Internal Server Error" });
    }
};


const updateTurfDetails=async(req,res)=>{
    const body=req.body
    console.log(body.details)

    const data=await prisma.turf.update({
        where:{
            adminId:req.headers.id
        },
        data:{
            area:body.details.area,
            city:body.details.city,
            turfName:body.details.turfName,
            state:body.details.state
        }
    })

    return res.json({success:"true",data})

}
const updateTurfSlots = async (req, res) => {
    const { slot } = req.body;
    console.log(slot)
  
    try {
    
         
          
          slot.id.map(async(id,idx)=>{
            console.log(id+" "+idx)
            const turfSlot=await prisma.turfSlot.update({
                where:{
                    id:id
                },
                data:{
                    slot:slot.slot[idx],
                    price:slot.price[idx]
                }

            })
            console.log("updated******"+turfSlot)

          })
          
          
      
  
      return res.json({ success: true, message: "Slots updated successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: "Slots not updated" });
    }
  };

  const addTurfSlots=async(req,res)=>{
    const {slots}=req.body
    console.log(slots)
    try{
        slots.slot.map(async (slot,idx)=>{
            const temp=await prisma.turfSlot.create({
                data:{
                    date:slots.date,
                    turfId:slots.turfId,
                    slot:slot,
                    price:slots.price[idx]
    
                }
            })
            console.log(temp)
        })
        return res.json({success:"true"})

    }
    catch{
        return res.json({success:"false"})
    }
    
  }

  const getNotPaidDetails=async(req,res)=>{
    try{
        const turf=await prisma.turf.findUnique({
            where:{
                adminId:req.headers.id
            }
        })
    
        const booking=await prisma.userBooking.findMany({
            where:{
                turfId:turf.id,
                paid:false
            },
        })
    
        const users=await prisma.user.findMany({
            where:{
                id:booking.userId
            },
            select:{
                id:true,
                name:true,
                email:true
            }
           
        })

        return res.json({success:"true",booking,users})


    }
    catch{
        return res.json({success:"false"})
    }
    

  }

  const getPaidDetails=async(req,res)=>{
    try{
        const turf=await prisma.turf.findUnique({
            where:{
                adminId:req.headers.id
            }
        })
    
        const booking=await prisma.userBooking.findMany({
            where:{
                turfId:turf.id,
                paid:true
            },
        })
    
        const users=await prisma.user.findMany({
            where:{
                id:booking.userId
            },
            select:{
                id:true,
                name:true,
                email:true
            }
            
        })

        return res.json({success:"true",booking,users})


    }
    catch{
        return res.json({success:"false"})
    }
    

  }


  const markpaid=async(req,res)=>{
    const body=req.body;
    console.log(typeof(body.id));
    try{
        const data=await prisma.userBooking.update({
            where:{
                id:parseInt(body.id)
            },
            data:{
                paid:true
            }
        })
        console.log(data)
        return res.json({msg:"done"})
    }
    catch(e){
        
        return res.json({msg:e})
    }
  }

const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const addTournament = async(req, res) => {
    console.log("admin id:", req.headers.id)
    const admin = await prisma.adminDetails.findUnique({
        where: {
            id: req.headers.id
        }
    });
    console.log(admin.id)
    if (!admin) {
        return res.json({ success: false, message: "Admin not found" });
    }
    const turf = await prisma.turf.findUnique({
        where: {
            adminId: admin.id
        },
        select: {
            id: true
        }
    });
    try {
        await prisma.$transaction(async (tx) => {
            const imageUrls = await Promise.all(req.files.map(async (file) => {
                const params = {
                    Bucket: bucket_name,
                    Key: randomName(),
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };
                const command = new PutObjectCommand(params);
                await s3Client.send(command);
                return `https://${bucket_name}.s3.${bucket_region}.amazonaws.com/${params.Key}`;
            }));
            const data = await tx.tournament.create({
                data: {
                    turfId: turf.id,
                    total_teams:parseInt(req.body.total_teams),
                    duration:parseInt(req.body.duration),
                    name: req.body.name,
                    mode: parseInt(req.body.mode),
                    price: parseInt(req.body.price),
                    registrationstartDate: req.body.stdate,
                    registrationendDate: req.body.enddate,
                    images: imageUrls
                }
            });
            res.json({ success: true, message: data });
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating tournament" });
    }
};
  
export  {addTimeSlot,addTournament,getTurf,updateTurfDetails,updateTurfSlots,addTurfSlots,getNotPaidDetails,getPaidDetails,markpaid}