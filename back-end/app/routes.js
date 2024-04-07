app.get('/login', (req, res) => {
    res.send('Iniciar sesion');
});

app.get('/reg_cliente', (req, res) => {
    res.send('Registrar cliente');
});

app.get('/reg_reservacion', (req, res) => {
res.send('Registrar reservacion');
});