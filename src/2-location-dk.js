/****************************************************************************
location-DK.js,

****************************************************************************/
(function ($, L, i18next, moment, window/*, document, undefined*/) {
	"use strict";

	window.fcoo = window.fcoo || {};
    var ns = window.fcoo = window.fcoo || {},
        nsHL = ns.Havnelods = ns.Havnelods || {};

    /**********************************************************************
    Location_DK
    Location with danish harbors
    https://www.danskehavnelods.dk/foto/NKTANHOL1.jpg
    https://www.danskehavnelods.dk/planer/jpg_200/NKTANHOL.jpg
    **********************************************************************/
    nsHL.Location_DK = function(/*options, parent*/){
//test this.INDEX = this.INDEX || 0;
        nsHL.Location.apply(this, arguments);
    };

    nsHL.Location_DK.prototype = $.extend(true, {}, nsHL.Location.prototype, {
        setup: {
            colorName   : 'harbor-dk',

            id2OptionsId: {id: 'HAVNE_ID', name: 'NAVN'},
            planIndex   : '',
            pdfUrl      : 'https://www.danskehavnelods.dk/pdf/havnelodsenpdf.dll?WEB=1&TYP=0&ID=<ID>&NR=2',
            photoUrlMask: 'https://www.danskehavnelods.dk/foto/<FILENAME>',
            planUrlMask : 'https://www.danskehavnelods.dk/planer/jpg_200/<FILENAME>'
        },

        /***********************************
        getType
        ***********************************/
        getType: function(){
            var isCommertial = this.options.ERHVERVSHAVN,
                isMarina = this.options.LYSTBAADEHAVN;
            return {
                isCommertial: isCommertial,
                isMarina    : isMarina,
                isBoth      : isCommertial && isMarina,
                isNeither   : !isCommertial && !isMarina
            };
        },

        /*********************************************
        getSVGType
        1: Full square
        2: Inner dot
        3: Small inner dot
        4: Full square and inner dot (= 1 and 2)
        *********************************************/
        getSVGType: function(){
            var type = this.getType();
            if (type.isBoth) return '4';
            if (type.isNeither) return '3';
            if (type.isMarina) return '2';
            return '1';
        }
    });


}(jQuery, L, this.i18next, this.moment, this, document));