@echo off
title CRMPro — Iniciando...
cd /d "C:\Users\hugob\.gemini\antigravity-ide\scratch\crm-app"

echo.
echo  ██████╗██████╗ ███╗   ███╗██████╗ ██████╗  ██████╗
echo  ██╔════╝██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔═══██╗
echo  ██║     ██████╔╝██╔████╔██║██████╔╝██████╔╝██║   ██║
echo  ██║     ██╔══██╗██║╚██╔╝██║██╔═══╝ ██╔══██╗██║   ██║
echo  ╚██████╗██║  ██║██║ ╚═╝ ██║██║     ██║  ██║╚██████╔╝
echo   ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝ ╚═════╝
echo.
echo  Iniciando servidor... espera unos segundos
echo.

:: Arranca el servidor en segundo plano
start "" /B npm run dev

:: Espera 4 segundos para que Vite arranque
timeout /t 4 /nobreak > nul

:: Abre el navegador
start "" "http://localhost:5173/"

echo  Abierto en http://localhost:5173/
echo  Cierra esta ventana para detener el servidor.
echo.

:: Mantiene la ventana abierta (y el servidor corriendo)
npm run dev
