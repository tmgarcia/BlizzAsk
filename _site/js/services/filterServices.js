'use strict';

angular.module('app.filters', []).
filter('htmlToPlaintext', function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});