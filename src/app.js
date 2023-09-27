//DEPENDENCES
const express = require('express');
const app = express();

//FILES
const connectDB = require('./Config/conexion');


const PORT = process.env.PORT || 3000;
connectDB()
    .then(() =>{
        console.log('Conexion a la base de datos establecida');
        app.listen(PORT, () =>{
            console.log(`Servidor escuchando en el puerto ${PORT}`)
        })
    }).catch((err) =>{
        console.log('Error al conectar a la base de datos')
    })


//ROUTES


app.get('/api', (req, res) =>{
    res.send('Hola mundo!!');
})