// Iniciar Juego.
const sectionReiniciar = document.getElementById("reiniciar");
const sectionSeleccionarAtaque = document.getElementById("seleccionar_Ataque");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const contenedorAtaques = document.getElementById("contenedorAtaques");

// seleccionarMascotaJugador.

const sectionSeleccionarMascota = document.getElementById(
    "seleccionar_Mascota"
);
const spanMascotaJugador = document.getElementById("mascotaJugador");
const contenerdorImagenMokepon = document.getElementById("ImagenDeMokepon");

const spanMascotaEnemigo = document.getElementById("mascotaEnemigo");

// combate.

const spanVidasJugador = document.getElementById("vidasJugador");
const spanVidasEnemigo = document.getElementById("vidasEnemigo");

// corazones.

const spanCorazonesJugador = document.getElementById("corazonesJugador");
const spanCorazonesEnemigo = document.getElementById("corazonesEnemigo");

// crearMensaje.

const sectionataqueDelJugador = document.getElementById("ataqueDelJugador");
const sectionataqueDelEnemigo = document.getElementById("ataqueDelEnemigo");

// crearMensajeFinal.

const sectionMensajes = document.getElementById("resultado");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

const sectionVerMapa = document.getElementById("verMapa");
const mapa = document.getElementById("mapa");
const botonesMover = document.getElementById("botonesMover");

// Variables Globales.

let ataques;
let jugadorId = null;
let enemigoId = null;
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputTucapalma;
let inputPydos;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;

let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];

let verificartipo;
let ciclo;

let indexAtaqueJugador;
let indexAtaqueEnemigo;

let victoriasJugador = 0;
let victoriasEnemigo = 0;

let mokepones = [];
let mokeponesEnemigos = [];

let lienzo = mapa.getContext("2d");
let intervalo;

let mapaBackgroud = new Image();
mapaBackgroud.src = "Imagenes/mapa/mapa.png";

// Configurar altura del mapa en la pagina web

let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;

const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
}
alturaQueBuscamos = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

// Clase en Javascript;

class Mokepon {
    constructor(nombre, imagen, vida, tipo, imagenMapa, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = [];
        this.tipo = tipo;
        this.ancho = 40;
        this.alto = 40;

        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaImagen = new Image();
        this.mapaImagen.src = imagenMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(this.mapaImagen, this.x, this.y, this.ancho, this.alto);
    }
}

let hipodoge = new Mokepon(
    "Hipodoge",
    "Imagenes/Animales/Hipodoge.png",
    5,
    "Agua",
    "Imagenes/Animales/cabezaPersonajes/hipodoge.png",
    jugadorId
);
let capipepo = new Mokepon(
    "Capipepo",
    "Imagenes/Animales/capipepo.png",
    5,
    "Tierra",
    "Imagenes/Animales/cabezaPersonajes/capipepo.png",
    jugadorId
);
let ratigueya = new Mokepon(
    "Ratigueya",
    "Imagenes/Animales/ratigueya.png",
    5,
    "Fuego",
    "Imagenes/Animales/cabezaPersonajes/ratigueya.png",
    jugadorId
);
let langostelvis = new Mokepon(
    "Langostelvis",
    "Imagenes/Animales/langostelvis.png",
    5,
    "Fuego",
    "Imagenes/Animales/cabezaPersonajes/langostelvis.png",
    jugadorId
);
let tucapalma = new Mokepon(
    "Tucapalma",
    "Imagenes/Animales/tucapalma.png",
    5,
    "Tierra",
    "Imagenes/Animales/cabezaPersonajes/tucapalma.png",
    jugadorId
);
let pydos = new Mokepon(
    "Pydos",
    "Imagenes/Animales/Pydos.png",
    5,
    "Agua",
    "Imagenes/Animales/cabezaPersonajes/pydos.png",
    jugadorId
);

// Introduciendo los valores al arreglo.

// ataques

const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES);

// hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES);

const CAPIPEPO_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
];

capipepo.ataques.push(...CAPIPEPO_ATAQUES);

// capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
];

ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

// ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES);

const LANGOSTELVIS_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
];

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES);

// langostelvisEnemigo.ataques.push(...LANGOSTELVIS_ATAQUES);

const TUCAPALMA_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
];

tucapalma.ataques.push(...TUCAPALMA_ATAQUES);

// tucapalmaEnemigo.ataques.push(...TUCAPALMA_ATAQUES);

const PYDOS_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
];

pydos.ataques.push(...PYDOS_ATAQUES);

// pydosEnemigo.ataques.push(...PYDOS_ATAQUES);

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos);

