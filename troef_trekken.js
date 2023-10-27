console.clear();

(function() {
  "use strict";
  
  const symbols = ["♣", "♠", "♥", "♦"];
  let table = document.getElementById('table'),
      cardWidth = 100, cardHeight = 150,
      cardCount = 1, startingHands = 0;
  
  function init() {
    bindEvents();
    
    // Initial draw
    start();
  }
  
  function start() {
    if(startingHands < 0) {
      startingHands++;
      draw();
      
      setTimeout(start, 1000);
    }
  }
  
  function bindEvents() {
    window.addEventListener('click', () => {
      draw();
    });
  }
  
  function draw() {
    let tl = gsap.timeline(),
        position = getTableCenter(),
        card = addCard();
    
    cardCount++;
    
    gsap.set(card, {
      y: -table.offsetHeight,
      x: table.offsetWidth / 2,
      zIndex: cardCount,
    });
    let offsetX = table.offsetWidth * .5,
        offsetY = table.offsetHeight * .5;
    tl.addLabel('start')
      .to(card, {
        duration: 1.5,
        ease: Power2.easeOut,      
        x: position.x + getRandom(-offsetX, offsetX),
        y: position.y + getRandom(-offsetY, offsetY),
      }, 'start')
      .to(card, {
        duration: 1.4,
        ease: Power2.easeOut,
        rotation: getRandom(360),
      }, 'start');
  }
  
  function addCard() {
    let card = document.createElement('div');
    card.className = 'card';
    let span = document.createElement('span');
    var symbol = getRandomSymbol();
    span.appendChild(document.createTextNode(symbol))
    span.className = 'card__symbol' + (["♥", "♦"].includes(symbol) ? ' card__symbol--red' : '');
    card.appendChild(span);
    table.appendChild(card);
    
    return card;
  }

  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  function getTableCenter() {
    return {
      x: (table.offsetLeft + table.offsetWidth / 2) - (cardWidth / 2),
      y: (table.offsetTop + table.offsetHeight / 2) - (cardHeight / 2),
    };
  }
  
  function getRandom(min, max = null) {
    let realMax = (max === null ? min * 2 : max);
    return min + Math.random() * (realMax - min);    
  }  
    
  
  init();
  
})();