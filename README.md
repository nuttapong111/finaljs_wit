# 💪 Fitness & Workout Planner

แอปพลิเคชันวางแผนออกกำลังกายที่ครบครันและทันสมัย พัฒนาด้วย React.js และ Hero UI Theme

## ✨ ฟีเจอร์หลัก

###  วางแผนออกกำลังกาย
- สร้างโปรแกรมออกกำลังกายที่เหมาะกับคุณ
- เลือกท่าออกกำลังกายจากคลังข้อมูล
- กำหนดจำนวนเซ็ตและครั้ง
- ตั้งค่าระดับความยาก (เริ่มต้น/ปานกลาง/ขั้นสูง)
- กำหนดระยะเวลาออกกำลังกาย

###  คลังท่าออกกำลังกาย
- ค้นหาท่าออกกำลังกายตามชื่อหรือกลุ่มกล้ามเนื้อ
- ดูคำแนะนำการทำท่าออกกำลังกาย
- ดูวิดีโอสาธิต (เชื่อมต่อ YouTube)
- ข้อมูลแคลอรี่ที่เผาผลาญต่อนาที
- จำแนกตามอุปกรณ์ที่ใช้

###  ติดตามความก้าวหน้า
- บันทึกเซสชั่นออกกำลังกาย
- ดูสถิติรายสัปดาห์และรายเดือน
- ติดตามแคลอรี่ที่เผาผลาญ
- ดูเวลาออกกำลังกายรวม
- จัดการข้อมูลส่วนตัว

###  คำนวณแคลอรี่
- คำนวณ BMR (Basal Metabolic Rate)
- คำนวณ TDEE (Total Daily Energy Expenditure)
- คำนวณ BMI (Body Mass Index)
- แนะนำแคลอรี่เป้าหมายตามเป้าหมาย
- แนะนำสารอาหารหลัก (โปรตีน/คาร์บ/ไขมัน)

##  เทคโนโลยีที่ใช้

- **Frontend**: React.js 18
- **Routing**: React Router DOM
- **Icons**: Heroicons
- **Styling**: CSS3 with Custom Properties
- **State Management**: React Context API
- **Data Persistence**: LocalStorage

## 🚀 การติดตั้งและรัน

### ข้อกำหนดระบบ
- Node.js 14.0 หรือใหม่กว่า
- npm 6.0 หรือใหม่กว่า

### ขั้นตอนการติดตั้ง

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd fitness-workout-planner
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **รันแอปพลิเคชัน**
   ```bash
   npm start
   ```

4. **เปิดเบราว์เซอร์**
   - ไปที่ `http://localhost:3000`

### การ Build สำหรับ Production

```bash
npm run build
```

ไฟล์ที่ build จะอยู่ในโฟลเดอร์ `build/`

### การ Deploy ไปยัง Railway

1. **เตรียมโค้ดใน GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Fitness Planner App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/fitness-workout-planner.git
   git push -u origin main
   ```

2. **Deploy บน Railway**
   - ไปที่ https://railway.app
   - เข้าสู่ระบบด้วย GitHub
   - คลิก "New Project" > "Deploy from GitHub repo"
   - เลือก repository: `fitness-workout-planner`

3. **ตั้งค่า Environment Variables**
   ```
   NODE_ENV=production
   GENERATE_SOURCEMAP=false
   ```

4. **ตรวจสอบการ Deploy**
   - ดู URL ในแท็บ "Settings" > "Domains"
   - ตรวจสอบ logs ในแท็บ "Deployments"

ดูคู่มือการ deploy แบบละเอียดใน [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📱 วิธีใช้งาน

### 1. หน้าแรก
- ดูภาพรวมของแอปพลิเคชัน
- ดูสถิติความก้าวหน้าล่าสุด
- เข้าถึงฟีเจอร์หลักต่างๆ

### 2. วางแผนออกกำลังกาย
- คลิก "สร้างโปรแกรมใหม่"
- กรอกข้อมูลโปรแกรม (ชื่อ, คำอธิบาย, ระยะเวลา)
- เลือกท่าออกกำลังกายและกำหนดเซ็ต/ครั้ง
- บันทึกโปรแกรม

### 3. คลังท่าออกกำลังกาย
- ค้นหาท่าออกกำลังกายด้วยคำค้นหา
- กรองตามกลุ่มกล้ามเนื้อ
- คลิกดูรายละเอียดและวิดีโอสาธิต

### 4. ติดตามความก้าวหน้า
- บันทึกเซสชั่นออกกำลังกาย
- ดูสถิติรายสัปดาห์และรายเดือน
- แก้ไขข้อมูลส่วนตัว

### 5. คำนวณแคลอรี่
- กรอกข้อมูลส่วนตัว
- เลือกระดับกิจกรรมและเป้าหมาย
- ดูผลการคำนวณแคลอรี่และสารอาหาร


## 📊 ข้อมูลตัวอย่าง

แอปพลิเคชันมาพร้อมกับข้อมูลท่าออกกำลังกายตัวอย่าง:
- Push-ups (หน้าอก)
- Squats (ขา)
- Plank (แกนกลาง)
- Pull-ups (หลัง)
- Lunges (ขา)
- Burpees (ทั้งตัว)

## 🔧 การพัฒนาต่อ

### โครงสร้างไฟล์
```
src/
├── components/          # React Components
│   ├── Header.js
│   ├── Home.js
│   ├── WorkoutPlanner.js
│   ├── ExerciseLibrary.js
│   ├── ProgressTracker.js
│   └── CalorieCalculator.js
├── contexts/           # Context Providers
│   ├── WorkoutContext.js
│   └── ProgressContext.js
├── hooks/             # Custom Hooks
├── utils/             # Utility Functions
├── data/              # Static Data
├── App.js
├── App.css
└── index.js
```

### การเพิ่มฟีเจอร์ใหม่
1. สร้าง Component ใหม่ใน `src/components/`
2. เพิ่ม Route ใน `App.js`
3. อัปเดต Context หากจำเป็น
4. เพิ่ม Navigation link ใน `Header.js`

