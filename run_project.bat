@echo off
setlocal

cd /d "%~dp0"

echo Starting VisionAI project...
echo Root: %cd%
echo.

if not exist "backend\app.py" (
  echo [ERROR] backend\app.py not found.
  pause
  exit /b 1
)

if not exist "frontend\package.json" (
  echo [ERROR] frontend\package.json not found.
  pause
  exit /b 1
)

echo Launching backend in a new terminal...
start "VisionAI Backend" cmd /k "cd /d "%~dp0backend" && python app.py"

echo Launching frontend in a new terminal...
start "VisionAI Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Both services have been started in separate terminals.
echo If any window closes immediately, check dependency installation errors.
endlocal
