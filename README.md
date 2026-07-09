# 🏃‍♀️ Road to ATM 2026

**Half Marathon Training Dashboard & Race Book**  
เว็บแอปส่วนตัวสำหรับเตรียมตัววิ่ง **Amazing Thailand Marathon Bangkok 2026 — 21.1K**

ออกแบบสำหรับ:
- เป้าหมายหลัก: **Finish ประมาณ 3:00–3:05**
- Stretch Goal: **Sub 3**
- ใช้ **Apple Watch SE Gen 2**
- ตารางชีวิตจริงที่มีแบดมินตัน **อังคาร / พฤหัส / เสาร์**
- เน้นซ้อมแบบยืดหยุ่น ไม่ต้องวิ่งทุกวัน

---

## ✨ Features

- 🏠 **Dashboard** สรุปเป้าหมาย, longest run, progress และ training completion
- 📅 **20-Week Training Plan** พร้อม checkbox รายสัปดาห์
- 🏃 **Run Guide** อธิบาย Easy / Tempo / Interval / Long Run
- ❤️ **Heart Rate Guide** สำหรับ Apple Watch SE Gen 2
- 🥤 **Gel & Hydration Plan** สำหรับ Long Run และ Race Day
- 🗺️ **Race Strategy** แบ่งเพซตามช่วงสนาม 21K
- 🏸 **Badminton-Friendly Schedule** ปรับให้เข้ากับวันตีแบด
- 📱 **Apple Watch Screen Mockup** บอกว่าควรดูค่าอะไรตอนวิ่ง
- 🌌 **ATM-inspired Theme** โทนม่วง / น้ำเงิน / ชมพู แบบ glassmorphism

---

## 🧱 Tech Stack

- **Next.js 14**
- **React 18**
- **TypeScript**
- **CSS / Glassmorphism UI**
- **Lucide React Icons**
- Deploy target: **Railway**

> ตอนนี้เป็น Prototype แบบ Frontend-only และเก็บสถานะ checkbox ด้วย React state ชั่วคราว  
> Phase ถัดไปค่อยเพิ่ม localStorage / database / auth ได้

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

เปิดเว็บที่:

```text
http://localhost:3000
```

### 3. Build production

```bash
npm run build
```

### 4. Start production server

```bash
npm run start
```

---

## 🚂 Deploy on Railway

### วิธี Deploy ผ่าน GitHub

1. สร้าง repository ใหม่ใน GitHub
2. Push โปรเจกต์นี้ขึ้น GitHub
3. เข้า Railway
4. กด **New Project**
5. เลือก **Deploy from GitHub repo**
6. เลือก repository นี้
7. Railway จะ detect เป็น Next.js project

### Build / Start Command

ถ้า Railway ไม่ตั้งให้อัตโนมัติ ให้ตั้งเองแบบนี้:

```bash
Build Command: npm run build
Start Command: npm run start
```

### Environment Variables

ตอนนี้ยังไม่ต้องตั้งค่า env ใด ๆ

---

## 📁 Folder Structure

