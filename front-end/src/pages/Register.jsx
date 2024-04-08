import React from 'react'
import RegistrarCliente from '../components/RegistrarCliente'
import RegistrarReserv from '../components/RegistrarReserv'

const Register = () => {


  return (
    <> 
      <h1>Registrar cliente</h1> 
      <RegistrarCliente />



      <h1>Registrar reservacion</h1>
      <RegistrarReserv />
  
    </>
  )
}

export default Register