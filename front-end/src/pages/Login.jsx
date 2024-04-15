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
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
