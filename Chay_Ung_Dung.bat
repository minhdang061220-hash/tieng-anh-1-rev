@echo off
chcp 65001 >nul
title Bé Học Tiếng Anh 1 - Global Success (Máy Tính & Điện Thoại)
echo ===================================================================
echo     ỨNG DỤNG HỖ TRỢ BÉ HỌC TIẾNG ANH 1 - GLOBAL SUCCESS
echo     NXB Giáo Dục Việt Nam - Bộ sách Kết Nối Tri Thức Với Cuộc Sống
echo ===================================================================
echo.
echo Đang mở ứng dụng trên trình duyệt máy tính...
start "" http://localhost:8085/
echo.
echo Đang khởi động máy chủ phục vụ cho cả Máy Tính và Điện Thoại...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
