import { pool } from "../db.js"

export const getSalas = async (req, res) => {
    try {
        const [salas] = await pool.query(
            'Select * from Salas'
        )
        const salasAux = [];
        for (let index = 0; index < salas.length; index++) {
            const [asientos] = await pool.query(
                'select * from Asientos_Cines where idSala = ?', [salas[index].id]
            )
            const objSalas = [{
                "id": salas[index].id,
                "sala": salas[index].sala,
                "estado": salas[index].estado,
                "asientos": asientos
            }]
            salasAux.push(objSalas)
        }
        res.json(salasAux)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getSalasById = async (req, res) => {
    try {
        const { id } = req.params

        const [sala] = await pool.query(
            'Select * from Salas where id = ?', [req.params.id]
        )
        const [asientos] = await pool.query(
            'select * from Asientos_Cines where idSala = ?', [id]
        )
        const objSala = [{
            "id": sala[0].id,
            "sala": sala[0].sala,
            "estado": sala[0].estado,
            "asientos": asientos
        }]

        res.json(objSala)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

export const createSalas = async (req, res) => {
    const { sala, estado } = req.body
    const [rows] = await pool.query(
        'INSERT INTO Salas (sala, estado) VALUES (?,?)', [sala, estado]
    )

    try {
        res.send({
            id: rows.insertId,
            sala,
            estado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const updateSalas = async (req, res) => {
    const { id } = req.params
    const { sala, estado } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE Salas set sala = IFNULL(?,sala), estado = IFNULL(?,estado) where id = ?',
            [sala, estado, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Sala no encontrada'
        })

        const [rows] = await pool.query(
            'SELECT * FROM Salas where id = ?', [id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deleteSalas = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Salas where id = ?',
            [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Sala no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

/*
export const getSalasById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Salas where id = ?', [req.params.id]
        )

        if (rows.length <= 0) return res.status(404).json({
            message: 'Sala no encontrado'
        }); else { res.json(rows) }

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}*/