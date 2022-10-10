import { Router } from "express"
import {
    getPromociones,
    getPromocionesById,
    createPromociones,
    updatePromociones,
    deletePromociones
} from "../controllers/promociones.controller.js";

const router = Router()

router.get('/promociones', getPromociones)

router.get('/promociones/:id', getPromocionesById)

router.post('/promociones', createPromociones)

router.patch('/promociones/:id', updatePromociones)

router.delete('/promociones/:id', deletePromociones)

export default router