import { pool } from "../db.js"

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Usuarios '
        )
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ocurrio mal'
        })
    }
}

export const getUsuarioById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Usuarios where id = ?', [req.params.id]
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

export const createUsuario = async (req, res) => {
    const { nombre, edad, correo } = req.body
    const [rows] = await pool.query(
        'INSERT INTO Usuarios (nombre, edad, correo) VALUES (?,?,?)', [nombre, edad, correo]
    )

    try {
        res.send({
            id: rows.insertId,
            nombre,
            edad,
            correo
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updateUsuario = async (req, res) => {
    const { id } = req.params
    const { nombre, edad, correo } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE Usuarios set nombre = IFNULL(?,nombre), edad = IFNULL(?,edad), correo = IFNULL(?,correo) where id = ?',
            [nombre, edad, correo, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })

        const [rows] = await pool.query(
            'SELECT * FROM Usuarios where id = ?', [id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Usuarios where id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}