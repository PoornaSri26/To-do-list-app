// Task reminder module
window.setTaskReminder = function(taskText, minutes) {
  if ('Notification' in window && Notification.permission === 'granted') {
    setTimeout(() => {
      new Notification('Task Reminder', { body: taskText });
    }, minutes * 60000);
  } else {
    setTimeout(() => {
      alert('Reminder: ' + taskText);
    }, minutes * 60000);
  }
};
// Usage: setTaskReminder('My Task', 1); // 1 minute 