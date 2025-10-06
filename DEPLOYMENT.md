# 🚀 Railway Deployment Guide

คู่มือการ deploy แอปพลิเคชัน Fitness Planner ไปยัง Railway

## ข้อกำหนดเบื้องต้น

1. บัญชี GitHub
2. บัญชี Railway (https://railway.app)
3. โค้ดโปรเจกต์ใน GitHub Repository

## 🛠️ ขั้นตอนการ Deploy

### 1. เตรียมโค้ดใน GitHub

```bash
# เริ่มต้น Git repository
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit ครั้งแรก
git commit -m "Initial commit: Fitness Planner App"

# เชื่อมต่อกับ GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/fitness-workout-planner.git

# Push ไปยัง GitHub
git push -u origin main
```

### 2. Deploy บน Railway

1. **เข้าสู่ Railway Dashboard**
   - ไปที่ https://railway.app
   - เข้าสู่ระบบด้วย GitHub account

2. **สร้างโปรเจกต์ใหม่**
   - คลิก "New Project"
   - เลือก "Deploy from GitHub repo"
   - เลือก repository: `fitness-workout-planner`

3. **ตั้งค่า Environment Variables**
   - ไปที่ Settings > Variables
   - เพิ่มตัวแปร:
     ```
     NODE_ENV=production
     GENERATE_SOURCEMAP=false
     ```

4. **ตั้งค่า Build Command**
   - ไปที่ Settings > Build
   - Build Command: `npm run build`
   - Start Command: `npm run serve`

### 3. ตรวจสอบการ Deploy

- Railway จะ build และ deploy อัตโนมัติ
- ตรวจสอบ logs ในแท็บ "Deployments"
- URL ของแอปจะแสดงในแท็บ "Settings" > "Domains"

## การตั้งค่าสำหรับ Production

### Environment Variables ที่แนะนำ

```bash
NODE_ENV=production
GENERATE_SOURCEMAP=false
REACT_APP_ENV=production
```

### Build Optimization

- ไฟล์ `railway.json` ตั้งค่า build process
- ไฟล์ `nixpacks.toml` กำหนด build steps
- ไฟล์ `Procfile` กำหนด start command

## การตรวจสอบ Performance

1. **Build Size**
   - ตรวจสอบขนาด bundle ใน build logs
   - ใช้ `npm run build` เพื่อดูขนาดไฟล์

2. **Runtime Performance**
   - ตรวจสอบ memory usage ใน Railway dashboard
   - ดู response time ใน logs

## การอัปเดตแอป

```bash
# หลังจากแก้ไขโค้ด
git add .
git commit -m "Update: description of changes"
git push origin main

# Railway จะ deploy อัตโนมัติ
```

## การแก้ไขปัญหา

### Build Failed
- ตรวจสอบ logs ใน Railway dashboard
- ตรวจสอบ dependencies ใน package.json
- ตรวจสอบ syntax errors

### App Not Starting
- ตรวจสอบ start command ใน Procfile
- ตรวจสอบ port configuration
- ดู logs ในแท็บ "Deployments"

### Performance Issues
- ตรวจสอบ memory usage
- ตรวจสอบ build size
- ใช้ React DevTools Profiler

## การเข้าถึงแอป

หลังจาก deploy สำเร็จ:
1. ไปที่ Railway dashboard
2. คลิกที่โปรเจกต์
3. ดู URL ในแท็บ "Settings" > "Domains"
4. แชร์ลิงก์ให้ผู้ใช้เข้าถึง

## Tips สำหรับ Production

1. **Security**
   - ใช้ HTTPS (Railway ให้อัตโนมัติ)
   - ตั้งค่า CORS หากจำเป็น

2. **Performance**
   - เปิดใช้ compression
   - ใช้ CDN สำหรับ static files

3. **Monitoring**
   - ตั้งค่า alerts ใน Railway
   - ตรวจสอบ logs เป็นประจำ

---

