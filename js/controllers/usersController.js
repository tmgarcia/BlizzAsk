'use strict';

angular
    .module('app.users', ['app.dataServices','app.utilities','app.constants'])
    .controller('UserProfile', ['$resource','UserService','Logger','DataFilters',UserProfile])
    .controller('CurrentUserProfile', ['$rootScope','CurrentUserService','Logger','DataFilters',CurrentUserProfile])
    .controller('CurrentUserBadges', ['$rootScope','CurrentUserService','Logger','DataFilters',CurrentUserBadges])
    .controller('CurrentUserFavorites', ['$rootScope','CurrentUserService','Logger','DataFilters',CurrentUserFavorites])
    .controller('CurrentUserAnswers', ['$rootScope','CurrentUserService','Logger','DataFilters',CurrentUserAnswers])
    .controller('Login',['$scope','$rootScope','Logger',Login])
    .controller('Logout',['$rootScope',Logout]);

function UserProfile($resource, UserService,Logger,DataFilters) {
    var vm = this;
    vm.userId = $resource.userId;
    UserService.getUser(vm.userId, DataFilters.UserFullFilter).then(function(data){
        vm.user = data.user;
    });
}

function Login($scope,$rootScope,Logger){
    var vm = this;
    var auth = $rootScope.auth;
    vm.preparingForAuth=true;
    vm.hasError = false;
    auth.prepareForAuth(function(){
        vm.preparingForAuth=false;
        $scope.$apply();
    });
    vm.completedAuth = false;
    vm.successCallback = function(currentUser){
        vm.currentUser = currentUser;
        vm.completedAuth = true;
        Logger.debug('Success callback, completedAuth: '+vm.completedAuth);
        Logger.debug(vm.currentUser);
        $rootScope.$apply();
    };
    vm.errorCallback = function(errorName,errorMessage){
        vm.hasError = true;
        vm.error = {name:errorName,message:errorMessage};
        $scope.$apply();
    };
    vm.authClicked = function(){
        auth.authenticate(vm.successCallback,vm.errorCallback);
    };
}
function Logout($rootScope){
    var vm = this;
    vm.completedLogout=false;
    vm.callback = function(){
        vm.completedLogout=true;
        $rootScope.$apply();
    };
}

function CurrentUserProfile($rootScope,CurrentUserService,Logger,DataFilters){
    var vm = this;
    var auth = $rootScope.auth;
    var accessToken = auth.getAccessToken();
    CurrentUserService.getUser(accessToken,DataFilters.UserFullFilter).then(function(data){
        vm.user = data.user;
    });
}
function CurrentUserBadges($rootScope,CurrentUserService,Logger,DataFilters){
    var vm = this;
    var auth = $rootScope.auth;
    var accessToken = auth.getAccessToken();
    CurrentUserService.getBadges(accessToken,DataFilters.BadgeFullFilter).then(function(data){
        vm.badges = data.badges;
    });
}
function CurrentUserFavorites($rootScope,CurrentUserService,Logger,DataFilters){
    var vm = this;
    var auth = $rootScope.auth;
    var accessToken = auth.getAccessToken();
    CurrentUserService.getFavorites(accessToken,DataFilters.QuestionFavoriteFilter).then(function(data){
        vm.favorites = data.questions;
    });
}
function CurrentUserAnswers($rootScope,CurrentUserService,Logger,DataFilters){
    var vm = this;
    var auth = $rootScope.auth;
    var accessToken = auth.getAccessToken();
    CurrentUserService.getAnswers(accessToken,DataFilters.AnswerPartialFilter).then(function(data){
        vm.answers = data.answers;
    });
}