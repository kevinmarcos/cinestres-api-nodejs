import { Router } from "express"
import {
    getCompRealizadas,
    getCompRealizadasById,
    createCompRealizadas,
    updateCompRealizadas,
    deleteCompRealizadas
} from "../controllers/comprasR.controller.js";

const router = Router()

router.get('/comprasrealizadas', getCompRealizadas)

router.get('/comprasrealizadas/:id', getCompRealizadasById)

router.post('/comprasrealizadas', createCompRealizadas)

router.patch('/comprasrealizadas/:id', updateCompRealizadas)

router.delete('/comprasrealizadas/:id', deleteCompRealizadas)

export default router