'use strict';

var _ = require('lodash');

var dateHelper = {};

dateHelper.date_to_dmy = function( date ) {

    if( typeof date !== 'object' )
    {
        return '';
    }

    var date = new Date(date);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getYear();

}

module.exports = dateHelper;