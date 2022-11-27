/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let words = this.words
    let chain = {}

    for (let i = 0; i < words.length; i++){
      if (!chain[words[i]]){
        chain[words[i]] = []
      }
      if (i == words.length - 1){
        chain[words[i]].push(null)
      }
      else{
        chain[words[i]].push(words[i + 1])
      }
    }
    this.chain = chain
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let words = this.words
    let chain = this.chain
    let start = Math.floor(Math.random() * numWords)
    let counter = 0
    let text = words[start]
    let curr_word = words[start]
    
    while (counter < numWords){
      let word_choices = chain[curr_word]
      let next_word = word_choices[Math.floor(Math.random() * word_choices.length)]
      if (next_word){
        text += ` ${next_word}`
        counter += 1
        curr_word = next_word
      }
      else{
        counter = numWords
      }
    }
    return text
  }
}

module.exports = {
  MarkovMachine : MarkovMachine
}