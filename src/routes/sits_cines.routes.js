import { Router } from "express"
import {
    getAsientos_Cines,
    getAsientos_CinesById,
    createAsientos_Cines,
    updateAsientos_Cines,
    deleteAsientos_Cines
} from "../controllers/sits_cines.controller.js";

const router = Router()

router.get('/asientos', getAsientos_Cines)

router.get('/asientos/:id', getAsientos_CinesById)

router.post('/asientos', createAsientos_Cines)

router.patch('/asientos/:id', updateAsientos_Cines)

router.delete('/asientos/:id', deleteAsientos_Cines)

export default router