@echo off
REM Test script for Projects API (Windows)
REM Make sure Django backend is running on port 8000

echo Testing Projects API...
echo.

REM Test 1: Get all projects
echo 1. Testing GET /api/projects/
curl -s http://localhost:8000/api/projects/
echo.
echo ---
echo.

REM Test 2: Get featured projects
echo 2. Testing GET /api/projects/featured/
curl -s http://localhost:8000/api/projects/featured/
echo.
echo ---
echo.

REM Test 3: Get projects by category
echo 3. Testing GET /api/projects/by_category/?category=Web
curl -s "http://localhost:8000/api/projects/by_category/?category=Web"
echo.
echo ---
echo.

echo API tests completed!
echo.
echo If you see JSON responses above, the API is working correctly.
echo If you see errors, make sure:
echo   - Django backend is running (python manage.py runserver)
echo   - You have projects in the database
echo   - Port 8000 is not blocked
pause
