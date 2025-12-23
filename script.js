
(async function(){
  const listEl = document.getElementById('raetselList');
  const nextCountdownEl = document.getElementById('nextCountdown');

  const [schedule, data] = await Promise.all([
    fetch('schedule.json').then(r=>r.json()),
    fetch('raetsel.json').then(r=>r.json()),
  ]);

  const tz = schedule.timezone || 'Europe/Berlin';

  function fmtDate(d){
    return new Intl.DateTimeFormat('de-DE', {
      timeZone: tz, year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
  }

  function parseISOWithTZ(iso){
    return new Date(iso);
  }

  const now = ()=> new Date();

  const items = schedule.riddles.map(r => ({
    id: r.id, title: r.title, releaseISO: r.release, release: parseISOWithTZ(r.release),
    text: (data[r.id] && data[r.id].text) || '',
  })).sort((a,b)=> a.id - b.id);

  function render(){
    listEl.innerHTML = '';
    const tNow = now();
    let nextRelease = null;

    items.forEach(item => {
      const unlocked = tNow >= item.release || window.__override === true;
      if(!unlocked){ if(!nextRelease || item.release < nextRelease) nextRelease = item.release; }

      const card = document.createElement('article');
      card.className = 'card ' + (unlocked ? 'unlocked' : 'locked');

      const h3 = document.createElement('h3'); h3.textContent = item.title; card.appendChild(h3);
      const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = 'Freischaltung: ' + fmtDate(item.release) + ' (' + tz + ')'; card.appendChild(meta);
      const status = document.createElement('div'); status.className = 'status'; status.textContent = unlocked ? 'Freigegeben' : 'Gesperrt'; card.appendChild(status);
      const content = document.createElement('div'); content.className = 'content'; content.textContent = item.text; card.appendChild(content);

      if(!unlocked){
        const overlay = document.createElement('div'); overlay.className = 'overlay';
        const badge = document.createElement('div'); badge.className = 'badge';
        badge.innerHTML = 'Noch gesperrt – öffnet am <span class="time">' + fmtDate(item.release) + '</span>';
        overlay.appendChild(badge); card.appendChild(overlay);
      }

      listEl.appendChild(card);
    });

    if(nextRelease){ tickCountdown(nextRelease); }
    else { nextCountdownEl.textContent = 'Alle Rätsel sind freigeschaltet.'; }
  }

  function tickCountdown(target){
    function update(){
      const d = target - now();
      if(d <= 0){ render(); return; }
      const sec = Math.floor(d/1000)%60;
      const min = Math.floor(d/60000)%60;
      const hr = Math.floor(d/3600000)%24;
      const days = Math.floor(d/86400000);
      nextCountdownEl.textContent = `Nächstes Rätsel in ${days}d ${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')} (Zeit: ${tz})`;
    }
    update();
    clearInterval(window.__countInt);
    window.__countInt = setInterval(update, 1000);
  }

  document.getElementById('unlockAll').addEventListener('click', () => {
    const code = document.getElementById('code').value.trim();
    if(code.toLowerCase() === 'orange'){
      window.__override = true; render(); alert('Alle Rätsel sind jetzt temporär freigeschaltet.');
    } else { alert('Falscher Code.'); }
  });

  render();
})();