function iniciarJuego() {
    sectionReiniciar.style.display = "none";
    sectionSeleccionarAtaque.style.display = "none";
    sectionVerMapa.style.display = "none";
    botonesMover.style.display = "none";

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `

        <input type="radio" name="mascota" id= ${mokepon.nombre} />
        <label class ="tarjetasMokepon" for=${mokepon.nombre}>

            <p>${mokepon.nombre}</p>
            <img src=${mokepon.imagen} alt= ${mokepon.nombre}>
            
        </label><br>
        `;
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        // creo los id de HTML

        inputHipodoge = document.getElementById("Hipodoge");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya");
        inputLangostelvis = document.getElementById("Langostelvis");
        inputTucapalma = document.getElementById("Tucapalma");
        inputPydos = document.getElementById("Pydos");
    });

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    botonReiniciar.addEventListener("click", ReiniciarJuego);
    botonReiniciar.disabled = true;

    unirseAlJuego();
}

function unirseAlJuego() {
    fetch("http://192.168.18.4:8080/unirse").then(function (res) {
        if (res.ok) {
            res.text().then(function (respuesta) {
                console.log(respuesta);
                jugadorId = respuesta;
            });
        }
    });
}

function seleccionarMascotaJugador() {
    switch (true) {
        case inputHipodoge.checked:
            spanMascotaJugador.innerHTML = inputHipodoge.id;
            mascotaJugador = inputHipodoge.id;
            // Ocultar sesiones
            sectionSeleccionarMascota.style.display = "none";
            sectionVerMapa.style.display = "flex";
            botonesMover.style.display = "flex";

            break;

        case inputCapipepo.checked:
            spanMascotaJugador.innerHTML = inputCapipepo.id;
            mascotaJugador = inputCapipepo.id;
            // Ocultar sesiones
            sectionSeleccionarMascota.style.display = "none";
            sectionVerMapa.style.display = "flex";
            botonesMover.style.display = "flex";

            break;

        case inputRatigueya.checked:
            spanMascotaJugador.innerHTML = inputRatigueya.id;
            mascotaJugador = inputRatigueya.id;
            // Ocultar sesiones
            sectionSeleccionarMascota.style.display = "none";
            sectionVerMapa.style.display = "flex";
            botonesMover.style.display = "flex";

            break;

        case inputLangostelvis.checked:
            spanMascotaJugador.innerHTML = inputLangostelvis.id;
            mascotaJugador = inputLangostelvis.id;
            // Ocultar sesiones
            sectionSeleccionarMascota.style.display = "none";
            sectionVerMapa.style.display = "flex";
            botonesMover.style.display = "flex";

            break;

        case inputTucapalma.checked:
            spanMascotaJugador.innerHTML = inputTucapalma.id;
            mascotaJugador = inputTucapalma.id;
            // Ocultar sesiones
            sectionSeleccionarMascota.style.display = "none";
            sectionVerMapa.style.display = "flex";
            botonesMover.style.display = "flex";

            break;

        case inputPydos.checked:
            spanMascotaJugador.innerHTML = inputPydos.id;
            mascotaJugador = inputPydos.id;
            // Ocultar sesiones
            sectionSeleccionarMascota.style.display = "none";
            sectionVerMapa.style.display = "flex";
            botonesMover.style.display = "flex";

            break;

        default:
            alert("SELECCIONA UNA MASCOTA");
            break;
    }

    seleccionarMokepon(mascotaJugador);
    iniciarMapa();
    extraerAtaques(mascotaJugador);
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.18.4:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mokepon: mascotaJugador,
        }),
    });
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    let img = document.createElement("img");

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
            verificartipo = mokepones[i].tipo;
            img.src = mokepones[i].imagen;
            contenerdorImagenMokepon.appendChild(img);
        }
    }

    mostrarAtaques(ataques);
    verificarTipo();
}

function verificarTipo() {
    switch (true) {
        case verificartipo == "Agua":
            ciclo = 5;

            break;

        case verificartipo == "Tierra" || verificartipo == "Fuego":
            ciclo = 5;

            break;
    }
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        
        <button id=${ataque.id} class = "botonDeAtaque">
        <b>${ataque.nombre}</b>
        </button>&nbsp

        `;
        contenedorAtaques.innerHTML += ataquesMokepon;
    });

    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");
    botones = document.querySelectorAll(".botonDeAtaque");
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO");
                console.log(ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true;
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA");
                console.log(ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true;
            } else if (e.target.textContent === "🌱") {
                ataqueJugador.push("TIERRA");
                console.log(ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true;
            }
            if (ataqueJugador.length === ciclo) {
                enviarAtaques();
            }
        });
    });
}

function enviarAtaques() {
    fetch(`http://192.168.18.4:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            ataques: ataqueJugador,
        }),
    });

    intervalo = setInterval(obtenerAtaques, 50);
    obtenerAtaques(ataques);
}

