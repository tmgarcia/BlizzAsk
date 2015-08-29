'use strict';

angular.module('app.filters', [])
.filter('htmlToPlaintext', function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
})
.filter('dateToDuration', ['$log',function($log){
    return function(date){
        return date ? jQuery.timeago(date) : '';
    };
}])
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);