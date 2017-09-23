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
	const allPhrases = ["let sleeping dogs lie",
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
	let inGame = false;
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////
	// functions 
	////////////////////////////////////////////////////////////////////////////////
	function getRandomPhraseArray(phrases) {
		const rand = random(phrases.length);
		const phrase = phrases[rand];
		let chars = [];
		for (let char of phrase) {		
			chars.push(char);
		}
		
		return chars;
	}
	
	function random(upperRange = 100) {
		const rand = Math.floor(Math.random() * upperRange);
//		console.log(rand);
		return rand;
	}
	
	function addPhraseToDisplay(arr) {
		for (let letter of arr) {
			if (letter !== " ") {
				phraseElement.appendChild(createLI(letter.toUpperCase(), "letter"));			
			} else {
				phraseElement.appendChild(createLI(letter.toUpperCase(), ""));			
			}
		}
	}
	
	function checkLetter(key) {
		const letters = phraseElement.querySelectorAll('li');
		let hit = false;
		for (let letter of letters) {
			if(letter.textContent === key.toUpperCase()) {
				letter.className += "show";
				hit = true;
			}
		}
		if (!hit) {
			missed++;
			alert(missed);
		}
	}
	
	// create any element and add text to it
	function createElement(type, text, name) {
		const el = document.createElement(type);
		if (name !== "") {
			el.className = name;
		}
		el.textContent = text;
		return el;
	}
	
	// creat an li element and add text to it
	function createLI (text, name) {
		return createElement('li', text, name);
	}
	
	// load basic game setup
	function loadGame() {
		inGame = true;
		const phraseArray = getRandomPhraseArray(allPhrases);
		addPhraseToDisplay(phraseArray);		
	}
	
	////////////////////////////////////////////////////////////////////////////////
	// event listeners
	////////////////////////////////////////////////////////////////////////////////
	
	// click start button to hidestart overlay and start the game
	startButton.addEventListener('click', ()  =>  {
		const overlay = document.querySelector("#overlay");
		overlay.style.display = "none";
		loadGame();
	});
	
	// listen for keyboard press when in game mode
	window.addEventListener('keypress', (e) => {
		const key = e.key;
		if (inGame) {
			const letters = qwertyElement.querySelectorAll('button');
			for (let count in letters) {
				if (count !== undefined) {
					const letter = letters[count];
					if (letter.textContent === key && letter.className !== "chosen") {
						letter.className = "chosen";
						checkLetter(key);
					}
				}
			}
			
		}
	});
});