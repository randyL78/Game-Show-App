/* jshint esversion: 6 */ 

document.addEventListener('DOMContentLoaded', function () {
	"use strict";
	
	////////////////////////////////////////////////////////////////////////////////
	// globals
	////////////////////////////////////////////////////////////////////////////////
	
	// constants
	const qwertyElement = document.querySelector("#qwerty");
	const phraseElement = document.querySelector("#phrase");
	const startButton = document.querySelector(".btn__reset");
	const phrases = [	"let sleeping dogs lie",
					 	"home is where the heart is",
					 	"the itsy bitsy spider",
					 	"eat your heart out",
					 	"no turning back",
					 	"the end justifies the means",
					 	"once bitten twice shy",
					 	"less is more",
						"misery loves company",
						"it takes two to tango"];
	
	// variables
	let missed = 0;
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////
	// functions 
	////////////////////////////////////////////////////////////////////////////////
	function getRandomPhraseArray(phrases) {
		
	}
	
	function addPhraseToDisplay(arr) {
		
	}
	
	function checkLetter() {
		
	}
	
	////////////////////////////////////////////////////////////////////////////////
	// event listeners
	////////////////////////////////////////////////////////////////////////////////
	// Todo add evenlistener to start button click and hide start overlay
	startButton.addEventListener('click'  => () {
		const overlay = document.querySelector("#overlay");
		overlay.style.display = "none";
	});
	
	
	////////////////////////////////////////////////////////////////////////////////
	// main
	////////////////////////////////////////////////////////////////////////////////
});