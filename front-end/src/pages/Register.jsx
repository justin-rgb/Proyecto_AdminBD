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
    <div className="bg-info-subtle" 
      style={{ width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',
      // paddingBottom: '%'
      }}
    > 
      <div className="row" style={{ gap: '150px' }}>
        <div className='col' style={{ width: '100%' }}>
          <h2>Registrar Cliente</h2> 
          <RegistrarCliente />
        </div>

        <div className='col'>
          <h2>Registrar Reservación</h2>
          <RegistrarReserv />
        </div>
      </div>

      <button onClick={cerrarSesion} className='btn btn-danger'>Cerrar Sesion</button>
    </div>
  )
}

export default Register