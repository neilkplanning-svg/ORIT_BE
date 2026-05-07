@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

REM =====================================================
REM   Deploy Script - אתר עו"ד אורית בן אלי
REM   Usage: deploy.cmd "commit message"
REM =====================================================

cd /d "%~dp0"

echo.
echo ============================================
echo   GitHub Pages Deploy - Orit Beneli Website
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
    echo [!] Git repository not initialized.
    echo     Running first-time setup...
    git init
    git branch -M main
    git remote add origin https://github.com/neilkplanning-svg/ORIT_BE.git
)

set "MSG=%~1"
if "%MSG%"=="" (
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value ^| find "="') do set "DT=%%a"
    set "MSG=Update site - !DT:~0,4!-!DT:~4,2!-!DT:~6,2! !DT:~8,2!:!DT:~10,2!"
)

echo [1/3] git add .
git add .
if errorlevel 1 goto :error

echo.
echo [2/3] git commit -m "%MSG%"
git commit -m "%MSG%"
if errorlevel 1 (
    echo.
    echo [!] No changes to commit, or commit failed.
    echo     Continuing to push...
)

echo.
echo [3/3] git push
git push -u origin main
if errorlevel 1 goto :error

echo.
echo ============================================
echo   [V] Done! Site will update in 30-90 sec
echo   https://neilkplanning-svg.github.io/ORIT_BE/
echo ============================================
echo.
pause
exit /b 0

:error
echo.
echo [X] An error occurred. Check the output above.
echo.
pause
exit /b 1
