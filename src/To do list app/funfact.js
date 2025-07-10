// Fun fact of the day
(function() {
  const facts = [
    'Honey never spoils.',
    'Bananas are berries, but strawberries are not.',
    'A group of flamingos is called a flamboyance.',
    'Octopuses have three hearts.',
    'There are more stars in the universe than grains of sand on Earth.'
  ];
  const today = new Date().toISOString().slice(0,10);
  if (localStorage.getItem('funFactDate') !== today) {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    localStorage.setItem('funFact', fact);
    localStorage.setItem('funFactDate', today);
  }
  const fact = localStorage.getItem('funFact');
  const quoteBox = document.getElementById('quote-box');
  if (quoteBox && fact) {
    const div = document.createElement('div');
    div.style.fontSize = '13px';
    div.style.color = '#888';
    div.style.marginTop = '6px';
    div.textContent = 'Fun fact: ' + fact;
    quoteBox.appendChild(div);
  }
})(); 