function obtenerAtaques(ataques) {
    fetch(`http://192.168.18.4:8080/mokepon/${enemigoId}/ataques`).then(function (
        res
    ) {
        if (res.ok) {
            res.json().then(function ({ ataques }) {
                if (ataques.length === 5) {
                    ataqueEnemigo = ataques;
                    combate();
                }
            });
        }
    });
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// ATAQUE ENEMIGO

function AtaqueAleatorioEnemigo() {
    console.log("ataques enemigo", ataquesMokeponEnemigo);
    let seleccionarAtaque = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    let ataqueSeleccionado = ataquesMokeponEnemigo[seleccionarAtaque].nombre;

    if (ataqueSeleccionado === "🔥") {
        ataqueEnemigo.push("FUEGO");
    } else if (ataqueSeleccionado === "💧") {
        ataqueEnemigo.push("AGUA");
    } else if (ataqueSeleccionado === "🌱") {
        ataqueEnemigo.push("TIERRA");
    }

    console.log(ataqueEnemigo);
    iniciarCombate();
}

function iniciarCombate() {
    switch (true) {
        case ataqueJugador.length === ciclo:
            combate();

            break;
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    /*
       RATIGUEYA = 1. FUEGO
      HIPODOGE = 2. AGUA
      CAPIPEPO = 3. TIERRA
     
  
      LANGOSTELVIS = AGUA Y FUEGO
      TUCAPALMA = AGUA Y TIERRA
      PYDOS = TIERRA Y FUEGO
  
      */

    // colocar texto en negrilla
    spanVidasJugador.style.fontWeight = "bold";
    // colocar texto mas grande
    spanVidasJugador.style.fontSize = "30px";

    // colocar texto en negrilla
    spanVidasEnemigo.style.fontWeight = "bold";
    // colocar texto mas grande
    spanVidasEnemigo.style.fontSize = "30px";

    clearInterval(intervalo);

    for (let i = 0; i < ataqueJugador.length; i++) {
        switch (true) {
            case ataqueJugador[i] === ataqueEnemigo[i]:
                indexAmbosOponentes(i, i);
                crearMensaje("EMPATE 🤜🤛");

                break;

            case ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA":
                indexAmbosOponentes(i, i);
                crearMensaje("GANASTES 🥇");
                victoriasJugador++;
                spanVidasJugador.innerHTML = victoriasJugador;
                corazones();

                break;

            case ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO":
                indexAmbosOponentes(i, i);
                crearMensaje("GANASTES 🥇");
                victoriasJugador++;
                spanVidasJugador.innerHTML = victoriasJugador;
                corazones();

                break;

            case ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA":
                indexAmbosOponentes(i, i);
                crearMensaje("GANASTES 🥇");
                victoriasJugador++;
                spanVidasJugador.innerHTML = victoriasJugador;
                corazones();

                break;

            default:
                indexAmbosOponentes(i, i);
                crearMensaje("PERDISTES 😢");
                victoriasEnemigo++;
                spanVidasEnemigo.innerHTML = victoriasEnemigo;
                corazones();

                break;
        }
    }

    // Revisar Vidas

    RevisarVictorias();
}

function RevisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        // Ganamos

        crearMensajeFinal("ESTO FUE UN EMPATE 🤜🤛");
    } else if (victoriasJugador > victoriasEnemigo) {
        // Ganamos

        crearMensajeFinal("¡FELICITACIONE! - GANASTES🙌");
    } else {
        crearMensajeFinal("Lo siento Perdistes 😢");
    }
}

function corazones() {
    spanCorazonesJugador.style.color = "red";
    spanCorazonesEnemigo.style.color = "red";

    if (victoriasJugador == 0) {
        spanCorazonesJugador.innerHTML = "😢";
    } else if (victoriasJugador == 1) {
        spanCorazonesJugador.innerHTML = "❤";
    } else if (victoriasJugador == 2) {
        spanCorazonesJugador.innerHTML = "❤❤";
    } else if (victoriasJugador == 3) {
        spanCorazonesJugador.innerHTML = "❤❤❤";
    } else if (victoriasJugador == 4) {
        spanCorazonesJugador.innerHTML = "❤❤❤❤";
    } else if (victoriasJugador == 5) {
        spanCorazonesJugador.innerHTML = "❤❤❤❤❤";
    }

    if (victoriasEnemigo == 0) {
        spanCorazonesEnemigo.innerHTML = "😢";
    } else if (victoriasEnemigo == 1) {
        spanCorazonesEnemigo.innerHTML = "💔";
    } else if (victoriasEnemigo == 2) {
        spanCorazonesEnemigo.innerHTML = "💔💔";
    } else if (victoriasEnemigo == 3) {
        spanCorazonesEnemigo.innerHTML = "💔💔💔";
    } else if (victoriasEnemigo == 4) {
        spanCorazonesEnemigo.innerHTML = "💔💔💔💔";
    } else if (victoriasEnemigo == 5) {
        spanCorazonesEnemigo.innerHTML = "💔💔💔💔💔";
    }
}

