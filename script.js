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
var inputArrayStorage = [];
var buttonClick = null;
var operatorClick = null;
var equateClick = null;
var decimalClick = null;
var firstNumber = '';
var subsequentNumber = '';

function digit_input_one (value) {
    if (buttonClick == null) {
        var numberRetriever = $(value).children('h3').html();

        if(numberRetriever == '.' && decimalClick == null) {
            subsequentNumber = numberRetriever;
            decimalClick = false;
        }

        else if (numberRetriever != '.') {
        subsequentNumber = numberRetriever;
        }
        console.log('Subsequent Number is: ' + subsequentNumber);
        operatorClick = true;
    }

    firstNumber += subsequentNumber;
    subsequentNumber = '';
    $('.output').html(firstNumber);
    console.log(firstNumber);
    equateClick = true;
}

function operate (value) {
    if (inputArray.length<3 && operatorClick == true) {
        var getOperator = $(value).children('h3');
        var operator = $(getOperator).html();
        var screenOutput = $('.output').html();
        if(inputArray[1] == '+' || inputArray[1] == '*' || inputArray[1] == '/' || inputArray[1] == '-') {
            inputArray.splice(1,1);
            inputArrayStorage.splice(1,1);
        }
        inputArray.push(screenOutput,operator);
        inputArrayStorage.push(screenOutput,operator);
        firstNumber = '';
        subsequentNumber = '';
        decimalClick = null;
        console.log(inputArray);
    }
}

function equate () {
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput);
    inputArrayStorage.push(screenOutput);
    console.log(inputArray);
    var result;
    var i;
    firstNumber = '';
    subsequentNumber = '';
    if (inputArray[1]=='/' && inputArray[2]=='0') {
        result = "Error";
        $('.output').html(result);
    }

    else if (equateClick == null) {
        result = 'Ready!';
    }

    else if (inputArray.length <= 1) {
        result = inputArray[0];
    }

    else if (inputArray <= 2) {
        inputArray.push(inputArray[0]);
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


    }
    $('.output').html(result);
    inputArray = [];
    console.log(inputArrayStorage);
}

//Tip Calc test//
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

//Tip Calc Test//
//**Warning**Calculator can only expand once and cannot hide
function tipCalc (value) {
    // ********** LF Start
    //variable set to retrieve the value of the tip button clicked Cheap/Meh/Wow!
    var tipRetriever = $(value).children('h3');
    //Grab the number on the DOM (output/screen). Would be more effective to grab from global variable for logging in numbers
    var mealCost = $('.output').html();
    //declare a variable to store the result
    var result;
    //declare conditional statement to determine what the tip percentage should be
    //Cheap conditional
    if (tipRetriever == 'Cheap') {
        //previously declared variable equated to the meal times percentage of a "cheap" tip
        result = 0.05*mealCost;
    }
    //Average conditional
    else if (tipRetriever == 'Meh') {
        //previously declared variable equated to the meal times percentage of an "average" tip
        result = 0.08*mealCost;
    }
    //Generous conditional
    else if (tipRetriever == 'Wow!') {
        //previously declared variable equated to the meal times percentage of a "generous" tip
        result = 0.15*mealCost;
    }
    //declared variable to have the decimal places fixed to 2 for monetary reasons
    var tip = result.toFixed(2);
    //Display the tip amount with a dollar sign to the DOM (screen)
    $('.output').html('$' + tip);

    // *********** LF End
}

function clearScreen () {
    $('.output').html('');
    inputArray = [];
    inputArrayStorage = [];
    buttonClick = null;
    operatorClick = null;
    equateClick = null;
    decimalClick = null;
    firstNumber = '';
    console.log('clear');
}

//if (decimalDiv.length > 6) {
//    var decimalFloatDiv = parseFloat(decimalDiv);
//    var decimalFixedDiv = decimalFloatDiv.toFixed(6);
//    result = decimalFixedDiv;
//}