import { Router } from "express"
import {
    getSalas,
    getSalasById,
    createSalas,
    updateSalas,
    deleteSalas
} from "../controllers/salas.controller.js";

const router = Router()

router.get('/salas', getSalas)

router.get('/salas/:id', getSalasById)

router.post('/salas', createSalas)

router.patch('/salas/:id', updateSalas)

router.delete('/salas/:id', deleteSalas)

export default router