// JavaScript for To-Do List App
// (Paste all JS from index.html here, except <script> tags) 

// Utility: Add a todo by text (for voice, programmatic use)
window.addTodoByText = function(text) {
  if (!text || typeof text !== 'string') return;
  if (!window.todos) window.todos = [];
  const newTodo = {
    id: Date.now() + Math.random().toString(16).slice(2),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  window.todos.unshift(newTodo);
  if (typeof window.saveTodos === 'function') window.saveTodos();
  if (typeof window.renderTodos === 'function') window.renderTodos();
  if (typeof window.announce === 'function') window.announce('Added task: ' + text);
};
// Usage: addTodoByText('My new task');

// Expose core app state and functions for modular scripts
if (typeof todos !== 'undefined') window.todos = todos;
if (typeof saveTodos === 'function') window.saveTodos = saveTodos;
if (typeof renderTodos === 'function') window.renderTodos = renderTodos;
if (typeof announce === 'function') window.announce = announce;
if (typeof toggleComplete === 'function') window.toggleComplete = toggleComplete;
if (typeof deleteTodo === 'function') window.deleteTodo = deleteTodo;
if (typeof addTodo === 'function') window.addTodo = addTodo; 

// Render a circular action wheel for task actions
window.renderActionWheel = function(task) {
  // Returns HTML for the wheel and gear button
  return `
    <span class="task-action-wheel">
      <button class="task-action-gear" title="Actions" type="button">⚙️</button>
      <span class="task-action-icons">
        <span class="task-action-icon" data-action="pomodoro" title="Pomodoro">⏲️</span>
        <span class="task-action-icon" data-action="location" title="Tag location">📍</span>
        <span class="task-action-icon" data-action="share" title="Share">🔗</span>
        <span class="task-action-icon" data-action="label" title="Label">🏷️</span>
      </span>
    </span>
  `;
};

// Attach action wheel events after rendering todos
window.attachActionWheelEvents = function() {
  document.querySelectorAll('.task-action-wheel').forEach(wheel => {
    const gear = wheel.querySelector('.task-action-gear');
    const icons = wheel.querySelectorAll('.task-action-icon');
    if (!gear) return;
    gear.onclick = e => {
      e.stopPropagation();
      // Close others
      document.querySelectorAll('.task-action-wheel.open').forEach(w => { if (w!==wheel) w.classList.remove('open'); });
      wheel.classList.toggle('open');
      if (wheel.classList.contains('open')) {
        // Animate icons in a circle
        const r = 38;
        icons.forEach((icon, i) => {
          const angle = (i / icons.length) * 2 * Math.PI - Math.PI/2;
          icon.style.transform = `translate(-50%,-50%) translate(${Math.cos(angle)*r}px,${Math.sin(angle)*r}px)`;
        });
      } else {
        icons.forEach(icon => { icon.style.transform = 'translate(-50%,-50%)'; });
      }
    };
    // Always reset icon transforms on close
    wheel.classList.remove('open');
    icons.forEach(icon => { icon.style.transform = 'translate(-50%,-50%)'; });
    icons.forEach(icon => {
      icon.onclick = e => {
        e.stopPropagation();
        const li = wheel.closest('li');
        const id = li && li.dataset.id;
        if (!id) return;
        if (icon.dataset.action==='pomodoro' && window.startPomodoro) window.startPomodoro(li.querySelector('.todo-text').textContent);
        if (icon.dataset.action==='location' && window.tagTaskLocation) window.tagTaskLocation(id);
        if (icon.dataset.action==='share' && window.shareTask) window.shareTask(id);
        if (icon.dataset.action==='label' && window.setTaskLabelPrompt) window.setTaskLabelPrompt(id);
        wheel.classList.remove('open');
        icons.forEach(icon => { icon.style.transform = 'translate(-50%,-50%)'; });
      };
    });
  });
  // Only add one document click listener
  if (!window._actionWheelDocListener) {
    document.addEventListener('click', () => {
      document.querySelectorAll('.task-action-wheel.open').forEach(w => {
        w.classList.remove('open');
        w.querySelectorAll('.task-action-icon').forEach(icon => { icon.style.transform = 'translate(-50%,-50%)'; });
      });
    });
    window._actionWheelDocListener = true;
  }
}; 