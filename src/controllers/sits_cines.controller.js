import { pool } from "../db.js"


export const getAsientos_Cines = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Asientos_Cines '
        )
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ocurrio mal'
        })
    }
}

export const getAsientos_CinesById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Asientos_Cines where id = ?', [req.params.id]
        )

        if (rows.length <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const createAsientos_Cines = async (req, res) => {
    const { asiento, estado, idCines, idSala } = req.body
    const [rows] = await pool.query(
        'INSERT INTO Asientos_Cines (asiento, estado, idCines, idSala) VALUES (?,?,?,?)', 
        [asiento, estado, idCines, idSala]
    )

    try {
        res.send({
            id: rows.insertId,
            asiento, estado, idCines, idSala
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updateAsientos_Cines = async (req, res) => {
    const { id } = req.params
    const { asiento, estado, idCines, idSala } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE Asientos_Cines set asiento = IFNULL(?,asiento), estado = IFNULL(?,estado), idCines = IFNULL(?,idCines), idSala = IFNULL(?,idSala) where id = ?',
            [asiento, estado, idCines, idSala, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Asiento no encontrado'
        })

        const [rows] = await pool.query(
            'SELECT * FROM Asientos_Cines where id = ?', [id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deleteAsientos_Cines = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Asientos_Cines where id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Asiento no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}