// CREAR MENSAJE

function crearMensaje(Resultado) {
    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = Resultado;
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    sectionataqueDelJugador.appendChild(nuevoAtaqueJugador);
    sectionataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;

    sectionMensajes.appendChild(document.createElement("br"));

    botonReiniciar.disabled = false;

    sectionReiniciar.style.display = "block";
}

function ReiniciarJuego() {

    textofinal();
     
}





function textofinal() {
    swal({

        title: "SE REINICIARA EL JUEGO",
        icon: "warning",
        buttons: true,
        dangerMode: true,

    }).then((willDelete) => {

        if (willDelete) {

            fetch("http://192.168.18.4:8080/reiniciar", {
                method: "POST",
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data); // Mensaje de respuesta del servidor
                    // Resto del código para reiniciar el juego
                    location. reload()
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    });
}

function pintarCanvas() {
    mascotaJugadorObjeto.x =
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y =
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);

    lienzo.drawImage(mapaBackgroud, 0, 0, mapa.width, mapa.height);

    mascotaJugadorObjeto.pintarMokepon();

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon();
        revisarColision(mokepon);
    });
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.18.4:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            x,
            y,
        }),
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemigos }) {
                console.log(enemigos);

                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null;
                    const mokeponNombre = enemigo.mokepon.nombre || "";

                    if (mokeponNombre == "Hipodoge") {
                        mokeponEnemigo = new Mokepon(
                            "Hipodoge",
                            "Imagenes/Animales/Hipodoge.png",
                            5,
                            "Agua",
                            "Imagenes/Animales/cabezaPersonajes/hipodoge.png",
                            enemigo.id
                        );
                    } else if (mokeponNombre == "Capipepo") {
                        mokeponEnemigo = new Mokepon(
                            "Capipepo",
                            "Imagenes/Animales/capipepo.png",
                            5,
                            "Tierra",
                            "Imagenes/Animales/cabezaPersonajes/capipepo.png",
                            enemigo.id
                        );
                    } else if (mokeponNombre == "Ratigueya") {
                        mokeponEnemigo = new Mokepon(
                            "Ratigueya",
                            "Imagenes/Animales/ratigueya.png",
                            5,
                            "Fuego",
                            "Imagenes/Animales/cabezaPersonajes/ratigueya.png",
                            enemigo.id
                        );
                    } else if (mokeponNombre == "Langostelvis") {
                        mokeponEnemigo = new Mokepon(
                            "Langostelvis",
                            "Imagenes/Animales/langostelvis.png",
                            5,
                            "Fuego",
                            "Imagenes/Animales/cabezaPersonajes/langostelvis.png",
                            enemigo.id
                        );
                    } else if (mokeponNombre == "Tucapalma") {
                        mokeponEnemigo = new Mokepon(
                            "Tucapalma",
                            "Imagenes/Animales/tucapalma.png",
                            5,
                            "Tierra",
                            "Imagenes/Animales/cabezaPersonajes/tucapalma.png",
                            enemigo.id
                        );
                    } else if (mokeponNombre == "Pydos") {
                        mokeponEnemigo = new Mokepon(
                            "Pydos",
                            "Imagenes/Animales/Pydos.png",
                            5,
                            "Agua",
                            "Imagenes/Animales/cabezaPersonajes/pydos.png",
                            enemigo.id
                        );
                    }

                    mokeponEnemigo.x = enemigo.x;
                    mokeponEnemigo.y = enemigo.y;

                    return mokeponEnemigo;
                });
            });
        }
    });
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba();
            break;

        case "ArrowDown":
            moverAbajo();
            break;

        case "ArrowLeft":
            moverIzquierda();
            break;

        case "ArrowRight":
            moverDerecha();
            break;
    }
}

function iniciarMapa() {
    mapa.width = 320;
    mapa.height = 240;
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);

    window.addEventListener("keydown", sePresionoUnaTecla);
    window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    // mascota Jugador

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    } else {
        detenerMovimiento();
        clearInterval(intervalo);

        enemigoId = enemigo.id;

        sectionSeleccionarAtaque.style.display = "flex";
        sectionVerMapa.style.display = "none";
        botonesMover.style.display = "none";
        seleccionarMascotaEnemigo(enemigo);
    }
}

window.addEventListener("load", iniciarJuego);
