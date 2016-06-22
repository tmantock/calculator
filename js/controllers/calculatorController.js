app.controller("calculatorController", ["getCurrency",function(getCurrency) {
    var self = this;
    self.basecurrencies = ["Base Currency","USD","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR","EUR"];
    self.selectcurrencies = ["Converted Currency","USD","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR","EUR"];
    self.selectedBase = self.basecurrencies[0];
    self.selectedConvert = self.selectcurrencies[0];
    self.exchangeRate = '';
    self.output = '';
    self.digit = '';
    self.equation = [];

    self.getRate = function (currency) {
      var base = self.selectedBase;
      var convert = self.selectedConvert;
      var exchangeRates = getCurrency.getExchangeRate(base,convert).success(function(data){
        var rates = data.rates;
        for(var key in rates){
          if(convert == key){
            self.exchangeRate = rates[key];
          }
        }
      });
    };

    self.updateDigit = function (number) {
      if(parseInt(self.output) === 0 && number != '.' || self.output == "Ready when you are!"){
        self.output = '';
      }
      self.digit += String(number);
      self.output += String(number);
    };

    self.operand = function (operand) {
      if(self.digit === ''){
        self.equation.push(self.output,String(operand));
        self.output += (' ' + String(operand) + ' ');
        console.log(self.equation);
      }else {
        self.equation.push(self.digit,String(operand));
        self.digit = '';
        self.output += (' ' + String(operand) + ' ');
      }
    };

    self.equate = function () {
      self.equation.push(self.digit);
      self.digit = '';
      var x;
      var y;
      var result;
      if(self.equation[0] === ''){
        result = "Ready when you are!";
      }
      else{
      for(var i = 0; i < self.equation.length; i++){
        x = parseInt(self.equation[0]);
        y = parseInt(self.equation[2]);
        switch(self.equation[1]){
          case '+':
            result = x + y;
            break;
          case '-':
            result = x - y;
            break;
          case '*':
            result = x * y;
            break;
          case '/':
            result = x / y;
            break;
        }
        self.equation.splice(0,3,result);
      }
    }
      self.equation = [];
      self.output = result;
      return result;
    };

    self.calculate = function () {
      var output = self.digit * self.exchangeRate;
      console.log("Rate is"+output);
    };

    self.clearAll = function () {
      self.equation = [];
      self.output = '';
      self.digit = '';
    };

    self.clearEntry = function () {
      self.digit = '';
      self.output = '';
      self.equation.splice(self.equation.length-1,1);
    };
}]);
