@echo off
cls

start cmd /k "echo START REACT APP && cd C:\Users\x\Documents\webapp\versatily\tspro-prototype\frontend && yarn run dev"
start cmd /k "echo START BACKEND SERVER && cd C:\Users\x\Documents\webapp\versatily\tspro-prototype\backend && yarn run dev"

exit