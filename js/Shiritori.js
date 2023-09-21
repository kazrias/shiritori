function validateWord(word) {
  return /^[\p{L}\p{M}\p{Zs}]{2,30}$/u.test(word);
}

class Shiritori {
  #words = [];
  #game_over = false;
  play(word) {
    if (this.#game_over)
      return 'over'
    if (validateWord(word) || word.replaceAll(' ', '').length < 2)
      return 'type/length'
    const len = this.#words.length;
    const wordToPush = word.toLowerCase().trim();
    if (!len || this.#words[len - 1].at(-1) === wordToPush[0] && !this.#words.includes(wordToPush)) {
      this.#words.push(wordToPush)
      return true
    }
    else {
      this.#game_over = true;
      return false
    }
  }
  restart() {
    this.#words = [];
    this.#game_over = false
    return 'Game restared!'
  }
  get words() {
    return this.#words
  }
  get status() {
    return this.#game_over ? 'Game is finished' : "Game isn't finished"
  }
}

const game = new Shiritori();

function inputEventHandler() {
  const inputedWord = inputField.value;
  const res = game.play(inputedWord);
  switch (res) {
    case 'over':
      messageField.innerText = 'Game is over, restart it!'
      break;
    case 'type/length':
      messageField.innerText = "Word's type must be string and length greater than 1"
      break;
    case true:
      inputField.value = '';
      let words = game.words.join(', ')
      messageField.innerText = words
      break;
    case false:
      messageField.innerText = `"${inputedWord}" word doesn't fit, game over!`;
      break;
  }
}



const inputField = document.querySelector('.shiritori__input-field');
const addBtn = document.querySelector('.shiritori__input-button');
const messageField = document.querySelector('.shiritori__functionality-result')

inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter')
    inputEventHandler()
})
addBtn.addEventListener('click', inputEventHandler)


const wordsBtn = document.querySelector('.shiritori__functionality-btn--show');
const statusBtn = document.querySelector('.shiritori__functionality-btn--status');
const restartBtn = document.querySelector('.shiritori__functionality-btn--restart');

wordsBtn.addEventListener('click', () => {
  let words = game.words.join(', ')
  messageField.innerText = words;
})

statusBtn.addEventListener('click', () => {
  messageField.innerText = game.status;
})

restartBtn.addEventListener('click', () => {
  inputField.value = ''
  messageField.innerText = game.restart()
})
