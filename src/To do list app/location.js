// Task Location Tagging
window.tagTaskLocation = function(id) {
  if (!navigator.geolocation) return alert('Geolocation not supported.');
  navigator.geolocation.getCurrentPosition(async pos => {
    const {latitude, longitude} = pos.coords;
    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await resp.json();
      const loc = data.address.city || data.address.town || data.address.village || data.address.state || '';
      const country = data.address.country || '';
      if (window.todos) {
        const t = window.todos.find(t=>t.id===id);
        if (t) {
          t.location = loc + (country ? ', ' + country : '');
          if (typeof window.saveTodos==='function') window.saveTodos();
          if (typeof window.renderTodos==='function') window.renderTodos();
          alert('Location tagged: ' + t.location);
        }
      }
    } catch { alert('Could not fetch location.'); }
  }, ()=>alert('Location denied.'));
};
// Usage: tagTaskLocation(taskId); 