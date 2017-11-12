
var words = [];
var commonWords = [];
var finalWords = [];
var dom = {
  letters: null,
  length: null,
  complex: null,
  button: null,
  list: null
}

//commonWords.txt from http://www.ef.edu/english-resources/english-vocabulary/top-3000-words/
//words.txt from https://gist.github.com/h3xx/1976236

function preload() {
	words = loadStrings("words.txt");
  commonWords = loadStrings("commonWords.txt");
}

function setup() {
  noCanvas();
  noLoop();

  dom.letters = select('#letters');
  dom.letters.changed(update);

  dom.length = select('#length');
  dom.length.changed(update);

  dom.complex = select('#complex');
  dom.complex.changed(update);

  dom.list = select('#list');

  dom.button = select('#button');
  dom.button.mousePressed(update);
}

function update() {
  var lengths = dom.length.value().split(/[ ,]+/).map(function(item) {
      return parseInt(item, 10);
  });
  var allWords = [];

  for (var i = 0; i < lengths.length; i++) {
    var newWords = getCorrectCombinations(dom.letters.value().toLowerCase(), lengths[i], dom.complex.checked());
    allWords = allWords.concat(newWords);
  }

  clearList();
  if (allWords.length > 0) {
    for (var i = 0; i < allWords.length; i++) {
      addListItem(allWords[i]);
    }
  } else {
    addListItem("No words were found, try using complex search for more words.");
  }
}

function getCorrectCombinations(word, length, complex) {
  var words = getCombinations(word, length);

  for (var i = 0; i < word.length; i++) {
    var newWord = word.slice(0,i-1) + word.slice(i);
  }

  var correctWords = [];
  for (var i = 0; i < words.length; i++) {
  	if (checkWord(words[i], complex)) {
  		correctWords.push(words[i]);
  	}
  }

  var finalWords = correctWords.filter(function(elem, index, self) {
   return index == self.indexOf(elem);
  });

  //console.log(finalWords);
  return finalWords;
}

function getCombinations(string,length){
    var word = [];
    for(var i=0;i<string.length;i++){
        word.push(string.charAt(i));
    }

    var words = [];
    add('',length,word);
    return words;
    function add(token,length,word){

        if(token.length >= length){
            return token;
        }

        for(var i=0;i<word.length;i++){
            var clone = JSON.parse(JSON.stringify(word));
            clone.splice(i,1);
            var comp = add(token+word[i],length,clone);
            if(comp){
                words.push(add(token+word[i],length,clone));
            }
        }
    }
}

function addListItem(string) {
  var x = createElement('li', string);
  x.parent("list");
}

function clearList() {
  dom.list.html("");
}

function checkWord(word, complex) {
	for (var i = 0; i < words.length; i++) {
    if (complex) {
      if (word == words[i]) {
  			return true;
  		}
    } else if (!complex) {
      if (word == commonWords[i]) {
  			return true;
  		}
    } else {
      console.log("Complex (the checkbox) was not true or false!!");
    }

	}
}
