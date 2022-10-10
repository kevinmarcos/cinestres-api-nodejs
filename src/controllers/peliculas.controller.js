import { pool } from "../db.js"

export const getPeliculas = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Peliculas '
        )
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ocurrio mal'
        })
    }
}

export const getPeliculasById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Peliculas where id = ?', [req.params.id]
        )

        if (rows.length <= 0) return res.status(404).json({
            message: 'Pelicula no encontrada'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const createPeliculas = async (req, res) => {
    const { 
        nombre, director, diaEstreno,
        genero, duracion, pais, sinopsis, estado, img
     } = req.body
    const [rows] = await pool.query(
        'INSERT INTO Peliculas (nombre, director, diaEstreno, genero, duracion, pais, sinopsis, estado, img) VALUES (?,?,?,?,?,?,?,?,?)',
        [nombre, director, diaEstreno,
        genero, duracion, pais, sinopsis, estado,img]
    )

    try {
        res.send({
            id: rows.insertId,
            nombre, director, diaEstreno,
            genero, duracion, pais, sinopsis, estado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updatePeliculas = async (req, res) => {
    const { id } = req.params
    const { nombre, director, diaEstreno,
        genero, duracion, pais, sinopsis, estado, img } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE Peliculas set nombre = IFNULL(?,nombre), director = IFNULL(?,director), diaEstreno = IFNULL(?,diaEstreno), genero = IFNULL(?,genero), duracion = IFNULL(?,duracion), pais = IFNULL(?,pais), sinopsis = IFNULL(?,sinopsis), estado = IFNULL(?,estado), img = IFNULL(?,img) where id = ?',
            [nombre, director, diaEstreno,
            genero, duracion, pais, sinopsis, estado, img, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Pelicula no encontrado'
        })

        const [rows] = await pool.query(
            'SELECT * FROM Peliculas where id = ?', [id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deletePeliculas = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Peliculas where id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Pelicula no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}