const dbConfig = require('../../dbConfig')
const oracledb = require('oracledb');
const { v4: uuidv4 } = require('uuid');

const registrarCliente = async (req, res) => {

    const guid = uuidv4().substring(0,10).toUpperCase();

    const { idciudad, 
            id_domicilio, 
            nombre, 
            apellido, 
            sexo = 'Otro', 
            fechanacimiento, 
            estadocivil, 
            email, 
            telefono
    } = req.body;

    const data = {
        id_cliente: guid,
        idciudad,
        id_domicilio,
        nombre,
        apellido,
        sexo,
        fechanacimiento,
        estadocivil,
        email,
        telefono
    }

    if (!idciudad || !id_domicilio || !nombre || !apellido || !fechanacimiento || !estadocivil || !email || !telefono) {
        return res.status(400).json({ error: 'Se requieren todos los campos para registrar un usuario' });
    }

    let connection;

    console.log(data);

    try {
        // Establecer conexión a la base de datos
        connection = await oracledb.getConnection(dbConfig);

        //INTO Cliente (ID_Cliente, IDCiudad, ID_Domicilio, Nombre, Apellido, Sexo, FechaNacimiento, EstadoCivil, Email, Telefono)
        //VALUES ('CLI001', 'D001', 'DOM001', 'John', 'Doe', 'Masculino', TO_DATE('1990-01-15', 'YYYY-MM-DD'), 'Soltero', 'john.doe@example.com', 123456789

        // Ejecutar la consulta para insertar el nuevo usuario
         await connection.execute(
            `INSERT INTO Cliente (ID_Cliente, IDCiudad, ID_Domicilio, Nombre, Apellido, Sexo, FechaNacimiento, EstadoCivil, Email, Telefono)
            VALUES (:id_cliente, :idciudad, :id_domicilio, :nombre, :apellido, :sexo, :fechanacimiento, :estadocivil, :email, :telefono)`,
            [data.id_cliente, data.idciudad, data.id_domicilio, data.nombre, data.apellido, data.sexo, data.fechanacimiento, data.estadocivil, data.email, data.telefono],
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

    //INSERT INTO Vuelo (IDVuelo, IDAvion, ID_Destino, Fecha_salida, Fecha_llegada, Precio)
    //VALUES ('V001', 'A001', 'D001', TO_TIMESTAMP('10-ABR-24 09:00:00', 'DD-MON-YY HH24:MI:SS'), TO_TIMESTAMP('10-ABR-24 15:00:00', 'DD-MON-YY HH24:MI:SS'), 500)


}


module.exports = {
    registrarCliente,
    registrarReserv
}
