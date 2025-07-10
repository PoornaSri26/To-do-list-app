// Print tasks
window.printTasks = function() {
  let html = '<h2>My To-Do List</h2><ul>';
  if (window.todos) {
    window.todos.forEach(t => {
      html += `<li${t.completed ? ' style=\"text-decoration:line-through;color:#aaa\"' : ''}>${t.text}</li>`;
    });
  }
  html += '</ul>';
  const w = window.open('', '', 'width=600,height=800');
  w.document.write('<html><head><title>Print Tasks</title></head><body>' + html + '</body></html>');
  w.print();
  w.close();
};
// Usage: printTasks(); 