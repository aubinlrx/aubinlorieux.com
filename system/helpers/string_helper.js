'use strict';

var _ = require('lodash');

var stringHelper = {};

stringHelper.ucFirst = function( str ) {

    if( typeof str !== 'string' )
    {
        console.log('arg is not a string');
        return false;
    }

    return str.charAt(0).toUpperCase() + str.substr(1);
}

stringHelper.arrToUcFirst = function( arr ) {

    if( typeof arr !== 'object' )
    {
        console.log('arg is not an array');
        return false;
    }

    return _.map(arr, function( str ) {
        return stringHelper.ucFirst( str );
    });
}

module.exports = stringHelper;