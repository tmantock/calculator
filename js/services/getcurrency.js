app.service("getCurrency", ["$http", "$log", function($http, $log) {
    var self = this;
    self.getExchangeRate = function(base) {
        return $http.get("https://api.fixer.io/latest?base=" + base).success(function(data) {
            return data;
        }).error(function(err) {
            $log.warn(err);
            $log.error("Error: Unable to load currency data from server.")
            return err;
        });
    };
}]);
