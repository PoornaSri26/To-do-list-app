// Daily motivational notification
(function() {
  const quotes = [
    "Keep going!",
    "You are capable of amazing things.",
    "Stay positive, work hard.",
    "Every day is a fresh start."
  ];
  function showMotivation() {
    if (Notification.permission === 'granted') {
      const last = localStorage.getItem('lastMotivation') || '';
      const today = new Date().toISOString().slice(0,10);
      if (last !== today) {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        new Notification('Motivation', { body: quote });
        localStorage.setItem('lastMotivation', today);
      }
    }
  }
  if ('Notification' in window) {
    if (Notification.permission === 'default') Notification.requestPermission();
    setTimeout(showMotivation, 2000);
  }
})(); 