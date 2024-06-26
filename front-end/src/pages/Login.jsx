import React from "react";
import { useState } from "react";

const Login = () => {
    // State para almacenar los valores del formulario
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Manejar cambios en los campos del formulario
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            'USUARIO': username.toString() || '',
            'CONTRASENA': password.toString() || ''
        }

        //Enviar al endpoint del api
        fetch('http://localhost:3000/login', {
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
            alert('Usuario no encontrado / No puede iniciar sesion')
            throw new Error('Usuario no encontrado')
        })
        .then( async (resp) => {

            localStorage.removeItem('ID')
            localStorage.removeItem('Usuario')
            localStorage.setItem('ID', resp.user[0])
            localStorage.setItem('Usuario', resp.user[1])

            alert('Ha iniciado sesión correctamente')
            window.location = '/registrar'
            return;
        })
        .catch( error => {
            console.error(error)
        })

    };

    return (
        <div className="bg-info-subtle" style={{ width: '100%', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column',
            paddingBottom: '10%'
        }}>
            <h2>VuelosCR <hr/> <h3>Iniciar Sesión</h3></h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="form-label">Nombre de usuario:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
