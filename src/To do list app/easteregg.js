// Easter egg: type 'konami' to trigger
(function() {
  let buffer = '';
  document.addEventListener('keydown', e => {
    buffer += e.key.toLowerCase();
    if (buffer.length > 6) buffer = buffer.slice(-6);
    if (buffer === 'konami') {
      buffer = '';
      const div = document.createElement('div');
      div.textContent = '🎉 Konami code! You found the easter egg! 🎉';
      div.style.position = 'fixed';
      div.style.top = '40%';
      div.style.left = '50%';
      div.style.transform = 'translate(-50%, -50%)';
      div.style.background = 'white';
      div.style.color = '#4f8cff';
      div.style.padding = '32px 48px';
      div.style.fontSize = '2em';
      div.style.borderRadius = '18px';
      div.style.boxShadow = '0 4px 32px rgba(0,0,0,0.18)';
      div.style.zIndex = 9999;
      document.body.appendChild(div);
      setTimeout(() => div.remove(), 2500);
    }
  });
})(); 