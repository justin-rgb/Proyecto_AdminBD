const express = require('express');
const { Router } = require('express');
const { login } = require('../controllers/Login');
const { registrarCliente, registrarReserv } = require('../controllers/Registrar');
const { obtenerVuelos } = require('../controllers/Vuelos');

const router = Router();

router.get('/obtenerVuelos', obtenerVuelos);

router.post('/login', login);

router.post('/registrarCliente', registrarCliente);

router.post('/registrarReservacion', registrarReserv);


module.exports = router;


