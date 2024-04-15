import React from 'react'
import RegistrarCliente from '../components/RegistrarCliente'
import RegistrarReserv from '../components/RegistrarReserv'
import { useEffect } from 'react'

const Register = () => {

  useEffect( () => {
    const usuario = localStorage.getItem('Usuario')
    if(usuario === null || usuario === undefined) window.location = '/'
  },[])

  const cerrarSesion = () => {
    localStorage.removeItem('Usuario')
    localStorage.removeItem('ID')
    location.reload()
  }



  return (
    <> 
      <h1>Registrar cliente</h1> 
      <RegistrarCliente />



      <h1>Registrar reservacion</h1>
      <RegistrarReserv />
  

      <button onClick={cerrarSesion}>Cerrar Sesion</button>
    </>
  )
}

export default Register