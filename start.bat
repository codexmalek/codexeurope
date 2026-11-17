@echo off
title Codex - site local
cd /d "%~dp0"
where node >/dev/null 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js nest pas installe.
  echo  Installez la version LTS depuis https://nodejs.org puis relancez ce fichier.
  start "" https://nodejs.org
  pause
  exit /b
)
echo.
echo  Site Codex en ligne sur http://localhost:4321/fr
echo  Laissez cette fenetre ouverte. Fermez-la pour arreter le site.
echo.
start "" cmd /c "timeout /t 2 /nobreak >/dev/null && start http://localhost:4321/fr"
node serve.mjs
pause
