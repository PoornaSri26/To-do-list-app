// Task streak tracker
(function() {
  function today() { return new Date().toISOString().slice(0,10); }
  function updateStreak() {
    const last = localStorage.getItem('streakLast') || '';
    const streak = +(localStorage.getItem('streak') || 0);
    if (window.todos && window.todos.some(t => t.completed && t.createdAt && t.createdAt.slice(0,10) === today())) {
      if (last !== today()) {
        localStorage.setItem('streak', streak + 1);
        localStorage.setItem('streakLast', today());
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Streak!', { body: `You kept your streak: ${streak+1} days!` });
        }
      }
    }
  }
  setInterval(updateStreak, 60000); // check every minute
})(); 