'use strict';

angular.module('app.auth',['app.constants','SERequestsServices'])
    .service('AuthService',['$window','AuthenticationValues','CurrentUserRequests','DataFilters',AuthenticationService]);

function AuthenticationService($window,AuthenticationValues,CurrentUserRequests,DataFilters){
    this.prepareForAuth = prepareForAuth;
    this.authenticate = authenticate;
    this.logout = logout;
    this.getIsAuthenticated = getIsAuthenticated;
    this.getCurrentUser = getCurrentUser;
    this.getAccessToken = getAccessToken;
    
    function authenticate(successCallback,errorCallback){
        SE.authenticate({
            success: function(data){
                var accessToken = data.accessToken;
                aToken = accessToken;
                var user = data.networkUsers[0];
                var currentUser = {
                    accountId:user.account_id,
                    badgeCount:user.badge_counts,
                    id:user.user_id,
                    reputation:user.reputation
                };
                currUser = currentUser;
                var userStr = angular.toJson(currentUser);
                $window.sessionStorage.setItem('SE_access_token',accessToken);
                $window.sessionStorage.setItem('SE_curr_user',userStr);
                successCallback(currentUser);
                CurrentUserRequests.getUser({access_token:accessToken, filter:DataFilters.UserDisplayFilter}).$promise.then(function(data){
                    var u = data.items[0];
                    currentUser.reputation = u.reputation;
                    currentUser.profileImage = u.profile_image;
                    currentUser.name = u.display_name;
                    currentUser.badgeCount = u.badge_counts;
                    currUser = currentUser;
                    var newUserStr = angular.toJson(currentUser);
                    $window.sessionStorage.setItem('SE_curr_user',newUserStr);
                });
            },
            error: function(data){
                errorCallback(data.errorName,data.errorMessage);
            },
            scope:['no_expiry','write_access','private_info'],
            networkUsers:true
        });
    }
    function logout(callback){
        currUser = null;
        aToken = null;
        $window.sessionStorage.removeItem('SE_curr_user');
        $window.sessionStorage.removeItem('SE_access_token');
        callback();
    }
    function prepareForAuth(callbackFunc){
        initializeSE(callbackFunc);
    }
    
    var currUser;
    var aToken;
    function getCurrentUser(){
        if(!currUser){
            if(getIsAuthenticated()){
                currUser = angular.fromJson($window.sessionStorage.getItem('SE_curr_user'));
            }
        }
        return currUser;
    }
    function getIsAuthenticated(){
        var authed = false;
        if(getAccessToken()){
            authed = true;
        }
        return authed;
    }
    function getAccessToken(){
        if(!aToken){
            aToken = $window.sessionStorage.getItem('SE_access_token');
        }
        return aToken;
    }

    function initializeSE(callbackFunc){
        SE.init({
            clientId: AuthenticationValues.clientId,
            key: AuthenticationValues.key,
            channelUrl: AuthenticationValues.channelUrl,
            complete: function(data){
                callbackFunc(data);
            }
        });
    }
}

