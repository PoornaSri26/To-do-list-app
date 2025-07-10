// Pomodoro timer
window.startPomodoro = function(taskText) {
  let mins = 25, secs = 0, interval;
  function tick() {
    if (secs === 0) { if (mins === 0) return finish(); mins--; secs = 59; } else secs--;
    show();
  }
  function show() {
    let el = document.getElementById('pomodoro-timer');
    if (!el) {
      el = document.createElement('div');
      el.id = 'pomodoro-timer';
      el.style.position = 'fixed';
      el.style.bottom = '80px';
      el.style.right = '24px';
      el.style.background = 'var(--card-bg)';
      el.style.color = 'var(--accent)';
      el.style.padding = '16px 24px';
      el.style.borderRadius = '12px';
      el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
      el.style.fontSize = '1.2em';
      el.style.zIndex = 5000;
      document.body.appendChild(el);
    }
    el.textContent = `Pomodoro: ${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  }
  function finish() {
    clearInterval(interval);
    let el = document.getElementById('pomodoro-timer');
    if (el) el.textContent = 'Break time! 5:00';
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro done!', { body: taskText||'Take a break!' });
    }
    setTimeout(()=>{ if (el) el.remove(); }, 5000);
  }
  show();
  interval = setInterval(tick, 1000);
};
// Usage: startPomodoro('Task name'); 