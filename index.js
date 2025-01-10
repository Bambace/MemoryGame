const grid = document.querySelector('.grid');
const message = document.getElementById('message');
const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍑', '🍍'];
const cards = [...icons, ...icons]; // Duplicar para obtener pares
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(icon) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">${icon}</div>
    </div>
  `;
  card.addEventListener('click', () => flipCard(card, icon));
  return card;
}

function flipCard(card, icon) {
  if (flippedCards.length === 2 || card.classList.contains('flip')) return;
  
  card.classList.add('flip');
  flippedCards.push({ card, icon });

  if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.icon === second.icon) {
    matchedCards.push(first.icon);
    flippedCards = [];
    if (matchedCards.length === icons.length) {
      message.textContent = '¡Ganaste!';
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove('flip');
      second.card.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }
}

function setupGame() {
  shuffle(cards).forEach(icon => grid.appendChild(createCard(icon)));
}

setupGame();

