'use strict';

angular.module('app.utilities',[])
    .factory('Logger',['$log',function($log){ return $log; }])
    .factory('Paginator',Paginator)
    .factory('CloudMaker',CloudMaker);

function Paginator(){
    var service = {
        makePagingOptions : makePagingOptions
    };
    return service;
    
    function makePagingOptions(currentPage,totalPages,mainButtons){
        var lowerLimit = currentPage;
        var upperLimit = currentPage;

        for (var b = 1; b < mainButtons && b < totalPages;) {
            if (lowerLimit > 1 ) { lowerLimit--; b++; }
            if (b < mainButtons && upperLimit < totalPages) { upperLimit++; b++; }
        }

        var pageOptions = [];

        if(currentPage===1) { pageOptions.push({value:'',display:'&laquo;',class:'disabled'});}
        else { pageOptions.push({value:(currentPage-1),display:'&laquo;',class:''});}

        if(lowerLimit > 1){
            pageOptions.push({value:1,display:'1',class:''});
            pageOptions.push({value:'',display:'...',class:'disabled'});
        }

        for (var i = lowerLimit; i <= upperLimit; i++) {
            if (i == currentPage) pageOptions.push({value:i,display:i,class:'active'});
            else pageOptions.push({value:i,display:i,class:''});
        }

        if(upperLimit < totalPages){
            pageOptions.push({value:'',display:'...',class:'disabled'});
            pageOptions.push({value:totalPages,display:totalPages,class:''});
        }

        if(currentPage===totalPages) { pageOptions.push({value:'',display:'&raquo;',class:'disabled'});}
        else { pageOptions.push({value:(currentPage+1),display:'&raquo;',class:''});}
        
        return pageOptions;
    }
}
function CloudMaker(){
    var service = {
        assignCloudWeights:assignCloudWeights
    };
    return service;
    
    function assignCloudWeights(objArray, countProperty, maxWeight){
        var highestCount = 0;
        for(var o = 0; o < objArray.length; o++){
            var count = objArray[o][countProperty] || 0;
            if(count > highestCount) highestCount = count;
        }
        var cloudObjs = [];
        for(var i = 0; i < objArray.length; i++){
            var c = objArray[i][countProperty] || 0;
            var weight = Math.round((c/highestCount)*maxWeight);
            cloudObjs.push({object:objArray[i],weight:weight});
        }
        return cloudObjs;
    }
}