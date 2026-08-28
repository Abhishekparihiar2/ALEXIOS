@echo off
title ALEXIOS Local Web Server
echo ====================================================
echo Starting ALEXIOS Web Server at http://localhost:3000
echo ====================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port 3000
pause
