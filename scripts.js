// all numbers, operators and the decimal point are "main-buttons", all other buttons have ids
// text of operator buttons have spaces on ends, i.e " + " instead of "+" for design
// max length for calculator display is 16em

// store current operation/previous operation as strings
var currentOperation  = "",
    previousOperation = "";

// store answer in string, calculator sub display shows answer
var answer = "";

// on main button click, add text of button to main display
$(".main-buttons").on("click", function(){
	var text = $(this).text();
	// if max length is exceeded, dont add any more characters
	if(currentOperation.length+1 > 16){
		return; //do nothing
	}
	// if input is operator, and last input was operator (2 in a row), dont add to operation
	if((currentOperation[currentOperation.length-2] == "x" || 
	    currentOperation[currentOperation.length-2] == "÷" || 
		currentOperation[currentOperation.length-2] == "+" || 
		currentOperation[currentOperation.length-2] == "-") &&
		(text == " x " || text == " + " || text == " - " || text == " ÷ ")){
			return; //do nothing
	} else {
		// input is valid, add to screen/currentOperation
		$("#main-display").text($("#main-display").text() + text);
		currentOperation = $("#main-display").text();
	}
})

// clear entry
$("#ce").on("click", function(){
	$("#main-display").text(answer); 
	currentOperation = "";
})
// clear all
$("#ac").on("click", function(){
	$("#main-display").text("");
	$("#sub-display").text("0");
	currentOperation = "";
	previousOperation = "";
	answer = "";
})


// find answer, add to display and set previousOperation to currentOperation + "=" + answer
$("#equal").on("click", function(){
	previousOperation = currentOperation + " = ";
	// loop through operation, change x and ÷ to * and / (so that eval works)
	currentOperation = currentOperation.split("");
	for(var i=0; i<currentOperation.length; i++){
		if(currentOperation[i] == "x") currentOperation[i] = "*";
		if(currentOperation[i] == "÷") currentOperation[i] = "/";
	}
	currentOperation = currentOperation.join("");

	// evaluate and round answer
	answer = eval(currentOperation);
	// round to two decimal places
	answer = Math.round(answer * 100) / 100;
	// if answer is NaN, reset, else display the answer
	if(!answer){
		$("#ac").click();
	} else {
		previousOperation += answer;
		$("#main-display").text(answer);
		$("#sub-display").text(previousOperation);
		currentOperation = "";
	}
	
})


// flip screen button
$("#flip-screen").on("click", function(){
	$("#screen").toggleClass("flip-screen");
})

// words that can be typed on calculator (for random word button)
const words = ["01134", "379009", "58008", "618", "32008", "5318804",
				"663", "5663", "376616", "38076", "553580", "3045", "53045", 
				"338", "55178", "376608", "063", "35336", "378163771", "3781637"]
// random number function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// random word button
$("#random-word").on("click", function(){
	$("#ce").click();
	var word = words[getRandomInt(words.length)];
	$("#main-display").text(word);
})