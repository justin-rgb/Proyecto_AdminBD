const dbConfig = require('../../dbConfig')
const oracledb = require('oracledb');

const login = async (req, res) => {

    const { email, contrasena } = req.body;

    if (!email || !contrasena ) {
        return res.status(400).json({ error: 'Complete todos los campos' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT DISTINCT * FROM cliente WHERE email = :email AND contrasena = :contrasena`,
            [email, contrasena]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado / No puede iniciar sesion' });
        }

        const user = result.rows[0];
        res.json({ user });
    } catch (error) {
        console.error('Error al buscar usuario:', error);
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
    login
}