/****************************************************************************
location-GL.js,

****************************************************************************/
(function ($, L, i18next, moment, window/*, document, undefined*/) {
	"use strict";

	window.fcoo = window.fcoo || {};
    var ns = window.fcoo = window.fcoo || {},
        nsHL = ns.Havnelods = ns.Havnelods || {};

    /**********************************************************************
    Location_GL
    Location with Greenlandic towns, hamlets, and stations

    https://www.gronlandskehavnelods.dk/foto/G100AASA.jpg

    https://www.gronlandskehavnelods.dk/planer/jpg_200/G100AAS1.jpg

    **********************************************************************/
    nsHL.Location_GL = function(/*options, parent*/){
//test this.INDEX = 1;
        nsHL.Location_DK.apply(this, arguments);
    };

    nsHL.Location_GL.prototype = $.extend(true, {}, nsHL.Location_DK.prototype, {
        setup: {
            colorName   : 'harbor-gl',

            pdfUrl      : 'https://www.gronlandskehavnelods.dk/PDF/Report/<ID>?type=0&onlyText=0',
            photoUrlMask: 'https://www.gronlandskehavnelods.dk/foto/<FILENAME>',
            planUrlMask : 'https://www.gronlandskehavnelods.dk/planer/jpg_200/<FILENAME>'
        },

        /***********************************
        getType
        1 (Town)   : Full circle
        2 (Hamlet) : Inner dot
        3 (Station): Small inner dot
        ***********************************/
        getType: function(){
            return this.options.HAVNEKATEGORI;
        },

        /*********************************************
        getSVGType
        1: Full square
        2: Inner dot
        3: Small inner dot
        4: Full square and inner dot (= 1 and 2)
        *********************************************/
        getSVGType: function(){
            return this.getType();
        }
    });


}(jQuery, L, this.i18next, this.moment, this, document));



