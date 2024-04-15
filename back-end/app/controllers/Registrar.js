const dbConfig = require('../../dbConfig')
const oracledb = require('oracledb');
const { v4: uuidv4 } = require('uuid');

const registrarCliente = async (req, res) => {

    const guid = uuidv4().substring(0,10).toUpperCase();
    const guidIdDom = uuidv4().substring(0,10).toUpperCase();

    const { idciudad, 
            nombre, 
            apellido, 
            sexo = 'Otro', 
            fechanacimiento, 
            estadocivil, 
            email, 
            telefono,
            direccion,
            ciudad,
            codigopostal
    } = req.body;

    const data = {
        id_cliente: guid,
        id_domicilio: guidIdDom,
        idciudad,
        nombre,
        apellido,
        sexo,
        fechanacimiento,
        estadocivil,
        email,
        telefono
    }

    const dataDomicilio = {
        id_domicilio : guidIdDom,
        direccion,
        ciudad,
        codigopostal
    }

    if (!idciudad || !nombre || !apellido || !fechanacimiento || !estadocivil || !email || !telefono || !direccion || !ciudad || !codigopostal ) {
        return res.status(400).json({ error: 'Se requieren todos los campos para registrar un usuario' });
    }

    let connection;

    console.log(data);

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `INSERT INTO Domicilio (ID_Domicilio, Direccion, Ciudad, CodigoPostal)
            VALUES (:id_domicilio, :direccion, :ciudad, :codigopostal)`,
            [dataDomicilio.id_domicilio, dataDomicilio.direccion, dataDomicilio.ciudad, dataDomicilio.codigopostal],
            { autoCommit: true } // Realizar commit automáticamente
        );

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





module.exports = {
    registrarCliente
}
