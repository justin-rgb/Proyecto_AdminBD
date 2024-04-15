const dbConfig = require('../../dbConfig')
const oracledb = require('oracledb');
const { v4: uuidv4 } = require('uuid');

const obtenerVuelos = async (req, res) => {

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT vue.idvuelo, vue.fecha_salida, av.aereolinea, av.capacidad, vue.precio FROM Vuelo vue, Aviones av WHERE vue.idavion = av.idavion ORDER BY vue.fecha_salida ASC`
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se han encontrado vuelos' });
        }

        const vuelos = result.rows;
        res.json({ vuelos });
    } catch (error) {
        console.error('Error al buscar vuelos:', error);
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

const registrarReserva = async (req, res) => {

    const guid = uuidv4().substring(0,10).toUpperCase();

    const { id_cliente,
        idvuelo,
        fechareserva,
        estadoreserva
    } = req.body;

    const data = {
        idreserva: guid,
        id_cliente,
        idvuelo,
        fechareserva,
        estadoreserva
    }



    if ( !id_cliente || !idvuelo || !fechareserva || !estadoreserva ) {
        return res.status(400).json({ error: 'Se requieren todos los campos para registrar un usuario' });
    }

    let connection;

    console.log(data);

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `INSERT INTO Reserva (IDReserva, ID_Cliente, IDVuelo, FechaReserva, EstadoReserva)
            VALUES (:idreserva, :id_cliente, :idvuelo, :fechareserva, :estadoreserva)`,
            [data.idreserva, data.id_cliente, data.idvuelo, data.fechareserva, data.estadoreserva],
            { autoCommit: true }
        );

        res.status(201).json({ message: 'Reserva registrada correctamente' });
    } catch (error) {
        console.error('Error al registrar reserva:', error);
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
    obtenerVuelos,
    registrarReserva
}