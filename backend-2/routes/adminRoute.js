import express from "express";
import { addTimeSlot, addTurfSlots, getNotPaidDetails, getPaidDetails, getTurf,  markpaid,  updateTurfDetails, updateTurfSlots } from "../controllers/adminController.js";

import { admindetail, adminlogin, adminregister } from "../controllers/adminDetailsController.js";
import { authMiddleWare } from "../middleware/auth.js";
import { addTurf,admingetTurf } from "../controllers/turfController.js";
import multer from "multer";

const adminRouter = express.Router();

/* Multer config */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



adminRouter.post("/addtime",authMiddleWare,addTimeSlot);
adminRouter.post("/register",adminregister);
adminRouter.post("/login",adminlogin);
adminRouter.get("/details",authMiddleWare,admindetail);
adminRouter.get("/getTurf",authMiddleWare,getTurf)
adminRouter.post("/updateTurfDetails",authMiddleWare,updateTurfDetails)
adminRouter.post("/updateTurfSlots",authMiddleWare,updateTurfSlots)
adminRouter.post("/addTurfSlots",authMiddleWare,addTurfSlots)
adminRouter.get("/getNotPaidDetails",authMiddleWare,getNotPaidDetails)
adminRouter.get("/getPaidDetails",authMiddleWare,getPaidDetails)
adminRouter.post("/addturf",authMiddleWare,upload.array('images',5),addTurf)
adminRouter.post("/markpaid",authMiddleWare,markpaid)

// adminRouter.get("/getTurf",authMiddleWare,admingetTurf)

export default adminRouter