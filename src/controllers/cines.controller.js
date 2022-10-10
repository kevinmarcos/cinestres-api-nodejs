import { pool } from "../db.js"

export const getCines = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Cines '
        )
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ocurrio mal'
        })
    }
}

export const getCinesById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Cines where id = ?', [req.params.id]
        )

        if (rows.length <= 0) return res.status(404).json({
            message: 'Cine no encontrado'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const createCines = async (req, res) => {
    const { ubicacion, distrito } = req.body
    const [rows] = await pool.query(
        'INSERT INTO Cines (ubicacion, distrito) VALUES (?,?)', [ubicacion, distrito]
    )

    try {
        res.send({
            id: rows.insertId,
            ubicacion,
            distrito
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updateCines = async (req, res) => {
    const { id } = req.params
    const { ubicacion, distrito } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE Cines set ubicacion = IFNULL(?,ubicacion), distrito = IFNULL(?, distrito) where id = ?',
            [ubicacion, distrito, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Cine no encontrado'
        })

        const [rows] = await pool.query(
            'SELECT * FROM Cines where id = ?', [id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deleteCines = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Cines where id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Cine no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}