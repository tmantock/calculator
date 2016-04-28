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

function digit_input_one (value) {
    if (click == null) {
        click = true;
        var getChild = $(value).children('h3');
        firstNumber = getChild.html();
        console.log('first number is: ' + firstNumber);
    }


    else {
        var getChildSub = $(value).children('h3');
        subsequentNumber = getChildSub.html();
        console.log('Subsequent Number is: ' + subsequentNumber);
    }

    firstNumber += subsequentNumber;
    $('.output').html(firstNumber);
    console.log(firstNumber);
}

function operate (value) {
    var getOperator = $(value).children('h3');
    var operator = $(getOperator).html();
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput,operator);
    console.log(inputArray);
    firstNumber = '';
    subsequentNumber = '';
    click = null;
}

function equate () {
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput);
    console.log(inputArray);
    var result;
    var i;
    firstNumber = '';
    subsequentNumber = '';
    click = null;
    for(i=0; i<inputArray.length;) {
        console.log(i);
        var x = parseFloat(inputArray[i]);
        console.log('x= '+x);
        var y = parseFloat(inputArray[i+=2]);
        console.log('y= '+y);
        console.log('loop: ',inputArray);
        console.log(inputArray[1]);
        i--;

        switch (String(inputArray[i])) {
            case '+':
                result = x+y;
                inputArray.splice(0,3,result);
                var decimalSum = String(result);
                console.log('sum: ' + result);
                console.log('Array: ' + inputArray);
                i=0;
                break;

            case '-':
                result = x-y;
                inputArray.splice(0,3,result);
                //var decimalSub = String(result);
                console.log('sub: ' + result);
                console.log('Array: ' + inputArray);
                i=0;
                break;

            case '*':
                result = x*y;
                inputArray.splice(0,3,result);
                //var decimalMult = String(result);
                console.log('mult: ' + result);
                console.log('Array: ' + inputArray);
                i=0;
                break;

            case '/':
                result = x/y;
                inputArray.splice(0,3,result);
                //var decimalDiv = String(result);
                console.log('division: ' + result);
                console.log('Array: ' + inputArray);
                i=0;
                break;
        }

    }
    
    $('.output').html(result);
    inputArray = [];
}

function clearScreen () {
    $('.output').html('');
    firstNumber='';
    subsequentNumber = '';
    click = null;
    inputArray = [];
    console.log('clear');
}

//if (decimalDiv.length > 6) {
//    var decimalFloatDiv = parseFloat(decimalDiv);
//    var decimalFixedDiv = decimalFloatDiv.toFixed(6);
//    result = decimalFixedDiv;
//}