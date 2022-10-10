import { pool } from "../db.js"

export const getPromociones = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Promociones '
        )
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ocurrio mal'
        })
    }
}

export const getPromocionesById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Promociones where id = ?', [req.params.id]
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

export const createPromociones = async (req, res) => {
    const { socio, descuento } = req.body
    const [rows] = await pool.query(
        'INSERT INTO Promociones (socio, descuento) VALUES (?,?)', [socio, descuento]
    )

    try {
        res.send({
            id: rows.insertId,
            socio,
            descuento
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updatePromociones = async (req, res) => {
    const { id } = req.params
    const { socio, descuento } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE Promociones set socio = IFNULL(?,socio), descuento = IFNULL(?,descuento) where id = ?',
            [socio, descuento, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Promocion no encontrado'
        })

        const [rows] = await pool.query(
            'SELECT * FROM Promociones where id = ?', [id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deletePromociones = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Promociones where id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Promocion no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}