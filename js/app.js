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
						"it takes two to tango",
					    "Talk is Cheap",
					   	"Curiosity Killed the Cat",
					    "no news is good news",
					    "ignorance is bliss",
					    "a stitch in time saves nine",
					    "better late than never",
					    "bad news travels fast",
					    "haste makes waste"];
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
				phraseElement.appendChild(createLI(" ", "space"));			
			}
		}
	}
	
	function chooseLetter(letterElement) {
		letterElement.className = "chosen";
		const key = letterElement.textContent;
		const hit = (checkLetter(key));
		if (!hit) {
			missed++;	
			const tries = document.querySelector('.tries');
			if (tries) {
				tries.className = "lostHeart";
				tries.firstElementChild.src = "images/lostHeart.png";
			} 
			
		}
		checkWin();
	}
	
	
	function checkLetter(key) {
		const letters = phraseElement.querySelectorAll('li');
		let hit = null;
		key = key.toUpperCase();
		for (let letter of letters) {
			if(letter.textContent === key) {
				letter.className += " show";
				hit = key;
			}
		}
		return hit;
	}
	
	// Check if win conditions or lose conditions have been met
	function checkWin() {
		const foundLength = (phraseElement.querySelectorAll(".show").length);	
		const phraseLength = (phraseElement.querySelectorAll(".letter").length);
		if (phraseLength === foundLength) {
			reset("win");
		}
		
		if (missed > 5) {
			reset("lose");
		}
	}
	
	// Display win or lose and reset game elements
	function reset(whichOverlay) {
			const overlay = document.querySelector("#overlay");
			const keyboard = qwertyElement.querySelectorAll(".chosen");
			const lostHearts = document.querySelectorAll(".lostHeart");
			
			startButton.textContent = "Reset";
			overlay.className = whichOverlay;
			overlay.style.display = "flex";
			inGame = false;
			missed = 0;
		
			for (let key of keyboard) {
				key.className = "";
			}
			
			for (let heart of lostHearts) {
				heart.className = "tries";
				heart.firstElementChild.src = "images/liveHeart.png";
			}
		
			while (phraseElement.hasChildNodes) {
				phraseElement.removeChild(phraseElement.firstChild);
			}
	}
	
	// create any element and add text to it
	function createElement(type, text, name) {
		const el = document.createElement(type);
		if (name !== "") {
			el.className = name;
		}
		if (text !== " ") { 
			el.textContent = text;
		} 
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
	
	// click start button to hide start overlay and start the game
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
						chooseLetter(letter);	
					}
				}
			}
		}
	});
	
	// let users click letter with mouse if they prefer
	qwertyElement.addEventListener('click', (e) => {
		const letterPressed = e.target;
		if (inGame) {
			if (letterPressed.tagName === "BUTTON" && letterPressed.className !== "chosen") {
				chooseLetter(letterPressed);
			}
		}
	});
	
	// supress users ability to click around in the phrase area and have the browsers text selector reveal the phrase
	document.addEventListener("mousedown", function (e) {
		e.preventDefault();
	});
	
});