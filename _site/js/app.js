'use strict';

angular
    .module('app', ['ngRoute','ngSanitize',
                    'app.filters','app.users','app.questions','app.tags','app.auth'])
    .run(function($rootScope,AuthService) { $rootScope.auth = AuthService;} )
    .controller('MainController', MainController)
    .directive('markdown', markdown)
    .config(Config);

function markdown($sanitize){
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            function renderMarkdown() {
                var htmlText = converter.makeHtml(scope.$eval(attrs.markdown)  || '');
                element.html($sanitize(htmlText));
            }
            scope.$watch(attrs.markdown, function(){
                renderMarkdown();
            });
            renderMarkdown();
        }
    };
}

function MainController($scope){}

function Config($routeProvider, $locationProvider)
{
    $routeProvider.
    when('/users/badges',{
        templateUrl: 'views/users/badges.html',
        controller: 'UserBadges',
        controllerAs: 'vm'
    }).
    when('/users/login',{
        templateUrl: 'views/users/login.html',
        controller: 'Login',
        controllerAs: 'vm'
    }).
    when('/users/logout',{
        templateUrl: 'views/users/logout.html',
        controller: 'Logout',
        controllerAs: 'vm'
    }).
    when('/users/:userId',{
        templateUrl: 'views/users/profile.html',
        controller: 'UserProfile',
        controllerAs: 'vm'
    }).
    when('/questions/search',{
        templateUrl: 'views/questions/searchResults.html',
        controller: 'QuestionsSearch',
        controllerAs: 'vm'
    }).
    when('/questions/:questionId',{
        templateUrl: 'views/questions/question.html',
        controller: 'QuestionView',
        controllerAs: 'vm'
    }).
    when('/tags/search',{
        templateUrl: 'views/home/tagSearchResults.html',
        controller: 'TagsSearch',
        controllerAs: 'vm'
    }).
    when('/tags/:tagName/questions',{
        templateUrl: 'views/home/tagQuestions.html',
        controller: 'TagQuestions',
        controllerAs: 'vm'
    }).
    when('/tags',{
        templateUrl: 'views/home/tags.html',
        controller: 'TagsDisplay',
        controllerAs: 'vm'
    }).
    when('/home',{
        templateUrl: 'views/home/home.html',
        controller: 'MainController',
        controllerAs: 'vm'
    }).
    when('/',{
        templateUrl: 'views/home/home.html',
        controller: 'MainController',
        controllerAs: 'vm'
    }).
    otherwise({
        redirectTo: '/404'
    });
    $locationProvider.html5Mode(true);
}