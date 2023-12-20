//importamos express.js para utilizarlo en nuestro proyecto
const express = require('express')
const cors = require("cors");

// creamos un app con express.js

const app = express ()


app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const jugadores = [];

class Jugador {
    constructor(id){

        this.id = id;

    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques;
    }
}

class Mokepon {

    constructor(nombre){
        this.nombre = nombre
    }
}
// Le decimos a express.js que cuando en la Url raiz reciba una peticion responda '¡Hola Express!'

app.get('/unirse', (req,res) =>{

    const id = `${Math.random()}`

    const jugador  = new Jugador(id)

    jugadores.push(jugador)


    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {

    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0){

        jugadores[jugadorIndex].asignarMokepon(mokepon);

    }
    console.log(jugadores)
    console.log(jugadorId);
    res.end()

})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0){

        jugadores[jugadorIndex].actualizarPosicion(x, y);

    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => {

    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0){

        jugadores[jugadorIndex].asignarAtaques(ataques);

    }
    
    res.end()

})


app.get("/mokepon/:jugadorId/ataques", (req, res) => {

    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })

})


app.post("/reiniciar", (req, res) => {
    // res.setHeader("Cache-Control", "no-store");
    jugadores.length = 0; // Elimina todos los elementos del arreglo jugadores
    res.send("Jugadores reiniciados"); // Respuesta del servidor
    
});


//Le decimos que escuche continuamente en el puerto 8080 las peticiones de los clientes para que pueda responderlas

app.listen(8080,() => {
    console.log('Servidor funcionando')
})