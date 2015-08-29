'use strict';

angular
    .module('app.dataServices', ['app.dataLayer'])
    .factory('UserService', ['UserDal',UserService])
    .factory('QuestionService',['QuestionDAL',QuestionService])
    .factory('TagService',['TagDAL',TagService]);
             
             
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
function QuestionService(QuestionDAL){
    var service = {
        getQuestion:getQuestion,
        getQuestions:getQuestions,
        searchQuestions:searchQuestions
    };
    return service;
    
    function getQuestion(questionId, filter){
        return QuestionDAL.getQuestion(questionId,filter);
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