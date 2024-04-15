const express = require('express');
const { Router } = require('express');
const { login } = require('../controllers/Login');
const { registrarCliente, registrarReserv } = require('../controllers/Registrar');
const { obtenerVuelos, registrarReserva } = require('../controllers/Vuelos');
const { obtenerCliente } = require('../controllers/Clientes');

const router = Router();

router.get('/obtenerVuelos', obtenerVuelos);

router.post('/obtenerCliente', obtenerCliente)

router.post('/login', login);

router.post('/registrarCliente', registrarCliente);

router.post('/registrarReserva', registrarReserva)

module.exports = router;


