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
var click = null;
var firstNumber = '';
var subsequentNumber = '';

function digit_input_one (element) {
    if (click == null) {
        click = true;
        firstNumber = $(element).html();
        console.log('first number is: ' + firstNumber);
    }


    else if (click==true) {
        subsequentNumber = $(element).html();
        console.log('Subsequent Number is: ' + subsequentNumber);
    }

    firstNumber += subsequentNumber;
    $('.output').html(firstNumber);
    console.log(firstNumber);
}

function operate (element) {
    var operator = $(element).html();
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput,operator);
    console.log(inputArray);
    firstNumber = '';
}

function equate () {
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput);
    console.log(inputArray);
    var result;
    var i;
    firstNumber = '';
    for(i=0; i<inputArray.length; i) {
        console.log(i);
        var x = parseFloat(inputArray[i]);
        console.log('x= '+x);
        var y = parseFloat(inputArray[i+=2]);
        console.log('y= '+y);
        console.log('loop: ',inputArray);
        console.log(inputArray[1]);
        i--;

        if (String(inputArray[i]) == "-") {
            result = x-y;
            inputArray.splice(0,3,result);
            var decimalSub = String(result);
            console.log('sub: ' + result);
            console.log('if: '+ i);
            console.log('Array: ' + inputArray);
            console.log('result: ' + result);
            i=0;

            if (decimalSub.length > 6) {
                var decimalFloatSub = parseFloat(decimalSub);
                var decimalFixedSub = decimalFloatSub.toFixed(6);
                result = decimalFixedSub;
            }
        }

        else if (String(inputArray[i]) == "+") {
            result = x+y;
            inputArray.splice(0,3,result);
            var decimalSum = String(result);
            console.log('sum: ' + result);
            console.log('if: '+ i);
            console.log('Array: ' + inputArray);
            console.log('result: ' + result);
            i=0;

            if (decimalSum.length > 6) {
                var decimalFloatSum = parseFloat(decimalSum);
                var decimalFixedSum = decimalFloatSum.toFixed(6);
                result = decimalFixedSum;
            }
        }

        else if (String(inputArray[i]) == '*') {
            result = x*y;
            inputArray.splice(0,3,result);
            var decimalMult = String(result);
            console.log('mult: ' + result);
            console.log('if: '+ i);
            console.log('Array: ' + inputArray);
            console.log('result: ' + result);
            i=0;

            if (decimalMult.length > 6) {
                var decimalFloatMult = parseFloat(decimalMult);
                var decimalFixedMult = decimalFloatMult.toFixed(6);
                result = decimalFixedMult;
            }
        }

        else if (String(inputArray[i]) == '/') {
            result = x/y;
            inputArray.splice(0,3,result);
            var decimalDiv = String(result);
            console.log('division: ' + result);
            console.log('if: '+i);
            console.log('Array: ' + inputArray);
            console.log('result: ' + result);
            i=0;

            if (decimalDiv.length > 6) {
                var decimalFloatDiv = parseFloat(decimalDiv);
                var decimalFixedDiv = decimalFloatDiv.toFixed(6);
                result = decimalFixedDiv;
            }
        }

    }


    $('.output').html(result);
    console.log('reached end of function');
}

function clearScreen () {
    $('.output').html('');
    firstNumber='';
    inputArray = [];
    console.log('clear');
}
