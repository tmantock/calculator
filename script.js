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

number = '';
var inputArray = [];
var click = null;
var clicks = null;
var firstNumber = '';
var subsequentNumber = '';
var secondNumber;
var subsequentSecondNumber;
//var canClick = true;

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

function sum () {
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput);
    console.log(inputArray);
    firstNumber = '';
}

function equate () {
    var screenOutput = $('.output').html();
    inputArray.push(screenOutput);
    var numberFirst = parseInt(inputArray[0]);
    var numberSecond = parseInt(inputArray[1]);
    var equation = numberFirst + numberSecond;
    $('.output').html(equation);
    firstNumber = '';
}

function clearScreen () {
    $('.output').html('');
    firstNumber='';
    inputArray = [];
    console.log('clear');
}
