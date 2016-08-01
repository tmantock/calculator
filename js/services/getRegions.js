app.factory("getRegions",["$http","$log",function($http,$log){
    return $http.get("http://api.fixer.io/latest").success(function(data){
        return data;
    }).error(function(err){
        console.error(err);
    });
}]);