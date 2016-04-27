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
        var x = parseInt(inputArray[i]);
        console.log('x= '+x);
        var y = parseInt(inputArray[i+=2]);
        console.log('y= '+y);
        console.log('loop: ',inputArray);
        console.log(inputArray[1]);
        i--;

        if (String(inputArray[i]) == "-") {
            result = x-y;
            inputArray.splice(0,3,result);
            console.log('sub: ' + result);
            console.log('if: '+ i);
            console.log(inputArray);
            console.log(result);
            i=0;
        }

        else if (String(inputArray[i]) == "+") {
            result = x+y;
            inputArray.splice(0,3,result);
            console.log('sum: ' + result);
            console.log('if: '+ i);
            console.log(inputArray);
            console.log(result);
            i=0;
        }

        else if (String(inputArray[i]) == '*') {
            result = x*y;
            inputArray.splice(0,3,result);
            console.log('mult: ' + result);
            console.log('if: '+ i);
            console.log(inputArray);
            console.log(result);
            i=0;
        }

        else if (String(inputArray[i]) == '/') {
            result = x/y;
            inputArray.splice(0,3,result);
            console.log('division: ' + result);
            console.log('if: '+i);
            console.log(inputArray);
            console.log(result);
            i=0;
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
