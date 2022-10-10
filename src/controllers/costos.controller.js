import { pool } from "../db.js"

export const getCostos = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Costos '
        )
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ocurrio mal'
        })
    }
}

export const getCostosById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Costos where id = ?', [req.params.id]
        )

        if (rows.length <= 0) return res.status(404).json({
            message: 'Costo no encontrado'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const createCostos = async (req, res) => {
    const { dia, precio } = req.body
    const [rows] = await pool.query(
        'INSERT INTO Costos (dia, precio) VALUES (?,?)', [dia, precio]
    )

    try {
        res.send({
            id: rows.insertId,
            dia,
            precio
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updateCostos = async (req, res) => {
    const { id } = req.params
    const { dia, precio } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE Costos set dia = IFNULL(?,dia), precio = IFNULL(?,precio) where id = ?',
            [dia, precio, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Costo no encontrado'
        })

        const [rows] = await pool.query(
            'SELECT * FROM Costos where id = ?', [id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deleteCostos = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Costos where id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Costo no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}