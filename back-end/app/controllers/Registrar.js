const dbConfig = require('../../dbConfig')
const oracledb = require('oracledb');

const registrarCliente = async (req, res) => {

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Se requieren todos los campos para registrar un usuario' });
    }

    let connection;

    try {
        // Establecer conexión a la base de datos
        connection = await oracledb.getConnection(dbConfig);

        // Ejecutar la consulta para insertar el nuevo usuario
        await connection.execute(
            `INSERT INTO usuarios (username, password, email) VALUES (:username, :password, :email)`,
            [username, password, email],
            { autoCommit: true } // Realizar commit automáticamente
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        // Cerrar la conexión a la base de datos
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }
}


const registrarReserv = async (req, res) => {

}


module.exports = {
    registrarCliente,
    registrarReserv
}
