'use strict';

angular
    .module('SERequestsServices', ['ngResource','app.caching'])
    .value('apiUrl','https://api.stackexchange.com/2.2')
    .value('baseParams',{site:'stackoverflow',key:'9GnBtV76OfT15R9dYjMF*Q(('})
    .value('pagingParams',{'page':'1','pagesize':'10','order':'desc','sort':'activity'})
    .factory('UserRequests', ['$resource','ApiRequestCache', 'apiUrl', 'baseParams', UserRequests])
    .factory('CurrentUserRequests',['$resource','ApiRequestCache','apiUrl','baseParams',CurrentUserRequests])
    .factory('QuestionRequests',['$resource','ApiRequestCache','apiUrl','baseParams','pagingParams',QuestionRequests])
    .factory('TagRequests',['$resource','ApiRequestCache','apiUrl','baseParams',TagRequests])
    .factory('CurrentUserActions',['$resource','$httpParamSerializerJQLike','apiUrl',CurrentUserActions]);


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
function CurrentUserRequests($resource,ApiRequestCache,apiUrl,baseParams){
    var cache = ApiRequestCache;
    var me = $resource(apiUrl+'/me',baseParams,{
        getUser:{method:'GET',cache:cache},
        getBadges:{method:'GET',url:apiUrl+'/me/badges',cache:cache},
        getFavorites:{method:'GET',url:apiUrl+'/me/favorites',cache:cache},
        getAnswers:{method:'GET',url:apiUrl+'/me/answers',cache:cache},
        upvoteQuestion:{method:'GET',url:apiUrl+'',cache:cache}
    });
    return me;
}

function CurrentUserActions($resource,$httpParamSerializerJQLike,apiUrl){
    var a = $resource(apiUrl+'/',{},{
        questionDownvote:{
            method:'POST',url:apiUrl+'/questions/:questionId/downvote',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},
        questionDownvoteUndo:{
            method:'POST',url:apiUrl+'/questions/:questionId/downvote/undo',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},
        questionUpvote:{
            method:'POST',url:apiUrl+'/questions/:questionId/upvote',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},
        questionUpvoteUndo:{
            method:'POST',url:apiUrl+'/questions/:questionId/upvote/undo',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},
        questionFavorite:{
            method:'POST',url:apiUrl+'/questions/:questionId/favorite', 
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},
        questionFavoriteUndo:{
            method:'POST',url:apiUrl+'/questions/:questionId/favorite/undo',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},

        answerDownvote:{
            method:'POST',url:apiUrl+'/answers/:answerId/downvote',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},
        answerDownvoteUndo:{
            method:'POST',url:apiUrl+'/answers/:answerId/downvote/undo',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},
        answerUpvote:{
            method:'POST',url:apiUrl+'/answers/:answerId/upvote',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}},
        answerUpvoteUndo:{
            method:'POST',url:apiUrl+'/answers/:answerId/upvote/undo',
            params:{questionId:'@questionId'}, 
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function (data, headersGetter) { return $httpParamSerializerJQLike(data);}}
    });
    return a;
}