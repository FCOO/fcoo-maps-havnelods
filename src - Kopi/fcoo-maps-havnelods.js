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
                text   : {da: 'Erhv.- og Lystbådehavne (DK)', en: 'Ports and Marinas (DK)'},
                minZoom: 6,
                GeoJSON: L.GeoJSON.Havnelods_DK
            },

            "HAVNELODS-HARBORS-GL": {
                colorId: 'harbor-gl',
                text   : {da: 'Byer, Bygder og Stationer (GL)', en: 'Towns, Hamlets, and Stn. (GL)'},
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



}(jQuery, L, this, document));



