// Task Mood Tracker
(function() {
  const moods = ['😊','😐','😞'];
  function promptMood() {
    const mood = prompt('How do you feel after completing this task? (1=😊, 2=😐, 3=😞)');
    if (mood === '1' || mood === '2' || mood === '3') {
      const arr = JSON.parse(localStorage.getItem('moodHistory')||'[]');
      arr.push(+mood-1);
      localStorage.setItem('moodHistory', JSON.stringify(arr.slice(-30)));
      showMoodBar();
    }
  }
  function showMoodBar() {
    let arr = JSON.parse(localStorage.getItem('moodHistory')||'[]');
    let bar = arr.map(i=>moods[i]).join(' ');
    let el = document.getElementById('mood-bar');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mood-bar';
      el.style.textAlign = 'center';
      el.style.fontSize = '1.5em';
      el.style.margin = '10px 0 0 0';
      const card = document.querySelector('.todo-card');
      if (card) card.insertBefore(el, card.firstChild);
    }
    el.textContent = bar || 'How do you feel after tasks?';
  }
  window.addEventListener('DOMContentLoaded', showMoodBar);
  // Patch toggleComplete if present
  if (window.toggleComplete) {
    const orig = window.toggleComplete;
    window.toggleComplete = function(id) {
      orig(id);
      const todo = window.todos && window.todos.find(t=>t.id===id);
      if (todo && todo.completed) setTimeout(promptMood, 100);
    };
  }
})(); 