'use strict';

angular
    .module('app.questions',['ngRoute','ngSanitize','app.dataServices','app.utilities','app.constants'])
    .controller('QuestionsSearch',['$routeParams', 'QuestionService','Logger','DataFilters','DataSorts','Paginator',QuestionsSearch])
    .controller('QuestionView',['$routeParams', 'QuestionService','Logger','DataFilters',QuestionView]);

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

function QuestionView($routeParams,QuestionService,Logger,DataFilters){
    var vm = this;
    vm.questionId = $routeParams.questionId;
    QuestionService.getQuestion(vm.questionId,DataFilters.QuestionFullFilter_Unautharized).then(function(data){
        vm.question = data.question;
    });
}