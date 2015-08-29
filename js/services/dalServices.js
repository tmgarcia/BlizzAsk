'use strict';

var resourceBase = 'https://api.stackexchange.com/2.2';
//var baseParams = {site:'stackoverflow',key:'9GnBtV76OfT15R9dYjMF*Q(('};
var baseParams = {site:'stackoverflow'};

angular
    .module('app.dataLayer', ['SERequestsServices','app.modelConversion','app.utilities','app.constants','app.caching'])
    .factory('UserDAL', ['UserRequests','UserConverter','BadgeConverter', 'Logger',UserDAL])
    .factory('QuestionDAL', ['QuestionRequests','QuestionConverter','Logger','DataFilters',QuestionDAL])
    .factory('TagDAL',['TagRequests','TagConverter','QuestionConverter','Logger','DataFilters',TagDAL])
    .factory('CurrentUserDAL',['CurrentUserRequests','UserConverter','BadgeConverter','QuestionConverter','AnswerConverter','Logger',CurrentUserDAL])
    .factory('CurrentUserActionsDAL',['CurrentUserActions','Logger','DataFilters','baseParams',CurrentUserActionsDAL]);


function UserDAL(UserRequests,UserConverter,BadgeConverter,Logger){
    var service = {
        getUser : getUser,
        getUsers : getUsers
    };
    return service;
    
    function getUser(userId,filter){
        return UserRequests.get({ userId:userId, filter:filter||'default' })
            .$promise
            .then(convertUser)
            .catch(function(error){logError(Logger,error);});
    }
    function getUsers(userIds,filter,page,pageSize,order,sort){
        if (typeof userIds === 'undefined'){
            return UserRequests.queryAll({
                page:page||'1',pageSize:pageSize||'10',
                order:order||'desc',sort:sort||'activity',
                filter:filter||'default'
            })
                .$promise
                .then(convertUsers)
                .catch(function(error){logError(Logger,error);});
        }
        else{
            var vectorizedIds = vectorizeParameter(userIds);
            return UserRequests.get({
                userId:vectorizedIds,
                page:page||'1',pageSize:pageSize||'10',
                order:order||'desc',sort:sort||'activity',
                filter:filter||'default'
            })
                .$promise
                .then(convertUsers)
                .catch(function(error){logError(Logger,error);});
        }
    }
    function getUserBadges(userId,filter){
        return UserRequests.getBadges({
            userId:userId, filter:filter||'default'
        })
            .$promise
            .then(convertUser)
            .catch(function(error){logError(Logger,error);});
    }
    
    function convertUser(data){
        var userObj = data.items[0];
        var user = UserConverter.convertUser(userObj);
        var response = {user:user};
        return response;
    }
    function convertUsers(data){
        var userArrayObj = data.items;
        var users = UserConverter.convertUserArray(userArrayObj);
        var response = {users:users, hasMore:data.has_more||false, total:data.total};
        return response;
    }
    function convertBadges(data){
        var badgeArrayObj = data.items;
        var badges = BadgeConverter.convertBadgeArray(badgeArrayObj);
        var response = {badges:badges};
        return response;
    }
}
function QuestionDAL(QuestionRequests,QuestionConverter,Logger, DataFilters){
    var service = {
        getQuestion : getQuestion,
        getQuestions : getQuestions,
        searchQuestions : searchQuestions
    };
    return service;
    function getQuestion(questionId, filter, accessToken){
        if(accessToken){
            return QuestionRequests.get({questionId:questionId,filter:filter || 'default', access_token:accessToken})
                .$promise
                .then(convertQuestion)
                .catch(function(error){logError(Logger,error);});
        }
        else{
            return QuestionRequests.get({questionId:questionId,filter:filter || 'default'})
                .$promise
                .then(convertQuestion)
                .catch(function(error){logError(Logger,error);});
        }
    }
    function getQuestions(questionIds,filter,page,pageSize,order,sort){
        if (!(questionIds)){
            return QuestionRequests.queryAll({
                page:page||'1',pagesize:pageSize||'10',
                order:order||'desc',sort:sort||'activity',
                filter:filter||'default'
            })
                .$promise
                .then(convertQuestions)
                .catch(function(error){logError(Logger,error);});
        }
        else{
            var vectorizedIds = vectorizeParameter(questionIds);
            return QuestionRequests.get({
                 questionId:vectorizedIds,page:page||'1',pageSize:pageSize||'10',
                 order:order||'desc',sort:sort||'activity',
                 filter:filter||DataFilters.QuestionPartialFilter})
            .$promise
            .then(convertQuestions)
            .catch(function(error){logError(Logger,error);});
        }
    }
    function searchQuestions(query,filter,page,pageSize,order,sort){
        return QuestionRequests.search(
            {intitle:query,page:page||'1',pagesize:pageSize||'10',
             order:order||'desc',sort:sort||'activity',
             filter:filter||DataFilters.QuestionPartialFilter})
        .$promise
        .then(convertQuestions)
        .catch(function(error){logError(Logger,error);});
    }
    
    function convertQuestion(data){
        var questionObj = data.items[0];
        var question = QuestionConverter.convertQuestion(questionObj);
        var response = {question:question};
        return response;
    }
    function convertQuestions(data){
        var questionArrayObj = data.items;
        var questions = QuestionConverter.convertQuestionArray(questionArrayObj);
        var response = {questions:questions, hasMore:data.has_more||false, total:data.total};
        return response;
    }
}
function TagDAL(TagRequests,TagConverter,QuestionConverter,Logger,DataFilters,ApiRequestCache){
    var service = {
        getTopTags : getTopTags,
        getTopQuestionsOfTag : getTopQuestionsOfTag,
        searchTags : searchTags
    };
    return service;
    
    function getTopTags(numTags){
        var pageSize = Math.min(numTags,100);//SE supports page sizes up to 100
        return TagRequests.get({page:1,pageSize:pageSize,filter:DataFilters.TagPartialFilter,sort:'popular'})
            .$promise
            .then(convertTags)
            .catch(function(error){logError(Logger,error);});
    }
    function getTopQuestionsOfTag(tagName,filter,page,pageSize){
        return TagRequests.getQuestions({
            tags:tagName,page:page||'1',pagesize:pageSize||'10',
            filter:filter||DataFilters.QuestionPartialFilter})
            .$promise
            .then(convertQuestions)
            .catch(function(error){logError(Logger,error);});
    }
    function searchTags(query,filter,page,pageSize,order,sort){
        return TagRequests.get({inname:query,page:1,pageSize:pageSize,filter:DataFilters.TagPartialFilter,sort:'popular'})
            .$promise
            .then(convertTags)
            .catch(function(error){logError(Logger,error);});
    }
    
    function convertQuestions(data){
        var questionArrayObj = data.items;
        var questions = QuestionConverter.convertQuestionArray(questionArrayObj);
        var response = {questions:questions, hasMore:data.has_more||false, total:data.total};
        return response;
    }
    function convertTags(data){
        var arrayObj = data.items;
        var tags = TagConverter.convertTagArray(arrayObj);
        var response = {tags:tags, hasMore:data.has_more||false,total:data.total};
        Logger.debug(tags);
        return response;
    }
}
function CurrentUserDAL(CurrentUserRequests,UserConverter,BadgeConverter,QuestionConverter,AnswerConverter,Logger){
    var service = {
        getUser:getUser,
        getBadges:getBadges,
        getFavorites:getFavorites,
        getAnswers:getAnswers
    };
    return service;
    
    function getUser(accessToken, filter){
        return CurrentUserRequests.getUser({access_token:accessToken,filter:filter||'default'})
            .$promise
            .then(convertUser)
            .catch(function(error){logError(Logger,error);});
    }
    function getBadges(accessToken, filter, page, pageSize){
        return CurrentUserRequests.getBadges({access_token:accessToken,filter:filter||'default'})
            .$promise
            .then(convertBadges)
            .catch(function(error){logError(Logger,error);});
    }
    function getFavorites(accessToken, filter, page, pageSize){
        return CurrentUserRequests.getFavorites({access_token:accessToken,filter:filter||'default'})
            .$promise
            .then(convertQuestions)
            .catch(function(error){logError(Logger,error);});
    }
    function getAnswers(accessToken, filter, page, pageSize){
        return CurrentUserRequests.getAnswers({access_token:accessToken,filter:filter||'default'})
            .$promise
            .then(convertAnswers)
            .catch(function(error){logError(Logger,error);});
    }
    
    
    function convertUser(data){
        var userObj = data.items[0];
        var user = UserConverter.convertUser(userObj);
        var response = {user:user};
        return response;
    }
    function convertBadges(data){
        var badgeArrayObj = data.items;
        var badges = BadgeConverter.convertBadgeArray(badgeArrayObj);
        var response = {badges:badges};
        return response;
    }
    function convertQuestions(data){
        var questionArrayObj = data.items;
        var questions = QuestionConverter.convertQuestionArray(questionArrayObj);
        var response = {questions:questions, hasMore:data.has_more||false, total:data.total};
        return response;
    }
    function convertAnswers(data){
        var answerArrayObj = data.items;
        var answers = AnswerConverter.convertAnswerArray(answerArrayObj);
        var response = {answers:answers, hasMore:data.has_more||false, total:data.total};
        return response;
    }
}
function CurrentUserActionsDAL(CurrentUserActions,Logger, DataFilters, baseParams){
    var filter = DataFilters.UserActionFilter;
    var site = baseParams.site;
    var key = baseParams.key;

    var service = {
        questionDownvote:questionDownvote,
        questionDownvoteUndo:questionDownvoteUndo,
        questionUpvote:questionUpvote,
        questionUpvoteUndo:questionUpvoteUndo,
        questionFavorite:questionFavorite,
        questionFavoriteUndo:questionFavoriteUndo,
        
        answerDownvote:answerDownvote,
        answerDownvoteUndo:answerDownvoteUndo,
        answerUpvote:answerUpvote,
        answerUpvoteUndo:answerUpvoteUndo
    };
    return service;
    function questionDownvote(questionId, accessToken){
        return CurrentUserActions.questionDownvote({questionId:questionId,filter:filter,access_token:accessToken,site:site,key:key})
            .$promise
            .then(convertResponseDownvote)
            .catch(convertErrorResponse);
    }
    function questionDownvoteUndo(questionId, accessToken){
        return CurrentUserActions.questionDownvoteUndo({access_token:accessToken,questionId:questionId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseDownvote)
            .catch(convertErrorResponse);
    }
    function questionUpvote(questionId, accessToken){
        return CurrentUserActions.questionUpvote({access_token:accessToken,questionId:questionId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseUpvote)
            .catch(convertErrorResponse);
    }
    function questionUpvoteUndo(questionId, accessToken){
        return CurrentUserActions.questionUpvoteUndo({access_token:accessToken,questionId:questionId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseUpvote)
            .catch(convertErrorResponse);
    }
    function questionFavorite(questionId, accessToken){
        return CurrentUserActions.questionFavorite({access_token:accessToken,questionId:questionId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseFavorite)
            .catch(convertErrorResponse);
    }
    function questionFavoriteUndo(questionId, accessToken){
        return CurrentUserActions.questionFavoriteUndo({access_token:accessToken,questionId:questionId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseFavorite)
            .catch(convertErrorResponse);
    }
    
    function answerDownvote(answerId, accessToken){
        return CurrentUserActions.answerDownvote({access_token:accessToken,answerId:answerId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseDownvote)
            .catch(convertErrorResponse);
    }
    function answerDownvoteUndo(answerId, accessToken){
        return CurrentUserActions.answerDownvoteUndo({access_token:accessToken,answerId:answerId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseDownvote)
            .catch(convertErrorResponse);
    }
    function answerUpvote(answerId, accessToken){
        return CurrentUserActions.answerUpvote({access_token:accessToken,answerId:answerId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseUpvote)
            .catch(convertErrorResponse);
    }
    function answerUpvoteUndo(answerId, accessToken){
        return CurrentUserActions.answerUpvoteUndo({access_token:accessToken,answerId:answerId,filter:filter,site:site,key:key})
            .$promise
            .then(convertResponseUpvote)
            .catch(convertErrorResponse);
    }
    function convertResponseDownvote(data){
        return convertResponse(data,'downvoted');
    }
    function convertResponseUpvote(data){
        return convertResponse(data,'upvoted');
    }
    function convertResponseFavorite(data){
        return convertResponse(data,'favorited');
    }
    function convertResponse(data, property){
        var response = {};
        if(data.data){
            response.errorId = data.data.error_id;
            response.errorMessage = data.data.error_message;
            response.errorName = data.data.error_name;
        }
        else{
            response[property] = data.items[0][property];
            response.score = data.items[0].score;
        }
        return response;
    }
    function convertErrorResponse(data){
        Logger.debug("ERROR");
        Logger.debug(data);
        
        var response = {
            errorId:data.data.error_id,
            errorMessage:data.data.error_message,
            errorName:data.data.error_name
       };
        return response;
    }
}

function vectorizeParameter(parameterArray){
    var vectorized = '';
    for(var i = 0; i < parameterArray.length; i++)
    {
        if(i!==0)
        {
            vectorized += ';';
        }
        vectorized += parameterArray[i];
    }
    return vectorized;
}
function logError(Logger, error){
    Logger.debug('ERROR');
    Logger.debug(error);
}