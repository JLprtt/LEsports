// script.js

// Variables globales para el estado de ordenación de cada tabla
let sortStateRegiones = { column: 'victorias', direction: 'desc' }; // Por defecto, ordenar por victorias descendente
let sortStateCampeones = { column: 'partidasJugadas', direction: 'desc' }; // Por defecto, partidas jugadas descendente

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

//Función para ordenar las tablas
function ordenarArray(array, columna, direccion) {
    return array.sort((a, b) => {
        if (typeof a[columna] === 'string') {
            return direccion === 'asc'
                ? a[columna].localeCompare(b[columna])
                : b[columna].localeCompare(a[columna]);
        } else {
            return direccion === 'asc'
                ? a[columna] - b[columna]
                : b[columna] - a[columna];
        }
    });
}

//Función auxiliar para generar los encabezados con flecha
function generarEncabezadosConFlechas(columnas, sortState) {
    return columnas.map(col => {
        const esActiva = col.key === sortState.column;
        const flecha = esActiva ? `<span class="sort-arrow ${sortState.direction}"></span>` : '';
        return `<th data-col="${col.key}">${col.label}${flecha}</th>`;
    }).join('');
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

// script.js
// ... (el resto de tu código JS se mantiene igual arriba de esto) ...

// Función para mostrar los resultados por región en el HTML EN FORMATO TABLA
function mostrarResultadosRegiones(statsRegiones, columnaOrden = 'victorias', direccion = 'desc') {
    const container = document.getElementById('resultados-regiones-container');
    container.innerHTML = '';

    if (Object.keys(statsRegiones).length === 0) {
        container.innerHTML = '<p>No hay datos de regiones para mostrar.</p>';
        return;
    }

    const regionesArray = Object.entries(statsRegiones).map(([region, datos]) => ({
        region,
        ...datos
    }));

    const regionesOrdenadas = ordenarArray(regionesArray, columnaOrden, direccion);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const columnasRegiones = [
        { key: 'region', label: 'Región' },
        { key: 'victorias', label: 'Victorias' },
        { key: 'derrotas', label: 'Derrotas' },
        { key: 'partidasJugadas', label: 'Partidas Jugadas' },
        { key: 'winRate', label: 'Win Rate (%)' }
    ];
    thead.innerHTML = `<tr>${generarEncabezadosConFlechas(columnasRegiones, sortStateRegiones)}</tr>`;


    regionesOrdenadas.forEach(data => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${data.region}</td>
            <td style="text-align:center">${data.victorias}</td>
            <td style="text-align:center">${data.derrotas}</td>
            <td style="text-align:center">${data.partidasJugadas}</td>
            <td style="text-align:center">${data.winRate.toFixed(2)}</td>
        `;
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);

    // EVENTOS DE ORDENAMIENTO
    thead.querySelectorAll('th').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
            const col = th.getAttribute('data-col');
            sortStateRegiones.direction = sortStateRegiones.column === col
                ? (sortStateRegiones.direction === 'asc' ? 'desc' : 'asc')
                : 'desc';
            sortStateRegiones.column = col;
            mostrarResultadosRegiones(statsRegiones, col, sortStateRegiones.direction);
        });
    });
}

// ... (el resto de tu código JS, como mostrarTablaCampeones y iniciarPrototipo, se mantiene igual debajo de esto) ...

// Función para mostrar la tabla de campeones
function mostrarTablaCampeones(datosCombinados, columnaOrden = 'partidasJugadas', direccion = 'desc') {
    const container = document.getElementById('tabla-campeones-container');
    container.innerHTML = '';

    if (datosCombinados.length === 0) {
        container.innerHTML = '<p>No hay datos de campeones para mostrar.</p>';
        return;
    }

    const datosOrdenados = ordenarArray([...datosCombinados], columnaOrden, direccion);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const columnasCampeones = [
        { key: null, label: 'Icono' }, // No ordenable
        { key: 'nombre', label: 'Campeón' },
        { key: 'region', label: 'Región' },
        { key: 'victorias', label: 'Victorias' },
        { key: 'derrotas', label: 'Derrotas' },
        { key: 'partidasJugadas', label: 'Partidas Jugadas' }
    ];

    thead.innerHTML = `<tr>${columnasCampeones.map(col => {
        if (!col.key) return `<th>${col.label}</th>`; // sin sort-arrow
        const esActiva = col.key === sortStateCampeones.column;
        const flecha = esActiva ? `<span class="sort-arrow ${sortStateCampeones.direction}"></span>` : '';
        return `<th data-col="${col.key}">${col.label}${flecha}</th>`;
    }).join('')}</tr>`;


    datosOrdenados.forEach(campeon => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><img src="${campeon.icono}" alt="${campeon.nombre}" title="${campeon.nombre}" width="32"></td>
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

    // EVENTOS DE ORDENAMIENTO
    thead.querySelectorAll('th[data-col]').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
            const col = th.getAttribute('data-col');
            sortStateCampeones.direction = sortStateCampeones.column === col
                ? (sortStateCampeones.direction === 'asc' ? 'desc' : 'asc')
                : 'desc';
            sortStateCampeones.column = col;
            mostrarTablaCampeones(datosCombinados, col, sortStateCampeones.direction);
        });
    });
}


// Ejecutar la función principal cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', iniciarPrototipo);