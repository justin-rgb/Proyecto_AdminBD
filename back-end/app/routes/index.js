const express = require('express');
const { Router } = require('express');
const { login } = require('../controllers/Login');
const { registrarCliente, registrarReserv } = require('../controllers/Registrar');

const router = Router();

router.get('/obtenerVuelos', (req, res) => {
    res.send('Obtener Vuelos');
});

router.post('/login', login);

router.post('/registrarCliente', registrarCliente);

router.post('/registrarReservacion', registrarReserv);


module.exports = router;


