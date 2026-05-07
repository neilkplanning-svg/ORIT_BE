@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ============================================
echo   GitHub Pages Deploy
echo ============================================
echo.

where git >nul 2>nul
if errorlevel 1 (
    echo [X] Git is not installed.
    echo     Download: https://git-scm.com/download/win
    pause
    exit /b 1
)

if not exist ".git" (
    echo [!] Initializing repository...
    git init
    git branch -M main
    git remote add origin https://github.com/neilkplanning-svg/ORIT_BE.git
)

set "MSG=%~1"
if "%MSG%"=="" (
    for /f %%T in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm"') do set "STAMP=%%T"
    set "MSG=Update site !STAMP!"
)

echo [1/4] git add .
git add .

echo.
echo [2/4] git commit -m "%MSG%"
git commit -m "%MSG%"
if errorlevel 1 (
    echo     [i] No new changes to commit. Continuing...
)

echo.
echo [3/4] git pull --rebase origin main
git pull --rebase origin main
if errorlevel 1 (
    echo.
    echo [!] Pull rebase failed. Trying merge with unrelated histories...
    git pull origin main --allow-unrelated-histories --no-edit
    if errorlevel 1 (
        echo [X] Could not sync with remote. Resolve conflicts manually.
        pause
        exit /b 1
    )
)

echo.
echo [4/4] git push -u origin main
git push -u origin main
if errorlevel 1 goto :error

echo.
echo ============================================
echo   [V] Deploy complete!
echo   Site updates in 30-90 seconds:
echo   https://neilkplanning-svg.github.io/ORIT_BE/
echo ============================================
echo.
pause
exit /b 0

:error
echo.
echo [X] Push failed. Possible fixes:
echo     1) Run: git pull origin main --allow-unrelated-histories
echo     2) Or force push (overwrites remote):
echo        git push -f origin main
echo.
pause
exit /b 1
