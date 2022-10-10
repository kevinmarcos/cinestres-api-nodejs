import { pool } from "../db.js"

export const getCompRealizadas = async (req, res) => {
    try {
        const [compras] = await pool.query(
            'Select * from Compras_Realizadas'
        )

        const comprasAux = [];
        for (let index = 0; index < compras.length; index++) {
            const [usuario] = await pool.query(
                'Select * from Usuarios where id = ?', [compras[index].idUsuario]
            )
            const [peliculas] = await pool.query(
                'select nombre, genero, duracion, diaEstreno, estado from Peliculas where id = ?', [compras[index].idPelicula]
            );
            const [asientos] = await pool.query(
                'select * from Asientos_Cines where id = ?', [compras[index].idAsientos_Cines]
            )
            const [costos] = await pool.query(
                'select * from Costos where id = ?', [compras[index].idCostos]
            )
            const [promociones] = await pool.query(
                'Select * from Promociones where id = ?', [compras[index].idPromociones]
            )
            const objCompraRealizada = [{
                "id": compras[index].id,
                "usuario": usuario,
                "pelicula": peliculas,
                "asiento": asientos,
                "costo":costos,
                "promociones": promociones
            }]
            comprasAux.push(objCompraRealizada)
        }
        res.json(comprasAux)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getCompRealizadasById = async (req, res) => {
    try {
        const { id } = req.params

        const [compra] = await pool.query(
            'Select * from Compras_Realizadas where id = ?', [req.params.id]
        )
        const [usuario] = await pool.query(
            'SELECT * FROM Usuarios where id = ?',[compra[0].idUsuario]
        )
        const [pelicula] = await pool.query(
            'select nombre, genero, duracion, diaEstreno from Peliculas where id = ?', [compra[0].idPelicula]
        )
        const [asiento] = await pool.query(
            'select * from Asientos_Cines where id = ?',[compra[0].idAsientos_Cines]
        ) 
        const [costos] = await pool.query(
            'SELECT * FROM Costos WHERE id = ?',[compra[0].idCostos]
        )
        const [promocion] = await pool.query(
            'select * from Promociones where id = ?', [compra[0].idPromociones]
        )
        const objCompraRealizada = [{
            "id": compra[0].id,
            "usuario": usuario,
            "pelicula" : pelicula,
            "asiento" : asiento,
            "costos": costos,
            "promociones" : promocion

        }]

        res.json(objCompraRealizada)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

export const createCompRealizadas = async (req, res) => {
    const { idUsuario, idPelicula, idAsientos_Cines, idCostos, idPromociones } = req.body
    const [compra] = await pool.query(
        'INSERT INTO Compras_Realizadas (idUsuario, idPelicula, idAsientos_Cines, idCostos, idPromociones) VALUES (?,?,?,?,?)', 
        [idUsuario, idPelicula, idAsientos_Cines, idCostos, idPromociones]
    )

    try {
        res.send({
            id: compra.insertId,
            idUsuario, idPelicula, idAsientos_Cines, idCostos, idPromociones
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updateCompRealizadas = async (req, res) => {
    const { id } = req.params
    const { idUsuario, idPelicula, idAsientos_Cines, idCostos, idPromociones } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE Compras_Realizadas set idUsuario = IFNULL(?,idUsuario), idPelicula = IFNULL(?,idPelicula), idAsientos_Cines = IFNULL(?,idAsientos_Cines), idCostos = IFNULL(?,idCostos), idPromociones = IFNULL(?, idPromociones) where id = ?',
            [idUsuario, idPelicula, idAsientos_Cines, idCostos, idPromociones, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Compra no encontrada'
        })

        const [rows] = await pool.query(
            'SELECT * FROM Compras_Realizadas where id = ?', [id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deleteCompRealizadas = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Compras_Realizadas where id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Compra no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}