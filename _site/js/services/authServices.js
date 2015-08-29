'use strict';

angular.module('app.auth',['app.constants'])
    .service('AuthService',['$window','AuthenticationValues',AuthenticationService]);

function AuthenticationService($window,AuthenticationValues){
    this.prepareForAuth = prepareForAuth;
    this.authenticate = authenticate;
    this.logout = logout;
    
    Object.defineProperties(this, { "authenticated": { "get": getIsAuthenticated }});
    Object.defineProperties(this, { "currentUser": {"get": getCurrentUser} });
    Object.defineProperties(this, { "accessToken": {"get": getAccessToken} });

    function authenticate(successCallback,errorCallback){
        SE.authenticate({
            success: function(data){
                var accessToken = data.accessToken;
                var user = data.networkUsers[0];
                var currentUser = {
                    accountId:user.account_id,
                    badgeCount:user.badge_counts,
                    id:user.user_id,
                    reputation:user.reputation
                };
                currUser = currentUser;
                var userStr = angular.toJson(currentUser);
                $window.sessionStorage.setItem('SE_curr_user',userStr);
                successCallback(currentUser);
            },
            error: function(data){
                errorCallback(data.errorName,data.errorMessage);
            },
            scope:['no_expiry','write_access','private_info'],
            networkUsers:true
        });
    }
    function logout(){
        currUser = null;
        aToken = null;
        $window.sessionStorage.removeItem('SE_curr_user');
    }
    function prepareForAuth(callbackFunc){
        if(!getIsInitialized()){
            initializeSE(callbackFunc);
        }
        else{
            callbackFunc();
        }
    }
    
    var currUser;
    var aToken;
    function getCurrentUser(){
        if(!currUser){
            if(getIsAuthenticated()){
                currUser = $window.sessionStorage.getItem('SE_curr_user');
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
    
    function getIsInitialized(){
        var initialized = $window.sessionStorage.getItem('SE_initialized');
        return (typeof(initialized) !== "undefined" && initialized);
    }
    function initializeSE(callbackFunc){
        SE.init({
            clientId: AuthenticationValues.clientId,
            key: AuthenticationValues.key,
            channelUrl: AuthenticationValues.channelUrl,
            complete: function(data){
                $window.sessionStorage.setItem('SE_initialized','true');
                callbackFunc(data);
            }
        });
    }
}

