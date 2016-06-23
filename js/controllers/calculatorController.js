app.controller("calculatorController", ["getCurrency", function(getCurrency) {
    var self = this;
    self.basecurrencies = ["Base Currency", "USD", "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "ZAR", "EUR"];
    self.selectcurrencies = ["Converted Currency", "EUR", "USD", "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "ZAR"];
    self.imperialArray = ["Imperial Unit", "inches", "feet", "mile", "yard", "pint", "quart", "gallon", "cup", "teaspoon", "tablespoon", "Farenheit"];
    self.metricArray = [{
        unit: "Metric Unit"
    }, {
        unit: "meter",
        inch: 39.3701,
        feet: 3.280841666667,
        yard: 1.0936138888889999077
    }, {
        unit: "liter",
        gallon: 0.264172,
        pint: 2.11338,
        cup: 4.22675,
        teaspoon: 202.884,
        tablespoon: 67.628
    }, {
        unit: "Celcius",
        farenheit: 32
    }];
    self.selectedBase = self.basecurrencies[0];
    self.selectedConvert = self.selectcurrencies[0];
    self.exchangeRate = '';
    self.output = '';
    self.digit = '';
    self.equalClick = false;
    self.equation = [];
    self.displayCurrency = '';
    self.imperial = self.imperialArray[0];
    self.metric = self.metricArray[0].unit;
    self.convertChoice = "Choose a converter";
    self.alternates = false;
    self.metricButton = false;
    self.currencyButton = false;

    self.getRate = function(currency) {
        var base = self.selectedBase;
        var convert = self.selectedConvert;
        var exchangeRates = getCurrency.getExchangeRate(base, convert).success(function(data) {
            var rates = data.rates;
            for (var key in rates) {
                if (convert == key) {
                    self.exchangeRate = rates[key];
                }
            }
        });
        self.displayCurrency = convert;
    };

    self.updateDigit = function(number) {
        if (self.output == '0' && number != '.' || self.output == "Ready when you are!" || self.equalClick === true) {
            self.output = '';
            self.equalClick = false;
        }
        self.digit += String(number);
        self.output += String(number);
    };

    self.operand = function(operand) {
        if (self.digit === '') {
            self.equation.push(self.output, String(operand));
            self.output += (' ' + String(operand) + ' ');
            console.log(self.equation);
        } else {
            self.equation.push(self.digit, String(operand));
            self.digit = '';
            self.output += (' ' + String(operand) + ' ');
        }
        self.equalClick = false;
    };

    self.equate = function() {
        self.equation.push(self.digit);
        self.digit = '';
        var x;
        var y;
        var result;
        if (self.equation[0] === '') {
            result = "Ready when you are!";
        } else {
            for (var i = 0; i < self.equation.length; i++) {
                x = parseFloat(self.equation[0]);
                y = parseFloat(self.equation[2]);
                switch (self.equation[1]) {
                    case '+':
                        result = x + y;
                        break;
                    case '-':
                        result = x - y;
                        break;
                    case '×':
                        result = x * y;
                        break;
                    case '÷':
                        result = x / y;
                        break;
                }
                self.equation.splice(0, 3, result);
            }
        }
        self.equalClick = true;
        self.equation = [];
        self.output = result;
        return result;
    };

    self.calculate = function() {
        self.output = (self.digit * self.exchangeRate).toFixed(2) + ' ' + self.displayCurrency;
        self.digit = '';
        self.equalClick = true;
    };

    self.calculateMetric = function() {
        var metricUnit = self.metric;
        var imperialUnit = self.imperial;
        var digit = self.digit;
        var result;
        for (var i = 0; i < self.metricArray.length; i++) {
            if (metricUnit == self.metricArray[i].unit) {
                for (var index in self.metricArray[i]) {
                    if (imperialUnit == index) {
                        result = digit / self.metricArray[i][index];
                    }
                }
            }
        }
        self.output = result.toFixed(4) + " " + metricUnit;
    };

    self.clearAll = function() {
        self.equation = [];
        self.output = '';
        self.digit = '';
    };

    self.clearEntry = function() {
        self.digit = '';
        self.output = '';
        self.equation.splice(self.equation.length - 1, 1);
    };

    self.expandOptions = function(boolean) {
        self.alternates = true;
        var target;
        if (parseInt(boolean) === 0) {
          self.alternates = false;
            target = $("#selectConverter");
            if (target.height() === 0) {
              $("#currency , #metric").animate({height:'0'},500, function () {
                $("#currency , #metric").css('display','none');
              });
                target.css('display', 'block').animate({
                    height: '10%'
                }, 500);
            } else {
                target.css('display', 'block').animate({
                    height: '0'
                }, 500);
            }
        } else if(self.convertChoice == "Currency Converter"){
          target = $("#currency");
          self.alternates = true;
          if(self.currencyButton === true) {
            self.currencyButton = false;
            self.metricButton = false;
          }
          else {
            self.currencyButton = true;
            self.metricButton = false;
          }
          $("#selectConverter").animate({height: '0'},500, function(){
            if (target.height() === 0) {
                target.css('display', 'block').animate({
                    height: '10%'
                }, 500);
            } else {
                target.css('display', 'block').animate({
                    height: '0'
                }, 500, function () {
                  $("#selectConverter").css('display','none');
                });
            }
          });

        } else if(self.convertChoice == "Metric Converter"){
          target = $("#metric");
          self.alternates = true;
          if(self.metricButton === true) {
            self.metricButton = false;
            self.currencyButton = false;
          }
          else {
            self.metricButton = true;
            self.currencyButton = false;
          }
          $("#selectConverter").animate({height: '0'},500, function () {
            if (target.height() === 0) {
                target.css('display', 'block').animate({
                    height: '10%'
                }, 500);
            } else {
                target.css('display', 'block').animate({
                    height: '0'
                }, 500, function(){
                  $("#selectConverter").css('display','none');
                });
            }
          });
        }
    };
}]);
