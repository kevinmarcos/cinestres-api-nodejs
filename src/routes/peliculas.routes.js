import { Router } from "express"
import {
    getPeliculas,
    getPeliculasById,
    createPeliculas,
    updatePeliculas,
    deletePeliculas
} from "../controllers/peliculas.controller.js";

const router = Router()

router.get('/peliculas', getPeliculas)

router.get('/peliculas/:id', getPeliculasById)

router.post('/peliculas', createPeliculas)

router.patch('/peliculas/:id', updatePeliculas)

router.delete('/peliculas/:id', deletePeliculas)

export default router