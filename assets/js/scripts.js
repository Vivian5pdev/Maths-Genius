// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
	let buttons = document.getElementsByTagName("button");

	for (let button of buttons) {
		button.addEventListener("click", function() {
			if (this.getAttribute("data-type") === "submit") {
				checkAnswer();
			} else {
				let gameType = this.getAttribute("data-type");
				runGame(gameType);
			}
		});
	}

	document.getElementById("answer-box").addEventListener("keydown", function(event) {
		if (event.key === "Enter") {
			checkAnswer();
		}
	});

	runGame("addition");
});

function runGame(gameType) {

	// Generate two random numbers between 1 and 25
	// Math.floor rounds down to the whole number
	// Math.random generates random numbers

	document.getElementById("answer-box").value = "";
	document.getElementById("answer-box").focus();

	let num1 = Math.floor(Math.random() * 10) + 1;
	let num2 = Math.floor(Math.random() * 10) + 1;

	if (gameType === "addition") {
		displayAdditionQuestion(num1, num2);
	} else if (gameType === "division") {
		displayDivisionQuestion(num1, num2);
	} else {
		alert(`Unknown game type ${gameType}`);
		throw `Unknown game type ${gameType}, GameOver!`;
	}

}

function checkAnswer() {

	// Checks the answer against the first element in
	// the returned calculateCorrectAnswer array

	let userAnswer = parseInt(document.getElementById("answer-box").value);
	let calculatedAnswer = calculateCorrectAnswer();
	let isCorrect = userAnswer ===  calculatedAnswer[0];

	if (isCorrect) {
		alert("Good Job! You got it right! :D");
		incrementScore();
	} else {
		alert(`Incorrect...you answered ${userAnswer}. The right answer is ${calculatedAnswer[0]}!`);
		incrementWrongAnswer();
	}

	runGame(calculatedAnswer[1]);

}

function calculateCorrectAnswer() {

	// Gets the operands (the numbers) and the operator (plus, minus etc)
	// directly from the DOM
    
	let num1 = parseInt(document.getElementById("num1").textContent);
	let num2 = parseInt(document.getElementById("num2").textContent);
	let operator = document.getElementById("operator").textContent;

	if (operator === "+") {
		return [num1 + num2, "addition"];
	
	
	} else if (operator ==="/") {
		return [operand1 / num2, "division"];
	} else {
		alert(`Unimplemented operator ${operator}`);
		throw `Unimplemented operator ${operator}, GameOver!`;
	}
}

function incrementScore() {

	// Gets the current score from the DOM and increments it

	let oldScore = parseInt(document.getElementById("score").innerText);
	document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer() {

	// Gets the current tally of incorrect answers from the DOM and increments it

	let oldScore = parseInt(document.getElementById("incorrect").innerText);
	document.getElementById("incorrect").innerText = ++oldScore;

}



function displayAdditionQuestion(operand1, operand2) {

	document.getElementById("num1").textContent = operand1;
	document.getElementById("num2").textContent = operand2;
	document.getElementById("operator").textContent = "+";

}




function displayDivisionQuestion(num1, num2) {

	document.getElementById("num1").textContent = operand1 * operand2;
	
	document.getElementById("num2").textContent = operand2;
	document.getElementById("operator").textContent = "/";

}
	