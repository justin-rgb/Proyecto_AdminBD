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


    const handleSubmit = (event) => {
        event.preventDefault();

        //Enviar al endpoint del api



        //En caso de respuesta positiva
        //window.location = '/registrar'

        console.log("Username:", username);
        console.log("Password:", password);

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
