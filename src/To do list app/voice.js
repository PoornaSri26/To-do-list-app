// Voice add task (Web Speech API)
window.startVoiceTask = function() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Voice recognition not supported.');
    return;
  }
  const rec = new webkitSpeechRecognition();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = function(e) {
    const text = e.results[0][0].transcript.trim();
    if (text && window.addTodoByText) window.addTodoByText(text);
    else alert('Heard: ' + text);
  };
  rec.onerror = function() { alert('Voice recognition error.'); };
  rec.start();
};
// Usage: startVoiceTask(); 