# Rätsel-Website – Zeitgesteuertes Freischalten (Titel: "Die Reise zu Licht, Klang und Wind")

Dies ist eine kleine, statische Webseite (HTML/CSS/JS), auf der sich Rätsel erst ab einem festgelegten Zeitpunkt öffnen.
Alle Texte sind auf Deutsch. Du kannst die Freischaltzeiten in `schedule.json` anpassen.

## Dateien
- `index.html` – Hauptseite
- `styles.css` – Gestaltung
- `script.js` – Logik für Countdown, Zeitzone und Freischalt-Status
- `schedule.json` – Konfiguration der Zeiten (Zeitzone + Zeitpunkte)
- `raetsel.json` – Texte der fünf Rätsel

## Zeit-Konfiguration
Die Zeiten sind im ISO-8601-Format mit Zeitzonenangabe gespeichert (z. B. `2025-12-24T18:00:00+01:00`).
Die Anzeige nutzt die eingestellte Zeitzone (`Europe/Berlin`). Du kannst die Zeiten einfach anpassen.

## Lokale Vorschau
Öffne die Datei `index.html` im Browser. Für das Laden der JSON-Dateien ist es ggf. nötig, einen kleinen lokalen Server zu starten:

Python (3.x):
```
python -m http.server 8000
```
und dann `http://localhost:8000` im Browser öffnen.

## Hosting
Die Seite ist statisch und kann problemlos auf GitHub Pages, Netlify oder Vercel bereitgestellt werden.
