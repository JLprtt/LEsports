const REGIONS = {
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

const FACTIONS = {
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
  
const CHAMPIONS = [
    {

        name: 'Aatrox',
        region: REGIONS.RUNETERRA,
        related: [REGIONS.SHURIMA, REGIONS.VOID],
        faction: [FACTIONS.DARKIN],
        specie: SPECIES.DARKIN,
        icon: "http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Aatrox.png"

    },
    {

        name: 'Ahri',
        region: REGIONS.IONIA,
        related: [],
        faction: [FACTIONS.VASTAYA],
        specie: SPECIES.VESANI,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Ahri.png'

    },
    {

        name: 'Akali',
        region: REGIONS.IONIA,
        related: [REGIONS.NOXUS],
        faction: [FACTIONS.KINKOU_ORDER],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Akshan',
        region: [REGIONS.SHURIMA],
        related: [REGIONS.SHADOW_ISLES],
        faction: [FACTIONS.SENTINELS_OF_LIGHT],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akshan.png'
        
    },
    {

        name: 'Alistar',
        region: REGIONS.RUNETERRA,
        related: [REGIONS.NOXUS, REGIONS.ZAUN],
        faction: [FACTIONS.MINOTAURS, FACTIONS.RECKONERS],
        specie: SPECIES.MINOTAUR,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akshan.png'
        
    },
    {

        name: 'Nunu',
        region: REGIONS.FRELJORD,
        related: [],
        faction: [FACTIONS.FROSTGUARD],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akshan.png'
        
    },
    {

        name: 'Rumble',
        region: REGIONS.BANDLE_CITY,
        related: [],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.YORDLE,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akshan.png'
        
    },
    {

        name: 'Vladimir',
        region: REGIONS.NOXUS,
        related: [REGIONS.CAMAVOR, REGIONS.NOXUS, REGIONS.BLESSED_ISLES, REGIONS.DEMACIA],
        faction: [FACTIONS.CRIMSON_CIRCLE, FACTIONS.BLACK_ROSE, FACTIONS.VOL_KALAH_HEIGAARI],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Vladimir.png'
        
    },
    {

        name: 'Twisted Fate',
        region: REGIONS.BILGEWATER,
        related: [],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Corki',
        region: REGIONS.BANDLE_CITY,
        related: [REGIONS.PILTOVER, REGIONS.ZAUN, REGIONS.BILGEWATER],
        faction: [FACTIONS.YIPSNAKES],
        specie: SPECIES.YORDLE,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Jarvan IV',
        region: REGIONS.DEMACIA,
        related: [REGIONS.NOXUS],
        faction: [FACTIONS.HOUSE_LIGHTSHIELD, FACTIONS.HOUSE_SPIRITMIGHT],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Vayne',
        region: REGIONS.DEMACIA,
        related: [REGIONS.FRELJORD, REGIONS.SHADOW_ISLES],
        faction: [FACTIONS.HOUSE_VAYNE, FACTIONS.SENTINELS_OF_LIGHT],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Janna',
        region: REGIONS.ZAUN,
        related: [REGIONS.SHURIMA],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.SPIRIT_GOD,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Ashe',
        region: REGIONS.FRELJORD,
        related: [],
        faction: [FACTIONS.AVAROSAN],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Nidalee',
        region: REGIONS.IXTAL,
        related: [REGIONS.SHURIMA],
        faction: [FACTIONS.VASTAYA, FACTIONS.PAKAA_TRIBE],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Sona',
        region: REGIONS.DEMACIA,
        related: [REGIONS.IONIA],
        faction: [FACTIONS.HOUSE_BUVELLE],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Amumu',
        region: REGIONS.SHURIMA,
        related: [],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.YORDLE,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Malzahar',
        region: REGIONS.VOID,
        related: [REGIONS.SHURIMA],
        faction: [FACTIONS.THE_CULT_OF_THE_VOID],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Warwick',
        region: REGIONS.ZAUN,
        related: [REGIONS.PILTOVER],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Anivia',
        region: REGIONS.FRELJORD,
        related: [],
        faction: [FACTIONS.AVAROSAN],
        specie: SPECIES.SPIRIT_GOD,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Taric',
        region: REGIONS.TARGON,
        related: [REGIONS.DEMACIA],
        faction: [FACTIONS.DAUNTLESS_VANGUARD],
        specie: SPECIES.ASPECTS,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Annie',
        region: REGIONS.RUNETERRA,
        related: [REGIONS.NOXUS],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Karthus',
        region: REGIONS.SHADOW_ISLES,
        related: [REGIONS.NOXUS],
        faction: [],
        specie: SPECIES.UNDEAD,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Brand',
        region: REGIONS.RUNETERRA,
        related: [REGIONS.FRELJORD],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Miss Fortune',
        region: REGIONS.BILGEWATER,
        related: [REGIONS.SHADOW_ISLES],
        faction: [FACTIONS.SYRENS],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Soraka',
        region: REGIONS.TARGON,
        related: [REGIONS.IONIA],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.CELESTIAL,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Gragas',
        region: REGIONS.FRELJORD,
        related: [],
        faction: [FACTIONS.AVAROSAN],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: "Cho'Gath",
        region: REGIONS.VOID,
        related: [],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.VOIDBORN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Garen',
        region: REGIONS.DEMACIA,
        related: [REGIONS.NOXUS],
        faction: [FACTIONS.DAUNTLESS_VANGUARD, FACTIONS.HOUSE_CROWNGUARD],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Nocturne',
        region: REGIONS.RUNETERRA,
        related: [REGIONS.DEMACIA],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.DEMON,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Irelia',
        region: REGIONS.IONIA,
        related: [REGIONS.NOXUS, REGIONS.SHADOW_ISLES],
        faction: [FACTIONS.XAN_HOUSE, FACTIONS.SENTINELS_OF_LIGHT],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Zilean',
        region: REGIONS.RUNETERRA,
        related: [REGIONS.SHURIMA, REGIONS.ICATHIA],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Singed',
        region: REGIONS.ZAUN,
        related: [REGIONS.PILTOVER, REGIONS.NOXUS],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Swain',
        region: REGIONS.NOXUS,
        related: [REGIONS.IONIA, REGIONS.DEMACIA],
        faction: [FACTIONS.TRIFARIX, FACTIONS.HOUSE_SWAIN],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Caitlyn',
        region: REGIONS.PILTOVER,
        related: [REGIONS.ZAUN, REGIONS.NOXUS, REGIONS.IONIA],
        faction: [FACTIONS.PILTOVER_POLICE_DEPARTMENT, FACTIONS.CLAN_KIRAMMAN],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Tristana',
        region: REGIONS.BANDLE_CITY,
        related: [REGIONS.BILGEWATER],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.YORDLE,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Trundle',
        region: REGIONS.FRELJORD,
        related: [REGIONS.NOXUS],
        faction: [FACTIONS.FROST_TROLLS, FACTIONS.FROSTGUARD],
        specie: SPECIES.TROLL,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Mordekaiser',
        region: REGIONS.NOXUS,
        related: [],
        faction: [FACTIONS.IRON_REVENANT],
        specie: SPECIES.REVENANT,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Lee Sin',
        region: REGIONS.IONIA,
        related: [],
        faction: [FACTIONS.SHOJIN_ORDER],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Teemo',
        region: REGIONS.RUNETERRA,
        related: [REGIONS.BILGEWATER],
        faction: [FACTIONS.BANDLE_SCOUTS],
        specie: SPECIES.YORDLE,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Gangplank',
        region: REGIONS.BILGEWATER,
        related: [REGIONS.NOXUS, REGIONS.IONIA],
        faction: [FACTIONS.JAGGED_HOOKS],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Sion',
        region: REGIONS.NOXUS,
        related: [REGIONS.DEMACIA, REGIONS.IONIA],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.UNDEAD,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Blitzcrank',
        region: REGIONS.ZAUN,
        related: [REGIONS.PILTOVER],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.GOLEM,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: "Dr. Mundo",
        region: REGIONS.ZAUN,
        related: [],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Kassadin',
        region: REGIONS.VOID,
        related: [REGIONS.SHURIMA, REGIONS.ICATHIA, REGIONS.ZAUN, REGIONS.IONIA],
        faction: [FACTIONS.THE_PRESERVERS_OF_VALORAN],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Lux',
        region: REGIONS.DEMACIA,
        related: [],
        faction: [FACTIONS.HOUSE_CROWNGUARD, FACTIONS.ILLUMINATORS],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Poppy',
        region: REGIONS.DEMACIA,
        related: [REGIONS.BANDLE_CITY],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.YORDLE,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Rammus',
        region: REGIONS.SHURIMA,
        related: [],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.UNKNOWN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
    {

        name: 'Urgot',
        region: REGIONS.ZAUN,
        related: [REGIONS.NOXUS],
        faction: [FACTIONS.UNAFFILIATED],
        specie: SPECIES.HUMAN,
        icon: 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/Akali.png'
        
    },
]