# 🚀 Quick Deploy to Railway

## ขั้นตอนการ Deploy อย่างรวดเร็ว

### 1. เตรียมโค้ดใน GitHub
```bash
# ในโฟลเดอร์โปรเจกต์
git init
git add .
git commit -m "Initial commit: Fitness Planner App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fitness-workout-planner.git
git push -u origin main
```

### 2. Deploy บน Railway
1. ไปที่ https://railway.app
2. เข้าสู่ระบบด้วย GitHub
3. คลิก "New Project" > "Deploy from GitHub repo"
4. เลือก repository: `fitness-workout-planner`
5. Railway จะ deploy อัตโนมัติ!

### 3. ตั้งค่า Environment Variables
ใน Railway Dashboard > Settings > Variables:
```
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

### 4. ตรวจสอบการ Deploy
- ดู URL ในแท็บ "Settings" > "Domains"
- ตรวจสอบ logs ในแท็บ "Deployments"

## ✅ ไฟล์ที่เตรียมไว้แล้ว
- `railway.json` - การตั้งค่า Railway
- `nixpacks.toml` - Build configuration
- `Procfile` - Start command
- `package.json` - Scripts สำหรับ production

## 🎯 แอปพร้อมใช้งาน!
หลังจาก deploy สำเร็จ คุณจะได้ URL สำหรับเข้าถึงแอปพลิเคชัน
