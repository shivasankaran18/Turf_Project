import express from "express"
import { addTournament, bookTournament, getavailableUsersforATournament, getregisteredTournement, listTournament } from "../controllers/tournamentController.js";
import { authMiddleWare } from "../middleware/auth.js";
import multer from "multer";
/* Multer config */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const tournamentRouter = express.Router();


tournamentRouter.post("/getusers",authMiddleWare,getavailableUsersforATournament)
tournamentRouter.post("/book",authMiddleWare,bookTournament)
tournamentRouter.get("/bookedtournament",authMiddleWare,getregisteredTournement)
tournamentRouter.post("/addtournament",authMiddleWare,upload.array('images',5),addTournament);
tournamentRouter.get('/listtournament',authMiddleWare,listTournament)

export default tournamentRouter