// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

let wordToScore = "";

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelPointStructure = {
	3: ['A',  'E',  'I',  'O',  'U'],
	1: ['B',  'C',  'D',  'F',  'G',  'H',  'J',  'K',  'L',  'M',  'N',  'P',  'Q',  'R',  'S',  'T',  'V',  'W',  'X',  'Y',  'Z']
}

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 	for (let i = 0; i < word.length; i++) {
 	  for (const pointValue in oldPointStructure) {
 		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 	  }
	}
	return letterPoints;
}

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   wordToScore = input.question("Enter a word to score: ");
}

function simpleScore(word) {
	return word.length;
}

function vowelBonusScore(word) {
	let wordPoints = 0;
	for (let i = 0; i < word.length; i++) {
		for (pointValue in vowelPointStructure) {
			if (vowelPointStructure[pointValue].includes(word[i].toUpperCase())) {
				wordPoints += Number(pointValue);
			}
		}
	}
	return wordPoints;
}

function transform(object) {
	let newPointObj = {};
	for (points in object) {
		for (letters of object[points]) {
			newPointObj[letters.toLowerCase()] = Number(points);
		};
	};
	return newPointObj;
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScore(word) {
	let wordPoints = 0;
	for (let i = 0; i < word.length; i++) {
		for (letters in newPointStructure) {
			if (letters===(word[i].toLowerCase())) {
				wordPoints += Number(newPointStructure[letters]);
			}
		}
	}
	return wordPoints;
}

let simpleScoreObj = {
	name: "Simple Score",
	description: "Each letter is worth 1 point.",
	scorerFunction: function(word) {
		return simpleScore(word);
	}
};

let bonusVowelsObj = {
	name: "Bonus Vowels",
	description: "Vowels are 3 pts, consonants are 1 pt.",
	scorerFunction: function(word) {
		return vowelBonusScore(word);
	}
};

let scrabbleScoreObj = {
	name: "Scrabble",
	description: "The traditional scoring algorithm.",
	scorerFunction: function(word) {
		return scrabbleScore(word);
	}
};

const scoringAlgorithms = [simpleScoreObj, bonusVowelsObj, scrabbleScoreObj];

function scorerPrompt() {
	let userScoringAlgorithmChoice = "";
	console.log(`\nThere are ${scoringAlgorithms.length} scoring algorithms available.`);
	let choices = "";
	for (let i = 0; i < scoringAlgorithms.length; i++) {
	//for (elements of scoringAlgorithms) {
		//console.log(`${i}. ${elements.name}: ${elements["description"]}`);
		console.log(`${i}. ${scoringAlgorithms[i]["name"]}: ${scoringAlgorithms[i]["description"]}`);
		if (i < scoringAlgorithms.length - 1) {
			choices += String(i) + ", ";
		} else {
			choices += "or " + String(i);
		}
	}
	userScoringAlgorithmChoice = input.question(`Enter ${choices}: `);
	console.log("");
	return scoringAlgorithms[userScoringAlgorithmChoice];
}

function runProgram() {
   initialPrompt();
   console.log(`Score for '${wordToScore}': ${scorerPrompt().scorerFunction(wordToScore)}`);
}

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
