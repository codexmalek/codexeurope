@echo off
title Codex - deploiement Vercel
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nest pas installe : https://nodejs.org
  start "" https://nodejs.org
  pause
  exit /b
)
echo.
echo  Deploiement du site Codex sur Vercel.
echo  La premiere fois : connectez-vous (le navigateur souvre), puis repondez aux questions.
echo.
call npx --yes vercel@latest deploy --prod
echo.
echo  Termine. Ladresse du site est affichee ci-dessus (https://....vercel.app).
pause
