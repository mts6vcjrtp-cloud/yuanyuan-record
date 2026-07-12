async function load(name) {
  const r = await fetch(name + '.txt');
  return r.ok ? r.text() : '';
}
async function main() {
  const chat = document.getElementById('chat');
  const [gm, dj, sl] = await Promise.all([
    load('goodmorning'),
    load('diary'),
    load('sleeplog')
  ]);
  const lines = [];
  [['早安', gm], ['日记', dj], ['催睡', sl]].forEach(([tag, txt]) => {
    txt.split('\n').filter(l => l.trim()).forEach(l => {
      const m = l.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2})[\s\-]+(.+)/);
      if (m) lines.push({ time: m[1], text: m[2], tag });
    });
  });
  lines.sort((a, b) => a.time.localeCompare(b.time));
  lines.forEach(l => {
    const d = document.createElement('div');
    d.className = 'msg mine';
    d.innerHTML = `<div class="time">${l.time} · ${l.tag}</div><div>${l.text}</div>`;
    chat.appendChild(d);
  });
}
main();