```text
atm-half-marathon-webapp/
├── app/
│   ├── globals.css        # Global theme & UI style
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard page
├── package.json
├── next.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🏃 Training Plan Logic

ตารางซ้อมออกแบบจากหลักนี้:

### Weekly Priority

1. **Long Run** — สำคัญที่สุดสำหรับ 21K
2. **Tempo / Quality Run** — เพิ่มความสามารถในการคุมเพซ
3. **Easy Run** — optional ถ้ามีเวลาและไม่ล้า

### Weekly Structure

| Day | Plan |
|---|---|
| Monday | Rest / Mobility |
| Tuesday | Badminton PM + Optional Easy Run AM |
| Wednesday | Rest |
| Thursday | Badminton PM + Tempo/Interval AM |
| Friday | Rest |
| Saturday | Long Run AM + Badminton PM |
| Sunday | Rest / Walk / Stretch |

---

## 🏃 Run Type Guide

### Easy Run

วิ่งสบาย คุยได้เป็นประโยค ไม่หอบ  
ใช้สร้างฐานความอึดและฟื้นตัว

```text
HR: 130–145 bpm
Pace: ~8:45–9:30/km
RPE: 3–4/10
```

### Tempo Run

เหนื่อยแบบคุมได้ พูดได้แค่คำสั้น ๆ  
ช่วยให้วิ่งเร็วได้นานขึ้น

```text
HR: 150–165 bpm
Example: Warm 1K + Tempo 5K + Cool 1K
RPE: 7/10
```

### Interval

วิ่งเร็วเป็นช่วง ๆ แล้วพัก  
ไม่ต้องทำบ่อย เพราะแบดช่วยเรื่องสปีดและ agility แล้ว

```text
Example: 5 × 800m
Recovery: Walk/Jog 2 min
RPE: 8/10
```

### Long Run

หัวใจหลักของแผนฮาล์ฟ  
วิ่งช้า ยาว คุม HR และฝึกกินเจล

```text
HR: 130–145 bpm
Goal: วิ่งจบแล้วยังรู้สึกว่าพอไปต่อได้อีก 1–2K
```

---

## 🥤 Gel Plan

| Distance | Gel Plan |
|---|---|
| ≤14K | Water only |
| 16K | 1 gel @45 min |
| 18K | Gel @45 + @90 min |
| 20–21K | Gel before start + @45 + @90 |
| Race Day | Before start → KM6 → KM12 → KM17 |

> คาเฟอีนเจลให้ใช้เฉพาะวันที่เคยทดลองในซ้อมแล้วไม่ใจสั่น / ไม่ปวดท้อง

---

## 🗺 Race Strategy

| Segment | Target | Note |
|---|---|---|
| KM1–5 | 8:40–8:45/km | อย่าออกตัวเร็ว |
| KM6–10 | 8:30–8:40/km | เริ่มคุมจังหวะ |
| KM11–16 | 8:25–8:35/km | นิ่ง ประหยัดแรง |
| Rama VIII Bridge | Run by effort | ไม่ฝืนเพซ |
| KM18–21 | Push if good | ถ้ายังมีแรงค่อยเร่ง |

---

## 📱 Apple Watch SE Gen 2

ค่าที่ควรดูระหว่างวิ่ง:

### Easy Run

```text
Heart Rate
Average Pace
Distance
Time
```

### Tempo

```text
Lap Pace
Heart Rate
Distance
Time
```

### Long Run

```text
Distance
Elapsed Time
Heart Rate
Average Pace
```

---

## 🧭 Roadmap

### Phase 1 — Current Prototype

- [x] Dashboard
- [x] Training Plan 20 weeks
- [x] Run Guide
- [x] Gel Plan
- [x] Race Strategy
- [x] ATM-inspired theme

### Phase 2 — Usability

- [ ] Save checkbox status with localStorage
- [ ] Add Running Log form
- [ ] Add weekly distance chart
- [ ] Add countdown to race day
- [ ] Add mobile bottom navigation

### Phase 3 — Data & Dashboard

- [ ] Add Recharts dashboard
- [ ] Add longest run progression
- [ ] Add HR trend
- [ ] Add pace trend
- [ ] Add badminton log
- [ ] Add shoe mileage

### Phase 4 — Advanced

- [ ] GPX / TCX import
- [ ] Strava API integration
- [ ] Apple Health export import
- [ ] AI Coach summary
- [ ] PWA offline mode
- [ ] Supabase database

---

## 🛠 Suggested Future Structure

ถ้าจะขยายเป็น production app:

```text
src/
├── app/
│   ├── dashboard/
│   ├── training/
│   ├── race/
│   ├── nutrition/
│   ├── progress/
│   └── settings/
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── training/
│   ├── race/
│   └── watch/
├── data/
├── hooks/
├── lib/
├── types/
└── utils/
```

---

## 📝 Notes

ข้อมูลในแอปนี้เป็นข้อมูลซ้อมส่วนตัว ปรับจากสถิติการวิ่งและตารางชีวิตจริง  
ไม่ใช่คำแนะนำทางการแพทย์ หากมีอาการเจ็บ เจ็บแปลบ แน่นหน้าอก เวียนหัว หรืออาการผิดปกติ ควรหยุดซ้อมและปรึกษาผู้เชี่ยวชาญ

---

## 👤 Owner

**Jarinya Vadrugchit**  
Road to ATM Half Marathon 2026

---

## 💜 Motto

> Long run first.  
> Easy means easy.  
> Race day is earned.


---

## Latest Update

### Updated Training Schedule

The schedule now follows the user's preferred routine:

| Day | Plan |
|---|---|
| Monday | Run workout |
| Tuesday | Badminton |
| Wednesday | Run workout |
| Thursday | Badminton |
| Friday | Rest |
| Saturday | Long Run |
| Sunday | Recovery |

### Added Race Center

New sections added:

- Race Information
- Course Timeline
- Water Stations
- Course Difficulty
- Race Strategy
- Race Kit Checklist
- Race Day Timeline
- Clear gel instructions in plain language

### Clear Fuel Language

Old short labels like `Gel @45m` or `Pre + @45m + @90m` have been replaced with clear instructions, such as:

> 45 นาทีหลังเริ่มวิ่ง → กินเจล 1 ซอง แล้วดื่มน้ำตาม



---

## Gemini AI Coach

This version includes a Gemini-powered AI Coach API route.

### Environment Variable

Create `.env.local` locally:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Do **not** commit `.env.local` to GitHub.

For Railway, add the same key in:

```text
Project → Variables → GEMINI_API_KEY
```

### API Route

```text
POST /api/coach
```

Payload example:

```json
{
  "workoutType": "Long Run",
  "distanceKm": "16.38",
  "duration": "2:23:47",
  "avgPace": "8:47",
  "avgHr": "144",
  "gelTaken": "กินเจล 1 ซองประมาณนาทีที่ 45",
  "feeling": "รู้สึกโอเค มีสะพานชัน",
  "pain": "ไม่มี"
}
```

The API returns structured coach feedback in Thai.

### Security Note

Never hardcode your API key in source code. Use environment variables only.

