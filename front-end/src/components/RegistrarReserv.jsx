import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import moment from 'moment'

const RegistrarReserv = () => {

    const [idCliente, setIdCliente] = useState('')
    const [email, setEmail] = useState('')
    const [vuelos, setVuelos] = useState([])
    const [formData, setFormData] = useState({
        idvuelo: ''
    });

    const obtenerIdCliente = () => {
        axios.post('http://localhost:3000/obtenerCliente', {
            "email": email
        })
        .then( resp => {
            console.log(resp.data.cliente);
            setIdCliente(resp.data.cliente[0])
            return;
        })
        .catch( err => {
            setIdCliente('')
            console.log(err);
            return;
        })
    }

    // OBTENER VUELOS
    useEffect( () => {
        axios.get('http://localhost:3000/obtenerVuelos')
        .then( (resp) => {
            setVuelos(resp.data.vuelos)
        })
        .catch( (error) => {
            console.error(error)
        })
    },[])
    // 
    // 
    // 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        const data = {
            'id_cliente': idCliente,
            'idvuelo': formData.idvuelo,
            'fechareserva': moment().format('DD-MM-YYYY'),
            'estadoreserva': 'Reservado'
        }

        console.log(data);

        //Enviar al endpoint del api
        axios.post('http://localhost:3000/registrarReserva', data)
        .then( resp => {
            alert("Se ha registrado la reserva correctamente")
            return;
        })
        .catch( err => {
            alert("Ha ocurrido un error al registrar la reserva")
            console.log(err);
            return;
        })

    };

    return (
        <div style={{ marginBottom: '40px' }}>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className="form-label">Correo electrónico del cliente:</label>
                    <input className="form-control mb-2" type="email" name="email" value={email} onChange={ e => setEmail(e.target.value)} />
                    <button className='btn bg-info' type='button' onClick={obtenerIdCliente}>Buscar ID</button>
                </div>

                <div className='mb-3'>
                    <label className="form-label">ID Cliente:</label>
                    <input disabled className="form-control" type="text" name="nombre" required value={idCliente} onChange={ e => setIdCliente(e.target.value)} />
                </div>


                <label className="form-label h6">Seleccione el vuelo de preferencia:</label>
                <select className="form-select" name="idvuelo" value={formData.idvuelo} onChange={handleChange}>
                    <option value="">Selecciona una ciudad</option>
                {
                    vuelos ? vuelos.map( vuelo => {
                        vuelo[1] = vuelo[1].toString().slice(0,16)
                       return(
                        <option value={vuelo[0]} > {vuelo[1]} / {vuelo[2]} / {vuelo[3]} / Costo: ${vuelo[4]} </option>
                       )
                    })
                    :
                    <p>No hay vuelos</p>
                }

                </select>

                <button type="submit" className='btn btn-success mt-3'>Registrar Reservación</button>
            </form>
        </div>
    );
}

export default RegistrarReserv