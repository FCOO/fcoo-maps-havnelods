# fcoo-maps-havnelods


## Description
fcoo-maps MapLayer with harbours and bridges from danskehavnelods.dk and gronlandskehavnelods.dk

## Installation
### bower
`bower install https://github.com/FCOO/fcoo-maps-havnelods.git --save`

## Demo
http://FCOO.github.io/fcoo-maps-havnelods/demo/

## Usage

    window.fcoo.map.createApplication(
        //options
        {
            applicationName: {da:'Overskrift', en:'Header'},
            leftMenu       : {isLayerMenu: true, width: 350},
        },

        //layerMenu
        [ "HAVNELODS-HARBORS-DK",
          "HAVNELODS-BRIDGES-DK",
          "HAVNELODS-HARBORS-GL" ],
    );


<!-- ### options
| Id | Type | Default | Description |
| :--: | :--: | :-----: | --- |
| options1 | boolean | true | If <code>true</code> the ... |
| options2 | string | null | Contain the ... |


### Methods

    .methods1( arg1, arg2,...): Do something
    .methods2( arg1, arg2,...): Do something else

 -->

## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/fcoo-maps-havnelods/LICENSE).

Copyright (c) 2021 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk

