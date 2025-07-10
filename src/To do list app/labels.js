// Task color labels
window.setTaskLabel = function(id, color) {
  if (!window.todos) return;
  const t = window.todos.find(t=>t.id===id);
  if (!t) return;
  t.label = color;
  if (typeof window.saveTodos==='function') window.saveTodos();
  if (typeof window.renderTodos==='function') window.renderTodos();
};
// Usage: setTaskLabel(taskId, '#ff0'); 