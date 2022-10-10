import { Router } from "express"
import {
    getCostos,
    getCostosById,
    createCostos,
    updateCostos,
    deleteCostos
} from "../controllers/costos.controller.js";

const router = Router()

router.get('/costos', getCostos)

router.get('/costos/:id', getCostosById)

router.post('/costos', createCostos)

router.patch('/costos/:id', updateCostos)

router.delete('/costos/:id', deleteCostos)

export default router