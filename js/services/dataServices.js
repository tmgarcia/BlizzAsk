'use strict';

angular
    .module('app.dataServices', ['app.dataLayer'])
    .factory('UserService', ['UserDAL',UserService])
    .factory('CurrentUserService',['CurrentUserDAL',CurrentUserService])
    .factory('QuestionService',['QuestionDAL',QuestionService])
    .factory('TagService',['TagDAL',TagService])
    .factory('CurrentUserActionsService',['CurrentUserActionsDAL',CurrentUserActionsService]);
             
             
function UserService(UserDAL){
    var service = {
        getUser:getUser,
        getUsers:getUsers
    };
    return service;
    
    function getUser(userId){
        return UserDAL.getUser(userId);
    }
    function getUsers(userIdArray){
        return UserDAL.getUsers(userIdArray);
    }
}
function CurrentUserService(CurrentUserDAL){
    var service = {
        getUser:getUser,
        getBadges:getBadges,
        getFavorites:getFavorites,
        getAnswers:getAnswers
    };
    return service;
    
    function getUser(accessToken, filter){
        return CurrentUserDAL.getUser(accessToken,filter);
    }
    function getBadges(accessToken, filter, page, pageSize){
        return CurrentUserDAL.getBadges(accessToken, filter, page, pageSize);
    }
    function getFavorites(accessToken, filter, page, pageSize){
        return CurrentUserDAL.getFavorites(accessToken, filter, page, pageSize);
    }
    function getAnswers(accessToken, filter, page, pageSize){
        return CurrentUserDAL.getAnswers(accessToken, filter, page, pageSize);
    }
}
function CurrentUserActionsService(CurrentUserActionsDAL){
    var service={
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
        return CurrentUserActionsDAL.questionDownvote(questionId,accessToken);
    }
    function questionDownvoteUndo(questionId, accessToken){
        return CurrentUserActionsDAL.questionDownvoteUndo(questionId,accessToken);
    }
    function questionUpvote(questionId, accessToken){
        return CurrentUserActionsDAL.questionUpvote(questionId,accessToken);
    }
    function questionUpvoteUndo(questionId, accessToken){
        return CurrentUserActionsDAL.questionUpvoteUndo(questionId,accessToken);
    }
    function questionFavorite(questionId, accessToken){
        return CurrentUserActionsDAL.questionFavorite(questionId,accessToken);
    }
    function questionFavoriteUndo(questionId, accessToken){
        return CurrentUserActionsDAL.questionFavoriteUndo(questionId,accessToken);
    }

    function answerDownvote(answerId, accessToken){
        return CurrentUserActionsDAL.answerDownvote(answerId,accessToken);
    }
    function answerDownvoteUndo(answerId, accessToken){
        return CurrentUserActionsDAL.answerDownvoteUndo(answerId,accessToken);
    }
    function answerUpvote(answerId, accessToken){
        return CurrentUserActionsDAL.answerUpvote(answerId,accessToken);
    }
    function answerUpvoteUndo(answerId, accessToken){
        return CurrentUserActionsDAL.answerUpvoteUndo(answerId,accessToken);
    }
}
function QuestionService(QuestionDAL){
    var service = {
        getQuestion:getQuestion,
        getQuestions:getQuestions,
        searchQuestions:searchQuestions
    };
    return service;
    
    function getQuestion(questionId, filter, accessToken){
        return QuestionDAL.getQuestion(questionId,filter, accessToken);
    }
    function getQuestions(questionIdArray,filter,page,pageSize,order,sort){
        return QuestionDAL.getQuestions(questionIdArray,filter,page,pageSize,order,sort);
    }
    function searchQuestions(query,filter,page,pageSize,order,sort){
        return QuestionDAL.searchQuestions(query,filter,page,pageSize,order,sort);
    }
}
function TagService(TagDAL){
    var service = {
        getTopTags : getTopTags,
        getTopQuestionsOfTag : getTopQuestionsOfTag,
        searchTags : searchTags
    };
    return service;
    
    function getTopTags(numTags){
        return TagDAL.getTopTags(numTags);
    }
    function getTopQuestionsOfTag(tagName,filter,page,pageSize){
        return TagDAL.getTopQuestionsOfTag(tagName,filter,page,pageSize);
    }
    function searchTags(query,filter,page,pageSize,order,sort){
        return TagDAL.searchTags(query,filter,page,pageSize,order,sort);
    }
}