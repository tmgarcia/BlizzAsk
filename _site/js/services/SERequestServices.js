'use strict';

angular
    .module('SERequestsServices', ['ngResource','app.caching'])
    .value('apiUrl','https://api.stackexchange.com/2.2')
    .value('baseParams',{site:'stackoverflow','filter':'default'})
    .value('pagingParams',{'page':'1','pagesize':'10','order':'desc','sort':'activity'})
    .factory('UserRequests', ['$resource','ApiRequestCache', 'apiUrl', 'baseParams', UserRequests])
    .factory('QuestionRequests',['$resource','ApiRequestCache','apiUrl','baseParams','pagingParams',QuestionRequests])
    .factory('TagRequests',['$resource','ApiRequestCache','apiUrl','baseParams',TagRequests]);


function UserRequests($resource, ApiRequestCache, apiUrl, baseParams){
    var cache = ApiRequestCache;
    var user = $resource(apiUrl+'/users/:userId',baseParams,{
        get: {method:'GET',cache:cache},
        query: {method:'GET',isArray:false,cache:cache},
        queryAll: {method:'GET',url:apiUrl+'/users',params:{'userId':''},cache:cache},
        getBadges: {method:'GET',url:apiUrl+'/users/:userId/badges',cache:cache}
    });
    return user;
}
function QuestionRequests($resource, ApiRequestCache, apiUrl, baseParams, pagingParams){
    var cache = ApiRequestCache;
    var question = $resource(apiUrl+'/questions/:questionId',baseParams,{
        get: {method:'GET',cache:cache},
        query: {method:'GET',isArray:false,cache:cache},
        queryAll: {method:'GET', url:apiUrl+'/questions', 
                   params:angular.extend(pagingParams,{'questionId':''}),
                   cache:cache},
        search: {method:'GET',url:apiUrl+'/search',
                 params:angular.extend(pagingParams,{'intitle':''}),
                 cache:cache},
    });
    return question;
}
function TagRequests($resource, ApiRequestCache, apiUrl, baseParams){
    var cache = ApiRequestCache;
    var tag = $resource(apiUrl+'/tags',baseParams,{
        get:{method:'GET',cache:cache},
        search:{method:'GET',cache:cache},
        getQuestions:{method:'GET',url:apiUrl+'/tags/:tags/faq',cache:cache}
    });
    return tag;
}