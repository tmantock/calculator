app.controller("calculatorController", ["getCurrency",function(getCurrency) {
    var self = this;
    self.basecurrencies = ["Base Currency","USD","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR","EUR"];
    self.selectcurrencies = ["Converted Currency","EUR","USD","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR"];
    self.selectedBase = self.basecurrencies[0];
    self.selectedConvert = self.selectcurrencies[0];
    self.exchangeRate = '';
    self.output = '';
    self.digit = '';
    self.equalClick = false;
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
      if(parseInt(self.output) === 0 && number != '.' || self.output == "Ready when you are!" || self.equalClick === true){
        self.output = '';
        self.equalClick = false;
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
      self.equalClick = false;
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
          case '×':
            result = x * y;
            break;
          case '÷':
            result = x / y;
            break;
        }
        self.equation.splice(0,3,result);
      }
    }
      self.equalClick = true;
      self.equation = [];
      self.output = result;
      return result;
    };

    self.calculate = function () {
      self.output = (self.digit * self.exchangeRate).toFixed(2);
      self.digit = '';
      self.equalClick = true;
      console.log("Rate is"+output);
    };

    self.clearAll = function () {
      console.log("obj");
      self.equation = [];
      self.output = '';
      self.digit = '';
    };

    self.clearEntry = function () {
      self.digit = '';
      self.output = '';
      self.equation.splice(self.equation.length-1,1);
    };

    self.expandCurrency = function () {
      var target = $("#currency");
      if(target.height() === 0){
        target.animate({height: '10%'},500);
      }
      else {
        target.animate({height: '0'},500);
      }
    };
}]);
