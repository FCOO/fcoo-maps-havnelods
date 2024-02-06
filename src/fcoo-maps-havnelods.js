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
        nsHL = ns.Havnelods = ns.Havnelods || {},
        nsHLOptions = nsHL.options;

    //Add the color-names to the list of colors for markers and polylines
    L.BsMarker._lbmAddColorName('harbor-dk');
    L.BsMarker._lbmAddColorName('harbor-gl');

    //Update options for Havnelods
    nsHLOptions.smallTableWithAllLocations = ns.modernizrDevice.isPhone;
    nsHLOptions.isExtended                 = ns.modernizrDevice.isDesktop || ns.modernizrDevice.isTablet;

    //Icon for filter rest-button = gray filter with cross over
    nsHLOptions.resetFilterIcon = [['fal text-secondary fa-filter', 'fa-times']];

    //getDefaultMap return the default map to be used
    nsHLOptions.getDefaultMap = function(){ return nsMap.mainMap; };


    //When a messag is center-on-map the MapLayer is added to the map
    nsHLOptions.onCenterOnMap = function(location, map/*, elem*/){
        var mapLayer = location.parent.mapLayer;
        mapLayer.addTo(map);

        //Zoom to make location visible
        map.setZoom(Math.max(map.getZoom(), mapLayer.options.minZoom || 0), {animate: false});
    };


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

    var mapLayer_id_options = {
            "HAVNELODS-HARBORS-DK": {
                colorId     : 'harbor-dk',
                text        : {da: 'Erhv.- og Lystbådehavne (DK)', en: 'Ports and Marinas (DK)'},
                minZoom     : 5,
                constructor : nsHL.Havnelods_DK
            },

            "HAVNELODS-HARBORS-GL": {
                colorId     : 'harbor-gl',
                text        : {da: 'Byer, Bygder og Stationer (GL)', en: 'Towns, Hamlets, and Stn. (GL)'},
                minZoom     : 3,
                constructor : nsHL.Havnelods_GL
            },

            "HAVNELODS-BRIDGES-DK": {
                icon        : [['brigde-icon-adjust ' + nsHL.Location_Bridges.prototype.getIcon()]],
                text        : {da: 'Broer (DK)', en: 'Bridges (DK)'},
                minZoom     : 6,
                constructor : nsHL.Havnelods_Bridges
            }
        };

//        var havnelodsButtonList = null; //MANGLER [{icon: 'fa-list', text: {da:'Listen', en:'The List'}, onClick: function(){ console.log('The List'); } }];
        //var havnelodsButtonList = [{icon: 'fa-list', text: {da:'Listen', en:'The List'}, onClick: function(){ console.log('The List'); } }];
    function havnelodsButtonList(mapLayerId){
        return [{
            icon   : 'fa-th-list',
            text   : {da:'Vis alle', en:'Show all'},
            onClick: function(/*id, selected, $button, map, owner*/){
                var locationGroup = nsMap.getMapLayer(mapLayerId).locationGroup;
                locationGroup.asModal.apply(locationGroup, arguments);
            }
         },{
            icon   : 'far fa-link',
            text   : ['abbr:gst', {da: ' version', en:' Version'}],
            onClick: function(){
                var locationList = nsMap.getMapLayer(mapLayerId).locationGroup.list,
                    location     = locationList && locationList.length ? locationList[0] : null,
                    externalUrl  = location.setup.externalUrl;
                externalUrl = externalUrl.split('/');
                externalUrl.splice(-1);
                externalUrl = externalUrl.join('/');

                window.open( externalUrl );
            }
        }];
    }


    /***********************************************************
    MapLayer_Havnelods
    ***********************************************************/
    function MapLayer_Havnelods(options) {
        nsMap.MapLayer.call(this, options);
    }

    MapLayer_Havnelods.prototype = Object.create(nsMap.MapLayer.prototype);
    MapLayer_Havnelods.prototype.createLayer = function(options = {}){
        this.locationGroup = this.locationGroup || new this.options.constructor(options);
        this.locationGroup.mapLayer = this;
        return this.locationGroup.getGeoJSON(options);
    };


    /***********************************************************
    Add all versions of MapLayer_Havnelods to createMapLayer
    ***********************************************************/
    function location_onClickPosition( location ){
        if (location.latLng)
            location.latLng.asModal({header: location.header});
    }

    $.each(mapLayer_id_options, function(id, mapLayerOptions){
        mapLayerOptions = $.extend(true, {
            icon            : L.bsMarkerAsIcon(mapLayerOptions.colorId, 'black', false),
            minZoom         : 6,
            createMarkerPane: true,
            layerOptions    :{
                onClickPosition: location_onClickPosition
            },
            buttonList: havnelodsButtonList(id)
        }, mapLayerOptions);

        nsMap.createMapLayer[id] = function(options, addMenu, adjustParentMenuOptions){
            var mapLayer = nsMap._addMapLayer(id, MapLayer_Havnelods, mapLayerOptions );
            adjustParentMenuOptions({icon: {colorName:'harbor-dk', round: false}});

            addMenu([
                mapLayer.menuItemOptions(),
                {type: 'buttons', buttonPaddingLeft: true, buttonPaddingRight: true, buttonList: havnelodsButtonList(id)}
            ]);

        };
    });

}(jQuery, L, this, document));



