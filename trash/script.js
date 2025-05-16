/*/ --- NO definas 'champions' y 'statsDelTorneo' directamente aquí ---
// Los cargaremos desde los archivos JSON

// Función principal que ahora se encargará de cargar los datos primero
async function iniciarProcesamiento() {
    try {
        // 1. Cargar los datos de los campeones
        const respuestaCampeones = await fetch('./champs.json'); // Asume que está en la misma carpeta
        if (!respuestaCampeones.ok) {
            throw new Error(`Error al cargar campeones.json: ${respuestaCampeones.statusText}`);
        }
        const champions = await respuestaCampeones.json();

        // 2. Cargar los datos de las estadísticas del torneo
        const respuestaStats = await fetch('./championships.json'); // Asume que está en la misma carpeta
        if (!respuestaStats.ok) {
            throw new Error(`Error al cargar stats_torneo.json: ${respuestaStats.statusText}`);
        }
        const statsDelTorneo = await respuestaStats.json();

        // Si se cargaron ambos archivos correctamente, llamamos a la función de cálculo
        if (champions && statsDelTorneo) {
            console.log("Datos de campeones cargados:", champions);
            console.log("Datos del torneo cargados:", statsDelTorneo);
            calcularYMostrarEstadisticas(champions, statsDelTorneo);
        }

    } catch (error) {
        console.error("Hubo un error al cargar los datos JSON:", error);
        const resultadosDiv = document.getElementById('resultados-regiones');
        if (resultadosDiv) {
            resultadosDiv.innerHTML = `<p style="color: red;">Error al cargar los datos. Revisa la consola para más detalles.</p>`;
        }
    }
}

// Modificamos la función para que reciba los datos como parámetros
function calcularYMostrarEstadisticas(championsArray, statsTorneoArray) {
    // 1. Crear un mapa para buscar rápidamente la región de cada campeón
    const regionPorCampeon = {};
    championsArray.forEach(campeon => {
        const nombreNormalizado = campeon.nombre.toLowerCase().replace(/\s+/g, '');
        regionPorCampeon[nombreNormalizado] = campeon.region;
    });

    // 2. Inicializar el objeto para guardar estadísticas por región
    const statsPorRegion = {};

    // 3. Procesar las estadísticas del torneo y agregar por región
    statsTorneoArray.forEach(stat => {
        const nombreNormalizado = stat.nombre_campeon.toLowerCase().replace(/\s+/g, '');
        const region = regionPorCampeon[nombreNormalizado];

        if (region) {
            if (!statsPorRegion[region]) {
                statsPorRegion[region] = {
                    victorias: 0,
                    derrotas: 0,
                    partidas: 0
                };
            }
            statsPorRegion[region].victorias += stat.victorias;
            statsPorRegion[region].derrotas += stat.derrotas;
        } else {
            console.warn(`Campeón "${stat.nombre_campeon}" de las estadísticas no encontrado o sin región.`);
        }
    });

    // 4. Calcular totales y win rate
    Object.keys(statsPorRegion).forEach(region => {
        const regionData = statsPorRegion[region];
        regionData.partidas = regionData.victorias + regionData.derrotas;
        if (regionData.partidas > 0) {
            regionData.winrate = (regionData.victorias / regionData.partidas) * 100;
        } else {
            regionData.winrate = 0;
        }
    });

    // 5. Mostrar los resultados en el HTML (el código de esta parte no cambia)
    const resultadosDiv = document.getElementById('resultados-regiones');
    if (!resultadosDiv) {
        console.error("Elemento con id 'resultados-regiones' no encontrado.");
        return;
    }
    resultadosDiv.innerHTML = '';
    const tabla = document.createElement('table');
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Región</th>
                <th>Victorias</th>
                <th>Derrotas</th>
                <th>Partidas Totales</th>
                <th>Win Rate (%)</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = tabla.querySelector('tbody');
    const regionesOrdenadas = Object.keys(statsPorRegion).sort();
    regionesOrdenadas.forEach(region => {
        const data = statsPorRegion[region];
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${region}</td>
            <td>${data.victorias}</td>
            <td>${data.derrotas}</td>
            <td>${data.partidas}</td>
            <td>${data.winrate.toFixed(1)}%</td>
        `;
        tbody.appendChild(fila);
    });
    resultadosDiv.appendChild(tabla);
}

// --- Llamar a la función principal para iniciar la carga y el procesamiento ---
iniciarProcesamiento();*/
REGIONS = {
    DEMACIA: 'Demacia',
    NOXUS: 'Noxus',
    IONIA: 'Ionia',
    FRELJORD: 'Freljord',
    SHURIMA: 'Shurima',
    BILGEWATER: 'Bilgewater',
    PILTOVER: 'Piltover',
    ZAUN: 'Zaun',
    TARGON: 'Targon',
    IXTAL: 'Ixtal',
    SHADOW_ISLES: 'Shadow Isles',
    BANDLE_CITY: 'Bandle City',
    VOID: 'Void',
    BLESSED_ISLES: 'Blessed Isles',
    CAMAVOR: 'Camavor',
    ICATHIA: 'Icathia',
    RUNETERRA: 'Runeterra'
    // Puedes añadir más si es necesario (ej: CAMAVOR, ICATHIA si los consideras)
  };

