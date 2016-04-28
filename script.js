/**
 * Created by Mantock on 4/25/16.
 */
$(document).ready(function () {
    $('.button').click(function () {
        $(this).addClass('circle');
        setTimeout(function () {
            $('.button').removeClass('circle');
        },200);
    });

    $('.clear').click(function () {
        $(this).addClass('darkOrange');
        setTimeout(function () {
            $('.clear').removeClass('darkOrange');
        },200);
    });

    $('.operator').click(function () {
        $(this).addClass('whitePress');
        setTimeout(function () {
            $('.operator').removeClass('whitePress');
        },200);
    });

});

var inputArray = [];
var buttonClick = null;
var firstNumber = '';
var subsequentNumber = '';

function digit_input_one (value) {
    if (buttonClick == null) {
        var numberRetriever = $(value).children('h3');
        subsequentNumber = numberRetriever.html();
        console.log('Subsequent Number is: ' + subsequentNumber);
    }

    firstNumber += subsequentNumber;
    $('.output').html(firstNumber);
    console.log(firstNumber);
}

function operate (value) {
    if (inputArray.length<3) {
    var getOperator = $(value).children('h3');
    var operator = $(getOperator).html();
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput,operator);
    console.log(inputArray);
    firstNumber = '';
    subsequentNumber = '';
    }
}

function equate () {
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput);
    console.log(inputArray);
    var result;
    var i;
    firstNumber = '';
    subsequentNumber = '';
    if (inputArray[1]=='/' && inputArray[2]=='0') {
        result = "Error";
        $('.output').html(result);
    }
    else {

        for (i = 0; i < inputArray.length;) {
            console.log(i);
            var x = parseFloat(inputArray[i]);
            console.log('x= ' + x);
            var y = parseFloat(inputArray[i += 2]);
            console.log('y= ' + y);
            console.log('loop: ', inputArray);
            console.log(inputArray[1]);
            i--;

            switch (String(inputArray[i])) {
                case '+':
                    result = x + y;
                    inputArray.splice(0, 3, result);
                    //var decimalSum = String(result);
                    console.log('sum: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '-':
                    result = x - y;
                    inputArray.splice(0, 3, result);
                    //var decimalSub = String(result);
                    console.log('sub: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '*':
                    result = x * y;
                    inputArray.splice(0, 3, result);
                    //var decimalMult = String(result);
                    console.log('mult: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;

                case '/':
                    result = x / y;
                    inputArray.splice(0, 3, result);
                    //var decimalDiv = String(result);
                    console.log('division: ' + result);
                    console.log('Array: ' + inputArray);
                    i = 0;
                    break;
            }

        }

        $('.output').html(result);
        inputArray = [];
    }
}

function tipCalculator () {
    $('.calculatorContainer').css('width','45vw');
    $('.numericalContainer').removeClass('col-sm-9').addClass('col-sm-8');
    $('.operatorContainer').removeClass('col-sm-3').addClass('col-sm-2');
    var newColumn = $('<div>').addClass('tipColumn col-sm-2').css('height','100%');
    var cheapDiv = $('<div>').addClass('col-sm-12 cheapTip').css('height','33%').attr('onclick','tipCalc()');
    var normalDiv = $('<div>').addClass('col-sm-12 regularTip').css('height','33%').attr('onclick','tipCalc()');
    var generousDiv = $('<div>').addClass('col-sm-12 generousTip').css('height','33%').attr('onclick','tipCalc()');
    var cheapText = $('<h3>').text('Cheap');
    var normalText = $('<h3>').text('Meh');
    var generousText = $('<h3>').text('Wow!');
    $(cheapDiv).append(cheapText);
    $(normalDiv).append(normalText);
    $(generousDiv).append(generousText);
    $(newColumn).append(cheapDiv, normalDiv, generousDiv);
    $('.calcBody').append(newColumn);
}

//function hideCalc () {
//    $('.calculatorContainer').css('width','30vw');
//    $('.numericalContainer').removeClass('col-sm-8').addClass('col-sm-9');
//    $('.operatorContainer').removeClass('col-sm-2').addClass('col-sm-3');
//    $('.newColumn').remove();
//    $('.expansion').prop('onclick',null).off('click').attr('click',"tipCalculator()");
//}

function tipCalc (value) {
    var tipRetriever = $(value).children('h3');
    var mealCost = $('.output').html();
    var result;
    if (tipRetriever == 'Cheap') {
        result = 0.05*mealCost;
    }
    else if (tipRetriever=='Meh') {
        result = 0.08*mealCost;
    }
    else if (tipRetriever) {
        result = 0.15*mealCost;
    }
    var tip = result.toFixed(2);
    $('.output').html('$' + tip);
}

function clearScreen () {
    $('.output').html('');
    firstNumber='';
    subsequentNumber = '';
    inputArray = [];
    console.log('clear');
}

//if (decimalDiv.length > 6) {
//    var decimalFloatDiv = parseFloat(decimalDiv);
//    var decimalFixedDiv = decimalFloatDiv.toFixed(6);
//    result = decimalFixedDiv;
//}