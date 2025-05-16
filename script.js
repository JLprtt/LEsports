// script.js

// Función principal que se ejecutará cuando la página cargue
async function iniciarPrototipo() {
    try {
        // 1. Cargar datos de campeones desde champs.json usando fetch
        const respuestaChamps = await fetch('champs.json');
        if (!respuestaChamps.ok) {
            throw new Error(`HTTP error! status: ${respuestaChamps.status}`);
        }
        const campeonesData = await respuestaChamps.json();

        // 2. Los datos del torneo ya están cargados globalmente desde stats_torneo_ejemplo.js
        //    (la variable se llama 'statsTorneoEjemplo')

        // 3. Combinar datos de campeones con sus estadísticas del torneo
        const datosCombinados = combinarDatos(campeonesData, statsWorlds2011);

        // 4. Agrupar y calcular estadísticas por región
        const statsPorRegion = calcularStatsPorRegion(datosCombinados);

        // 5. Mostrar resultados por región en el HTML
        mostrarResultadosRegiones(statsPorRegion);

        // 6. Mostrar tabla de campeones con sus stats y región
        mostrarTablaCampeones(datosCombinados);

    } catch (error) {
        console.error("Error al iniciar el prototipo:", error);
        document.getElementById('resultados-regiones-container').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
        document.getElementById('tabla-campeones-container').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    }
}

// Función para combinar los datos de campeones con sus estadísticas
function combinarDatos(campeones, statsTorneo) {
    const datosCombinados = [];

    campeones.forEach(campeon => {
        // Buscamos las estadísticas para este campeón en el array de stats del torneo
        const statsCampeonEnTorneo = statsTorneo.find(stat => stat.nombre_campeon === campeon.name);

        let victorias = 0;
        let derrotas = 0;

        if (statsCampeonEnTorneo) {
            victorias = statsCampeonEnTorneo.victorias;
            derrotas = statsCampeonEnTorneo.derrotas;
        }

        datosCombinados.push({
            nombre: campeon.name,
            region: campeon.region,
            icono: campeon.icon,
            victorias: victorias,
            derrotas: derrotas,
            partidasJugadas: victorias + derrotas
        });
    });
    return datosCombinados;
}

// Función para calcular estadísticas agregadas por región
function calcularStatsPorRegion(datosCombinados) {
    const statsRegiones = {}; // Usaremos un objeto para agrupar: { "Demacia": { victorias: X, derrotas: Y }, ... }

    datosCombinados.forEach(campeon => {
        if (!campeon.region) return; // Si un campeón no tiene región, lo ignoramos

        if (!statsRegiones[campeon.region]) {
            // Si es la primera vez que vemos esta región, la inicializamos
            statsRegiones[campeon.region] = {
                victorias: 0,
                derrotas: 0,
                partidasJugadas: 0,
                campeones: [] // Para listar los campeones de esa región
            };
        }

        statsRegiones[campeon.region].victorias += campeon.victorias;
        statsRegiones[campeon.region].derrotas += campeon.derrotas;
        statsRegiones[campeon.region].partidasJugadas += campeon.partidasJugadas;
        statsRegiones[campeon.region].campeones.push(campeon.nombre); // Guardamos el nombre del campeón
    });

    // Calcular win rate para cada región
    for (const region in statsRegiones) {
        const regionData = statsRegiones[region];
        if (regionData.partidasJugadas > 0) {
            regionData.winRate = (regionData.victorias / regionData.partidasJugadas) * 100;
        } else {
            regionData.winRate = 0;
        }
    }
    return statsRegiones;
}

// Función para mostrar los resultados por región en el HTML
function mostrarResultadosRegiones(statsRegiones) {
    const container = document.getElementById('resultados-regiones-container');
    container.innerHTML = ''; // Limpiar contenido previo

    if (Object.keys(statsRegiones).length === 0) {
        container.innerHTML = '<p>No hay datos de regiones para mostrar.</p>';
        return;
    }

    // Ordenar regiones por más victorias (opcional, pero útil)
    const regionesOrdenadas = Object.entries(statsRegiones)
        .sort(([, a], [, b]) => b.victorias - a.victorias);


    regionesOrdenadas.forEach(([nombreRegion, data]) => {
        const regionDiv = document.createElement('div');
        regionDiv.innerHTML = `
            <h3>${nombreRegion}</h3>
            <p>Victorias: ${data.victorias}</p>
            <p>Derrotas: ${data.derrotas}</p>
            <p>Partidas Jugadas: ${data.partidasJugadas}</p>
            <p>Win Rate: ${data.winRate.toFixed(2)}%</p>
            <!-- <p>Campeones: ${data.campeones.join(', ')}</p> --> <!-- Descomentar si quieres ver los campeones -->
        `;
        container.appendChild(regionDiv);
    });
}

// Función para mostrar la tabla de campeones
function mostrarTablaCampeones(datosCombinados) {
    const container = document.getElementById('tabla-campeones-container');
    container.innerHTML = ''; // Limpiar

    if (datosCombinados.length === 0) {
        container.innerHTML = '<p>No hay datos de campeones para mostrar.</p>';
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Encabezados de la tabla
    thead.innerHTML = `
        <tr>
            <th>Icono</th>
            <th>Campeón</th>
            <th>Región</th>
            <th>Victorias</th>
            <th>Derrotas</th>
            <th>Partidas Jugadas</th>
        </tr>
    `;

    // Filas con datos de campeones
    datosCombinados.forEach(campeon => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><img src="${campeon.icono}" alt="${campeon.nombre}" title="${campeon.nombre}"></td>
            <td>${campeon.nombre}</td>
            <td>${campeon.region || 'N/A'}</td>
            <td>${campeon.victorias}</td>
            <td>${campeon.derrotas}</td>
            <td>${campeon.partidasJugadas}</td>
        `;
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}


// Ejecutar la función principal cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', iniciarPrototipo);