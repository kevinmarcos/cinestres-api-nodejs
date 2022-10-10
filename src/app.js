import express from "express"
import usuariosRoutes from "./routes/usuarios.routes.js"
import promocionesRoutes from "./routes/promociones.routes.js"
import costosRoutes from "./routes/costos.routes.js"
import cinesRoutes from "./routes/cines.routes.js"
import salasRoutes from "./routes/salas.routes.js"
import peliculasRoutes from "./routes/peliculas.routes.js"
import sits_cinesRoutes from "./routes/sits_cines.routes.js"
import compRealizadas from "./routes/comprasR.routes.js";

const app = express()

app.use(express.json())

app.use(
    '/api',
    usuariosRoutes,
    promocionesRoutes,
    costosRoutes,
    cinesRoutes,
    salasRoutes,
    peliculasRoutes,
    sits_cinesRoutes,
    compRealizadas
)


app.use((req, res, next) => {
    res.status(404).json({
        message:'Endpoint not found'
    })
})

export default app;