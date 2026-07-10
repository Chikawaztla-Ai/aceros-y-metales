@echo off
echo ============================================
echo  Conectando proyecto con GitHub...
echo ============================================
echo.

cd /d "C:\Users\AZAEL - DISEÑO\Claude\Projects\Aceros y Metales URGENTES"

git config --global user.email "azaelecommerce@gmail.com"
git config --global user.name "Chikawaztla-Ai"

git add .
git commit -m "Inicio del proyecto - Aceros y Metales"
git branch -M main
git push -u origin main

echo.
echo ============================================
echo  Listo! Proyecto subido a GitHub.
echo  URL: https://github.com/Chikawaztla-Ai/aceros-y-metales
echo ============================================
pause
