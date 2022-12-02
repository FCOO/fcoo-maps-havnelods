/****************************************************************************
    fcoo-maps-havnelods.js,

    (c) 2021, FCOO

    https://github.com/FCOO/fcoo-maps-havnelods
    https://github.com/FCOO

****************************************************************************/
(function ($, L, window/*, document, undefined*/) {
    "use strict";

    //Create namespaces
	window.fcoo = window.fcoo || {};
    var ns = window.fcoo = window.fcoo || {},
        nsMap = ns.map = ns.map || {},
        nsHL = ns.Havnelods = ns.Havnelods || {};


    //Add the color-names to the list of colors for markers and polylines
    L.BsMarker._lbmAddColorName('harbor-dk');
    L.BsMarker._lbmAddColorName('harbor-gl');


    /*
    Names for menus:
        Havne og Broer (Danske Havnelods)
        Harbors and Bridges (only in Danish)
    OR
        Danish Harbors and Bridges (only in Danish)
    OR
        Danish Marinas, Ports, and Bridges (only in Danish)
    OR
        Denmark
            Harbors
                (o) Alle / All
                ( ) Kun Erhvervshavne / Only Commertial Ports
                ( ) Kun Lystbådehavne / Only Marinas
            Bridges

    Sub-layers:
    Lystbådehavne / Marinas
    Erhvervshavne / Commertial Ports
    Broer / Bridges

    Greenland:
        By/Town,
        Bygd/Hamlet
        Station/Station

*/

    //createMapLayer = {MAPLAYER_ID: CREATE_MAPLAYER_AND_MENU_FUNCTION} See fcoo-maps/src/map-layer_00.js for description
    nsMap.createMapLayer = nsMap.createMapLayer || {};

    var mapLayerId_GeoJSON = {
            "HAVNELODS-HARBORS-DK": {
                colorId: 'harbor-dk',
                text   : {da: 'Erhvervs- og Lystbådehavne (DK)', en: 'Commertial Ports and Marinas (DK)'},
                minZoom: 6,
                GeoJSON: L.GeoJSON.Havnelods_DK
            },

            "HAVNELODS-HARBORS-GL": {
                colorId: 'harbor-gl',
                text   : {da: 'Byer, Bygder og Stationer (GL)', en: 'Towns, Hamlets, and Stations (GL)'},
                minZoom: 3,

                GeoJSON: L.GeoJSON.Havnelods_GL
            },

            "HAVNELODS-BRIDGES-DK": {
                icon   : [['brigde-icon-adjust ' + nsHL.Location_Bridges.prototype.getIcon()]],
                text   : {da: 'Broer (DK)', en: 'Bridges (DK)'},
                minZoom: 6,

                GeoJSON: L.GeoJSON.Havnelods_Bridges
            }
        };


//MANGLER    var havnelodsButtonList = [{icon: 'fa-list', text: {da:'Listen', en:'The List'}, onClick: function(){ console.log('The List'); } }];


    /***********************************************************
    MapLayer_Havnelods
    ***********************************************************/
    function MapLayer_Havnelods(options) {
        nsMap.MapLayer.call(this, options);
    }

    MapLayer_Havnelods.prototype = Object.create(nsMap.MapLayer.prototype);
    MapLayer_Havnelods.prototype.createLayer = function(options){
        return new this.options.GeoJSON( null, options );
    };


    /***********************************************************
    Add all versions of MapLayer_Havnelods to createMapLayer
    ***********************************************************/
    $.each(mapLayerId_GeoJSON, function(id, mapLayerOptions){

        mapLayerOptions = $.extend(true, {
            icon    : L.bsMarkerAsIcon(mapLayerOptions.colorId, 'black', false),
            minZoom : 6,
            createMarkerPane: true,

//MANGLER buttonList: havnelodsButtonList,

        }, mapLayerOptions);

        nsMap.createMapLayer[id] = function(options, addMenu, adjustParentMenuOptions){
            var mapLayer = nsMap._addMapLayer(id, MapLayer_Havnelods, mapLayerOptions );
            addMenu( mapLayer.menuItemOptions() );

            adjustParentMenuOptions({icon: {colorName:'harbor-dk', round: false}});
        };
    });


/* Remaining options for bridges
Beliggenhed
HOVEDFARVAND_DDL2 - BELIGGENHED
LATLNG - KORT_NR

Anmærkning (i "blå" fremhævning)
ANMAERKNING_FRA_DATO - ANMAERKNING_TIL_DATO
ANMERKNING

Brotype
REFNAME

Brolængde
LANGDE

Gennemsejlingshøjde - Vertical clearance
GENSEJL_HOJDE

Gennemsejlingsbredde - Horizontal clearance
GENSEJL_BREDDE

Afmærkning
AFMARKNING

Strøm
STROM


Besejling
BESEJLING

Sejlads gennem broen
SEJLADS_GENNEM_BROER

Brovagtens beføjelser
BROVAGTENS_BEFOEJELSER

Åbningstider
AABNINGSTIDER

Kabler
KABLER

Kommunikation
KOMMUNIKATION

Signaler fra bro
SIGNALER_FRA_BRO

Brotabel
BROLYSTABEL BROLYSTABEL_OPDATERET

Generelle bestemmelser
GENERELLE_BESTEMMELSER

Særlige bestemmelser
FRA - TIL
SAERLIGE_BESTEM

Bemærkninger
BEMAERKNINGER


Ejer, drift og vedligeholdelse, etc
EJER               : Eks = "Broen ejes af Odense Kommune",
DRIFT_OG_VEDLIGHOLD: Eks = "Odense Kommune\r\nBy-og Kulturforvaltningen\r\n\r\nDrift og anlæg\r\nOdense Slot, Nørregade 36\r\n5100 Odense C",
BRO_AABNINGER      : Eks = "LINDØ port of ODENSE\r\nKystvejen 100\r\n5330 Munkebo\r\nTlf.: 7228 2010\r\nE-mail: info@lpo.dk / havnekontor@lpo.dk\r\nHjemmeside: www.lpo.dk",

Publikationer
Link til officielle version hos GST

Kilde og opdatering
    (c) Geodatastyrelsen 12345 danskehavnelods.dk
    Sidste opdatering
    Tekst: TEKST_OPDATERET
    Plan 1: Findes
    Plan 2: Findes

*/


/* HAVENLODS FOR DK AND GL
Befolkning (KUN GL)
HAVNEKATEGORI
INDBYGGERANTAL indbygger(e)/Inhabitant(s) (INDBYGGERANTAL_AARSTAL)

Remaining options
    LANDSDEL
    HOVEDFARVAND_DDL2
    FARVANDSAFSNIT_A
    FARVANDSAFSNIT_B
    FARVANDSAFSNIT_C
    KYSTAFSNIT
    ERHVERVSHAVN
    LYSTBAADEHAVN
            HAVNEKATEGORI - KUN GL: 1:By/Town, 2:Bygd/Hamlet 3:Station/Station
    HAVNELODSEN
    KORT_NR
    HAVNEPLANSKORT_NR
    NATIONALITET
            INDBYGGERANTAL - KUN GL
            INDBYGGERANTAL_AARSTAL - KUN GL
    FORBUD_MOD_SEJLADS_MM
    REGLER_FOR_SEJLADS
    SEJLADS_MED_13_M_DYBGANG
    ANVENDELSE_AF_LODS
    ANDRE_BEKENDTGOERELSER
    GODKENDELSESDATO
    IKRAFTTRAEDELSESDATO
    REGLEMENT_KUNDGJORT_I_EFS_NR
    REGLEMENT_I_ARKIV
    BEMAERKNING
    TEKST_OPDATERET
    HAVNEN
    DYBDER
    STORSTE
    VANDSTAND
    STROM
    ISS
    VIND
    TAAGE
    VEJBRO
    TUNNEL
    FARTBEGR
    AFMAERK
    BAAKER
    FYR
    TAAGESIGNAL
    KABLER
    LEDNINGER
    ANKERPL
    ANKRINGSFORBUD
    LODS
    LODSTVANG
    BUGSERING
    REDNINGSSTATION
    RESSOURCER
    HAVNEKONTOR
    TOLDKLARERING
    HAVNEOMRAADE
    SAERLIGE
    ADVARSEL
    SVLIGGEPLADSER
    SVSAERLIGEFORHOLD
    FRA
    TIL
    BESEJLING_CLOB
    DAGENS_LAENGDE
    PIKTOGRAMMER_OPD_DATO
    ANMERKNING
    ANMAERKNING_FRA_DATO
    ANMAERKNING_TIL_DATO
    OFFENTLIG
    UN_CODE
    STEDBESKRIVELSE
    KOMMUNIKATION
    ERHVERV
    FORSYNING
*/

}(jQuery, L, this, document));



