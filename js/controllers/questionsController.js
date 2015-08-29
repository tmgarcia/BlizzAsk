'use strict';

angular
    .module('app.questions',['ngRoute','ngSanitize','app.dataServices','app.utilities','app.constants'])
    .controller('QuestionsSearch',['$routeParams', 'QuestionService','Logger','DataFilters','DataSorts','Paginator',QuestionsSearch])
    .controller('QuestionView',['$rootScope','$routeParams', 'QuestionService','Logger','DataFilters','CurrentUserActionsService',QuestionView])
    .controller('QuestionsTop',['$routeParams','QuestionService', 'Logger','DataFilters','DataSorts','Paginator', QuestionsTop]);

function QuestionsSearch($routeParams,QuestionService,Logger,DataFilters,DataSorts,Paginator){
    var vm = this;
    vm.query = $routeParams.query;
    vm.page = $routeParams.page || 1;
    vm.pageSize = $routeParams.pageSize || 10;
    vm.order = 'desc';
    vm.sort = $routeParams.sort || DataSorts.QuestionSearch.Active;
    vm.sortOptions = [];
    for(var name in DataSorts.QuestionSearch){
        vm.sortOptions.push({key:name,value:DataSorts.QuestionSearch[name]});
    }
    QuestionService.searchQuestions(vm.query, DataFilters.QuestionPartialFilter, 
                                    vm.page, vm.pageSize, vm.order, vm.sort).then(function(data){
        vm.questions = data.questions;
        vm.hasMore = data.hasMore;
        vm.totalQuestions = data.total;
        vm.totalPages = Math.ceil(vm.totalQuestions / vm.pageSize);
        vm.pagingOptions = Paginator.makePagingOptions(vm.page,vm.totalPages,5);
    });
    
    vm.getSortClass = function(sortValue){
        var sortClass = (sortValue === vm.sort)? 'active' : '';
        return sortClass;
    };
}

function QuestionView($rootScope, $routeParams,QuestionService,Logger,DataFilters,CurrentUserActionsService){
    var vm = this;
    vm.questionId = $routeParams.questionId;
    vm.questionDownvoteClick = questionDownvoteClick;
    vm.questionUpvoteClick = questionUpvoteClick;
    vm.questionFavoriteClick = questionFavoriteClick;
    vm.answerDownvoteClick = answerDownvoteClick;
    vm.answerUpvoteClick = answerUpvoteClick;
    
    var accessToken = $rootScope.auth.getAccessToken();
    var filter = ($rootScope.auth.getIsAuthenticated())? DataFilters.QuestionFullFilter_Authenticated : DataFilters.QuestionFullFilter_Unauthenticated;
    QuestionService.getQuestion(vm.questionId,filter,accessToken).then(function(data){
        vm.question = data.question;
    });
    
    function questionDownvoteClick(){
        if(vm.question.currentUser.downvoted){
            CurrentUserActionsService.questionDownvoteUndo(vm.questionId,accessToken).then(function(data){
                handleQuestionUpdate(data,'downvoted');
            });
        }
        else{
            CurrentUserActionsService.questionDownvote(vm.questionId,accessToken).then(function(data){
                handleQuestionUpdate(data,'downvoted');
            });
        }
    }
    function questionUpvoteClick(){
        if(vm.question.currentUser.upvoted){
            CurrentUserActionsService.questionUpvoteUndo(vm.questionId,accessToken).then(function(data){
                handleQuestionUpdate(data,'upvoted');
            });
        }
        else{
            CurrentUserActionsService.questionUpvote(vm.questionId,accessToken).then(function(data){
                handleQuestionUpdate(data,'upvoted');
            });
        }
    }
    function questionFavoriteClick(){
        if(vm.question.currentUser.favorited){
            CurrentUserActionsService.questionFavoriteUndo(vm.questionId,accessToken).then(function(data){
                handleQuestionUpdate(data,'favorited');
            });
        }
        else{
            CurrentUserActionsService.questionFavorite(vm.questionId,accessToken).then(function(data){
                handleQuestionUpdate(data,'favorited');
            });
        }
    }
    
    function answerDownvoteClick(answer){
        if(answer.currentUser.downvoted){
            CurrentUserActionsService.answerDownvoteUndo(answer.id,accessToken).then(function(data){
                handleAnswerUpdate(answer,data,'downvoted');
            });
        }
        else{
            CurrentUserActionsService.answerDownvote(answer.id,accessToken).then(function(data){
                handleAnswerUpdate(answer,data,'downvoted');
            });
        }
    }
    function answerUpvoteClick(answer){
        if(vm.question.currentUser.upvoted){
            CurrentUserActionsService.answerUpvoteUndo(answer.id,accessToken).then(function(data){
                handleAnswerUpdate(answer,data,'upvoted');
            });
        }
        else{
            CurrentUserActionsService.answerUpvote(answer.id,accessToken).then(function(data){
                handleAnswerUpdate(answer,data,'upvoted');
            });
        }
    }
    function handleAnswerUpdate(answer, data, property){
        if(data.errorId){
            $rootScope.errorModal.title = "Error";
            $rootScope.errorModal.body = data.errorMessage;
            $('#errorModal').modal('show');
        }
        else{
            answer.currentUser[property] = data[property];
            answer.stats.score = data.score;
        }
    }
    
    function handleQuestionUpdate(data, property){
        if(data.errorId){
            $rootScope.errorModal.title = "Error";
            $rootScope.errorModal.body = data.errorMessage;
            $('#errorModal').modal('show');
        }
        else{
            vm.question.currentUser[property] = data[property];
            vm.question.stats.score = data.score;
        }
    }
}

function QuestionsTop($routeParams,QuestionService,Logger,DataFilters,DataSorts,Paginator){
    //getQuestions(questionIdArray,filter,page,pageSize,order,sort)
    var vm = this;
    vm.page = $routeParams.page || 1;
    vm.pageSize = $routeParams.pageSize || 10;
    vm.order = 'desc';
    vm.sort = $routeParams.sort || DataSorts.QuestionList.Active;
    vm.sortOptions = [];
    for(var name in DataSorts.QuestionList){
        vm.sortOptions.push({key:name,value:DataSorts.QuestionList[name]});
    }
    QuestionService.getQuestions(null, DataFilters.QuestionPartialFilter, 
                                    vm.page, vm.pageSize, vm.order, vm.sort).then(function(data){
        vm.questions = data.questions;
        vm.hasMore = data.hasMore;
        vm.totalQuestions = data.total;
        vm.totalPages = Math.ceil(vm.totalQuestions / vm.pageSize);
        vm.pagingOptions = Paginator.makePagingOptions(vm.page,vm.totalPages,5);
    });

    vm.getSortClass = function(sortValue){
        var sortClass = (sortValue === vm.sort)? 'active' : '';
        return sortClass;
    };
}