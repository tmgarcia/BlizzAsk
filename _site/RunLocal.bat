:: RunLocal.bat
:: Runs and opens the application
::
@echo off
pushd %~dp0
start chrome "http://localhost:4000"
call bundle exec jekyll serve
pause
popd
