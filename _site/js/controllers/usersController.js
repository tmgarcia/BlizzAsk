'use strict';

angular
    .module('app.users', ['app.dataServices','app.utilities','app.constants'])
    .controller('UserProfile', ['$resource','UserService','Logger','DataFilters',UserProfile])
    .controller('UserBadges', UserBadges)
    .controller('Login',['$rootScope',Login]);

function UserProfile($resource, UserService,Logger,DataFilters) {
    var vm = this;
    vm.userId = $resource.userId;
    UserService.getUser(vm.userId, DataFilters.UserFullFilter).then(function(data){
        vm.user = data.user;
    });
}

function UserBadges(){
    var vm = this;
    vm.badges = ["badge 1","badge 2"];
}

function Login($rootScope){
    var vm = this;
    var auth = $rootScope.auth;
    vm.preparingForAuth=true;
    vm.hasError = false;
    auth.prepareForAuth(function(){
        vm.preparingForAuth=false;
    });
    vm.errorCallback = function(errorName,errorMessage){
        vm.hasError = true;
        vm.error = {name:errorName,message:errorMessage};
    };
}
function Logout($rootScope){
    var vm = this;
}