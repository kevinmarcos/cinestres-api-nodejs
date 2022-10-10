import { Router } from "express"
import {
    getCines,
    getCinesById,
    createCines,
    updateCines,
    deleteCines
} from "../controllers/cines.controller.js";

const router = Router()

router.get('/cines', getCines)

router.get('/cines/:id', getCinesById)

router.post('/cines', createCines)

router.patch('/cines/:id', updateCines)

router.delete('/cines/:id', deleteCines)

export default router