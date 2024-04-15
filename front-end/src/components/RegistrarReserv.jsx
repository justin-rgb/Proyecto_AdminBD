import React from 'react'
import { useState } from 'react';

const RegistrarReserv = () => {

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        sexo: '',
        fechanacimiento: '',
        estadocivil: '',
        email: '',
        telefono: '',
        idciudad: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        const data = {
            'nombre': formData.nombre.toString(),
            'apellido': formData.apellido.toString(),
            'sexo': formData.sexo.toString(),
            'fechanacimiento': moment(formData.fechanacimiento).format('DD-MM-YYYY'),
            'estadocivil': formData.estadocivil.toString(),
            'email': formData.email.toString(),
            'telefono': Number(formData.telefono),
            'idciudad': formData.idciudad.toString(),
        }

        console.log(data);

        //Enviar al endpoint del api
        fetch('http://localhost:3000/registrarReservacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( response => {
            if (response.ok) {
                // Si es exitosa, convertir la respuesta a JSON
                return response.json();
            }
            alert('Verifique todos los campos nuevamente')
            throw new Error('Verifique todos los campos nuevamente')
        })
        .then( async (resp) => {
            alert('Se ha registrado el usuario correctamente')
            return;
        })
        .catch( error => {
            console.error(error)
        })


    };

    return (
        <div style={{ marginBottom: '40px' }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Nombre:</label>
                    <input className="form-control" type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label">Apellido:</label>
                    <input className="form-control" type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label">Email:</label>
                    <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label">Fecha de Nacimiento:</label>
                    <input className="form-control" type="date" name="fechanacimiento" value={formData.fechanacimiento} onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label">Sexo:</label>
                    <select className="form-select" name="sexo" value={formData.sexo} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <div>
                    <label className="form-label">Estado Civil:</label>
                    <select className="form-select" name="estadocivil" value={formData.estadocivil} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Soltero">Soltero/a</option>
                        <option value="Casado">Casado/a</option>
                        <option value="Divorciado">Divorciado/a</option>
                        <option value="Viudo">Viudo/a</option>
                    </select>
                </div>

                <div>
                    <label className="form-label">Ciudad:</label>
                    <select className="form-select" name="idciudad" value={formData.idciudad} onChange={handleChange}>
                    <option value="">Selecciona una ciudad</option>
                        <option value="D001">San Jose</option>
                        <option value="D002">California</option>
                        <option value="D003">Seattle</option>
                        <option value="D004">Mexico</option>
                        <option value="D005">New York</option>
                        <option value="D006">Tokyo</option>
                        <option value="D007">Delhi</option>
                        <option value="D008">Pekin</option>
                        <option value="D009">Dhaka</option>
                        <option value="D010">El Cairo</option>
                        <option value="D011">Sao Paulo</option>
                        <option value="D012">Shangai</option>
                        <option value="D013">Washington</option>
                        <option value="D014">Texas</option>
                        <option value="D015">Cartago</option>
                    </select>
                </div>

                <div>
                    <label className="form-label">Teléfono:</label>
                    <input className="form-control" type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
                </div>

                <button type="submit" className='btn btn-success mt-3'>Registrar Reservación</button>
            </form>
        </div>
    );
}

export default RegistrarReserv