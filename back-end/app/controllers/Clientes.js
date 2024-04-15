const dbConfig = require('../../dbConfig')
const oracledb = require('oracledb');

const obtenerCliente = async (req, res) => {

    const { email } = req.body;

    if (!email ) {
        return res.status(400).json({ error: 'No se ha encontrado el cliente' });
    }

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT DISTINCT * FROM Cliente WHERE EMAIL = :email`,
            [email.toString()]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        const cliente = result.rows[0];
        res.json({ cliente });
    } catch (error) {
        console.error('Error al buscar cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }
}


module.exports = {
    obtenerCliente
}