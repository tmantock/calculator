app.factory("getRegions",["$http","$log",function($http,$log){
    return $http.get("https://api.fixer.io/latest").success(function(data){
        return data;
    }).error(function(err){
        console.error(err);
    });
}]);
