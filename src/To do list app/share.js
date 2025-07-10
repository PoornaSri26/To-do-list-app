// Task sharing via Web Share API
window.shareTask = function(id) {
  if (!navigator.share) return alert('Web Share not supported.');
  if (!window.todos) return;
  const t = window.todos.find(t=>t.id===id);
  if (!t) return alert('Task not found.');
  navigator.share({ title: 'My To-Do Task', text: t.text });
};
// Usage: shareTask(taskId); 