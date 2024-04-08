import React from 'react'
import { useState } from 'react';

const RegistrarReserv = () => {

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        sexo: '',
        fechaNacimiento: '',
        estadoCivil: '',
        email: '',
        telefono: '',
        contrasena: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario al servidor
        console.log(formData);
    };


    return (
        <div style={{ marginBottom: '40px' }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                </div>
                <div>
                    <label>Sexo:</label>
                    <select name="sexo" value={formData.sexo} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <div>
                    <label>Fecha de Nacimiento:</label>
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                </div>
                <div>
                    <label>Estado Civil:</label>
                    <select name="estadoCivil" value={formData.estadoCivil} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Soltero/a">Soltero/a</option>
                        <option value="Casado/a">Casado/a</option>
                        <option value="Divorciado/a">Divorciado/a</option>
                        <option value="Viudo/a">Viudo/a</option>
                    </select>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}

export default RegistrarReserv