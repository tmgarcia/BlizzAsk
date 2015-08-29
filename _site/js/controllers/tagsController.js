'use strict';

angular.module('app.tags',['app.dataServices','app.utilities','app.constants'])
    .controller('TagsDisplay',['TagService','CloudMaker',TagsDisplay])
    .controller('TagsSearch',['$routeParams','TagService','Logger','DataFilters','DataSorts','Paginator',TagsSearch])
    .controller('TagQuestions',['$routeParams','TagService','Logger','DataFilters','Paginator',TagQuestions]);

function TagsDisplay(TagService,CloudMaker){
    var vm = this;
    TagService.getTopTags(50).then(function(data){
        var tagArray = data.tags;
        vm.tags = CloudMaker.assignCloudWeights(tagArray,'count',12);
    });
}

function TagsSearch($routeParams,TagService,Logger,DataFilters,DataSorts,Paginator){
    var vm = this;
    vm.query = $routeParams.query;
    vm.page = $routeParams.page || 1;
    vm.pageSize = $routeParams.pageSize || 10;
    vm.order = 'desc';
    vm.sort = $routeParams.sort || DataSorts.TagSearch.Popular;
    vm.sortOptions = [];
    for(var name in DataSorts.TagSearch){
        vm.sortOptions.push({key:name,value:DataSorts.TagSearch[name]});
    }
    TagService.searchTags(vm.query, DataFilters.TagPartialFilter, 
                                    vm.page, vm.pageSize, vm.order, vm.sort).then(function(data){
        vm.tags = data.tags;
        vm.hasMore = data.hasMore;
        vm.totalTags = data.total;
        vm.totalPages = Math.ceil(vm.totalTags / vm.pageSize);
        vm.pagingOptions = Paginator.makePagingOptions(vm.page,vm.totalPages,5);
    });

    vm.getSortClass = function(sortValue){
        var sortClass = (sortValue === vm.sort)? 'active' : '';
        return sortClass;
    };
}

function TagQuestions($routeParams,TagService,Logger,DataFilters,Paginator){
    var vm = this;
    vm.tagName = $routeParams.tagName;
    vm.page = $routeParams.page || 1;
    vm.pageSize = $routeParams.pageSize || 10;
    TagService.getTopQuestionsOfTag(vm.tagName,DataFilters.QuestionPartialFilter,
                                    vm.page,vm.pageSize).then(function(data){
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