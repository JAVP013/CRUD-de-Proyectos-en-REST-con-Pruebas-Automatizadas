const express = require('express');
const bodyParser = require('body-parser');
const proyectRoutes = require('./routes/proyectRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/proyects', proyectRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
