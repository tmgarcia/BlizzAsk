'use strict';

angular.module('app.caching',['angular-cache'])
    .config(function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
    })
    .factory('ApiRequestCache', ['CacheFactory', ApiRequestCache]);

function ApiRequestCache(CacheFactory){
    var apiRequestCache;
    if(!CacheFactory.get('apiRequestCache')){
        apiRequestCache = CacheFactory('apiRequestCache',{
            maxAge: 30 * 60 * 1000, //Expire after 30 minutes
            deleteOnExpire: 'aggressive', //removed on expire
            storageMode: 'localStorage',
            storagePrefix: 'blizzAsk-cache.caches.'
        });
    }
    return CacheFactory.get('apiRequestCache');
}