FACTIONS = {
    DARKIN: 'Darkin',
    VASTAYA: 'Vastaya', // Broad category, might suffice for Ahri
    KINKOU_ORDER: 'Kinkou Order',
    SHADOW_ORDER: 'Shadow Order',
    SHOJIN_ORDER: 'Shojin Order',
    XAN_HOUSE: 'Xan House',
    SENTINELS_OF_LIGHT: 'Sentinels of Light',
    MINOTAURS: 'Minotaurs', // Specific group for Alistar
    RECKONERS: 'Reckoners', // Specific group for Alistar
    FROSTGUARD: 'Frostguard',
    YIPSNAKES: 'Yipsnakes', // Specific for Corki
    HOUSE_LIGHTSHIELD: 'House Lightshield', // Demacian nobility
    HOUSE_SPIRITMIGHT: 'House Spiritmight', // Maybe less common?
    HOUSE_VAYNE: 'House Vayne', // Demacian nobility
    HOUSE_BUVELLE: 'House Buvelle',
    HOUSE_CROWNGUARD: 'House Crownguard',
    DAUNTLESS_VANGUARD: 'Dauntless Vanguard',
    HOUSE_SWAIN: 'House Swain',
    TRIFARIX: 'Trifarix',
    CRIMSON_CIRCLE: 'Crimson Circle', // Vladimir specific
    BLACK_ROSE: 'Black Rose',
    VOL_KALAH_HEIGAARI: 'Vol Kalah Heigaari', // Maybe too specific?
    CLAN_KIRAMMAN: 'Clan Kiramman',
    // Add some other common ones:
    PILTOVER_POLICE_DEPARTMENT: 'Piltover Police Department',
    AVAROSAN: 'Avarosan', // Ashe/Tryndamere Freljord tribe
    WINTERS_CLAW: 'Winter\'s Claw', // Sejuani Freljord tribe (Note the apostrophe requires careful handling or escaping if used directly in some contexts, but fine as string value)
    FROST_TROLLS: 'Frost Trolls',
    SOLARI: 'Solari', // Leona/Diana Targon faction
    LUNARI: 'Lunari', // Diana/Aphelios Targon faction
    ASPECTS: 'Aspects', // Targon celestial beings
    ASCENDED: 'Ascended', // Shurima demigods
    PAKAA_TRIBE: 'Pakaa Tribe', //Nidalee Tribe
    THE_CULT_OF_THE_VOID: 'The Cult of the Void',
    IRON_REVENANT: 'Iron Revenant',
    BANDLE_SCOUTS: 'Bandle Scouts',
    JAGGED_HOOKS: 'Jagged Hooks',
    THE_PRESERVERS_OF_VALORAN: 'The Preservers of Valoran',
    ILLUMINATORS: 'Illuminators',
    SYRENS: 'Syrens',
    // Consider adding broader affiliations if needed, matching regions? DEMACIA_AFFILIATION? NOXUS_AFFILIATION? Maybe too redundant with REGIONS. Stick to specific named groups/orders.
    UNAFFILIATED: 'Unaffiliated', // For champs without a clear faction
  };

const SPECIES = {
    HUMAN: 'Human',
    DARKIN: 'Darkin',
    VASTAYA: 'Vastaya', // Broad category for Ahri, Rakan, Xayah, Rengar etc.
    VESANI: 'Vesani', // Keep if user wants Ahri's specific tribe
    MINOTAUR: 'Minotaur',
    YETI: 'Yeti',
    YORDLE: 'Yordle',
    ASCENDED: 'Ascended', // Nasus, Renekton, Azir
    SPIRIT_GOD: 'Spirit God', // Anivia, Ornn, Volibear
    CELESTIAL: 'Celestial', // Bard, Soraka
    DEMON: 'Demon', // Evelynn, Fiddle, Tahm
    UNDEAD: 'Undead', // Karthus, Sion, Kalista
    REVENANT: 'Revenant', // Mordekaiser, Yorick (similar to Undead, maybe combine?) -> Let's keep separate for now.
    GOLEM: 'Golem', // Blitzcrank
    CONSTRUCT: 'Construct', // Galio, Orianna
    VOIDBORN: 'Voidborn', // Cho, Kha, Rek, Vel
    BRACKERN: 'Brackern', // Skarner
    TROLL: 'Troll',
    //
    UNKNOWN: 'Unknown'
  };

async function iniciarProcesamiento() {
    try {
        const respuestaDatosCompletos = await fetch('./datos_campeones.json');
        if (!respuestaDatosCompletos.ok) {
            throw new Error(`Error al cargar datos_campeones.json: ${respuestaDatosCompletos.statusText}`);
        }
        const datosCompletos = await respuestaDatosCompletos.json();

        // Ahora puedes acceder a cada parte:
        const REGIONS = datosCompletos.REGIONS;
        const FACTIONS = datosCompletos.FACTIONS;
        const SPECIES = datosCompletos.SPECIES;
        const champions = datosCompletos.CHAMPIONS; // Este es tu array de campeones

        console.log("Regiones cargadas:", REGIONS);
        console.log("Campeones cargados:", champions);

        // Carga tus stats_torneo.json como antes
        const respuestaStats = await fetch('./stats_torneo.json');
        if (!respuestaStats.ok) {
            throw new Error(`Error al cargar stats_torneo.json: ${respuestaStats.statusText}`);
        }
        const statsDelTorneo = await respuestaStats.json();

        if (champions && statsDelTorneo) {
            calcularYMostrarEstadisticas(champions, statsDelTorneo);
        }

    } catch (error) {
        console.error("Hubo un error al cargar los datos JSON:", error);
        // ... manejo de error ...
    }
}

// La función calcularYMostrarEstadisticas sigue igual,
// ya que espera un array de campeones donde cada campeón tiene una propiedad 'region' (que es un string)

iniciarProcesamiento();