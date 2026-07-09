'use client';

import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  HeartPulse,
  MapPinned,
  Trophy,
  Utensils,
  Watch,
  Backpack,
  CloudSun,
  Navigation,
  Flag,
  Bot,
  Send,
} from 'lucide-react';
import { useState } from 'react';

const raceDate = new Date('2026-11-28T05:30:00+07:00');

const weeks = [
  { w: 1, mon: 'Easy Run 5 km — วิ่งสบาย คุยได้ ไม่หอบ', wed: 'Tempo Run 6 km — วอร์ม 1 km + เร็วคุมได้ 4 km + คูลดาวน์ 1 km', sat: 'Long Run 14 km', fuel: 'ดื่มน้ำอย่างเดียว ยังไม่ต้องกินเจล', note: 'เริ่ม routine ใหม่: วิ่งจันทร์/พุธ และ Long Run เสาร์' },
  { w: 2, mon: 'Easy Run 6 km — HR 130–145', wed: 'Interval เบา — วอร์ม 1 km + 4×600m + คูลดาวน์', sat: 'Long Run 15 km', fuel: 'ดื่มน้ำอย่างเดียว ถ้าร้อนมากให้พกเกลือแร่', note: 'วันพฤหัสถ้าขาล้าจาก interval ให้ตีแบดเบาลงหรือ skip ได้' },
  { w: 3, mon: 'Easy Run 5–6 km', wed: 'Tempo Run 7 km — วอร์ม 1 km + Tempo 5 km + คูลดาวน์ 1 km', sat: 'Long Run 16 km', fuel: '45 นาทีหลังเริ่มวิ่ง → กินเจล 1 ซอง แล้วดื่มน้ำตาม', note: 'เริ่มทดลองเจล ดูว่าท้องรับได้ไหม' },
  { w: 4, mon: 'Recovery Run 4–5 km หรือพัก', wed: 'Easy Run 5 km', sat: 'Long Run 12 km Recovery', fuel: 'ดื่มน้ำอย่างเดียว', note: 'Recovery week ลดโหลดเพื่อให้ร่างกายซึมซับการซ้อม' },
  { w: 5, mon: 'Easy Run 6 km', wed: 'Tempo Run 6–7 km', sat: 'Long Run 16 km', fuel: '45 นาทีหลังเริ่มวิ่ง → กินเจล 1 ซอง แล้วดื่มน้ำตาม', note: 'กลับมาเพิ่มโหลดแบบคุม HR' },
  { w: 6, mon: 'Easy Run 6 km', wed: 'Interval — 5×800m พักเดิน/จ็อก 2 นาที', sat: 'Long Run 17 km', fuel: '45 นาทีหลังเริ่มวิ่ง → กินเจล 1 ซอง แล้วดื่มน้ำตาม', note: 'ถ้าพฤหัสจะตีแบด ให้ฟังขาเป็นหลัก' },
  { w: 7, mon: 'Easy Run 6–7 km', wed: 'Tempo Run 7 km', sat: 'Long Run 18 km', fuel: '45 นาที → เจล 1 ซอง + น้ำ / 90 นาที → เจลอีก 1 ซอง + น้ำ', note: 'วันนี้ฝึกกินเจล 2 ครั้งครั้งแรก อย่าเร่งท้าย' },
  { w: 8, mon: 'Recovery Run 5 km หรือพัก', wed: 'Easy Run 5–6 km', sat: 'Long Run 14 km Recovery', fuel: 'ดื่มน้ำอย่างเดียว', note: 'สัปดาห์พัก ไม่ต้องรู้สึกผิด' },
  { w: 9, mon: 'Easy Run 6–7 km', wed: 'Tempo Run 7–8 km', sat: 'Long Run 18 km', fuel: '45 นาที → เจล 1 ซอง / 90 นาที → เจลอีก 1 ซอง', note: 'เริ่มซ้อมให้เหมือนสนามจริงมากขึ้น' },
  { w: 10, mon: 'Easy Run 7 km', wed: 'Interval เบา — 4×1 km พัก 2–3 นาที', sat: 'Long Run 19 km', fuel: '20 นาทีก่อนวิ่ง → เจล 1 ซอง + น้ำ / 45 นาที → เจล / 90 นาที → เจล', note: 'ทดลองกินเจลก่อนออกวิ่ง' },
  { w: 11, mon: 'Easy Run 7 km', wed: 'Tempo Run 8 km', sat: 'Long Run 20 km', fuel: '20 นาทีก่อนวิ่ง → เจล 1 ซอง / 45 นาที → เจล / 90 นาที → เจล', note: 'Long Run สำคัญมาก คุม HR ให้จบแบบยังเหลือแรง' },
  { w: 12, mon: 'Recovery Run 5 km หรือพัก', wed: 'Easy Run 6 km', sat: 'Long Run 16 km Recovery', fuel: '45 นาทีหลังเริ่มวิ่ง → กินเจล 1 ซอง แล้วดื่มน้ำตาม', note: 'ลดระยะเพื่อฟื้นตัวก่อนเข้าเดือน peak' },
  { w: 13, mon: 'Easy Run 7 km', wed: 'Tempo Run 8 km', sat: 'Long Run 20 km', fuel: 'ซ้อมเหมือนวันแข่ง: ก่อนวิ่ง 20 นาที + 45 นาที + 90 นาที', note: 'เช็กเสื้อ รองเท้า เจล และ Apple Watch setup' },
  { w: 14, mon: 'Easy Run 6 km', wed: 'Tempo Run 6–7 km', sat: 'Long Run 21 km', fuel: 'ซ้อมแผนวันแข่งเต็มรูปแบบ: ก่อนวิ่ง + 45 นาที + 90 นาที + ถ้าจำเป็น 135 นาที', note: 'ซ้อมระยะฮาล์ฟ 1 ครั้งแบบไม่แข่ง ไม่ต้องเร็ว' },
  { w: 15, mon: 'Easy Run 6 km', wed: 'Easy + Strides 5–6 km', sat: 'Long Run 18 km', fuel: '45 นาที → เจล / 90 นาที → เจล', note: 'ลดความหนักหลังแตะ 21 km' },
  { w: 16, mon: 'Easy Run 7 km', wed: 'Tempo Run 7 km', sat: 'Long Run 20 km', fuel: 'ก่อนวิ่ง 20 นาที → เจล / 45 นาที → เจล / 90 นาที → เจล', note: 'Long Run ใหญ่ครั้งสุดท้ายก่อน taper' },
  { w: 17, mon: 'Easy Run 6 km', wed: 'Tempo เบา 5–6 km', sat: 'Long Run 16 km', fuel: '45 นาทีหลังเริ่มวิ่ง → เจล 1 ซอง แล้วดื่มน้ำตาม', note: 'เริ่มลดโหลด แต่ยังรักษาความคม' },
  { w: 18, mon: 'Easy Run 5 km', wed: 'Easy Run 5 km', sat: 'Long Run 12 km', fuel: 'ดื่มน้ำอย่างเดียว', note: 'นอนให้พอ เริ่มเช็กอุปกรณ์' },
  { w: 19, mon: 'Easy Run 4–5 km', wed: 'Shakeout 3–4 km — วิ่งเบามาก', sat: 'Long Run 8 km', fuel: 'ดื่มน้ำอย่างเดียว', note: 'Taper จริงจัง ห้ามซ้อมชดเชย' },
  { w: 20, mon: 'Easy Run 3–4 km', wed: 'พัก / เดินเบา ๆ', sat: '🏁 RACE 21.1 km', fuel: 'ก่อน Start → KM6 → KM12 → KM17 เจลคาเฟอีนถ้าเคยลองแล้ว', note: 'เชื่อใจการซ้อม ออกตัวช้า แล้วจบสวย' },
];

const runTypes = [
  { title: 'Easy Run', color: 'var(--green)', text: 'วิ่งสบาย คุยได้เป็นประโยค ไม่หอบ ใช้สร้างฐานความอึดและช่วยฟื้นตัว', target: 'HR 130–145 bpm / Pace ประมาณ 8:45–9:30/km', how: 'ไม่ต้องเร่ง ดูหัวใจมากกว่าเพซ ถ้าหอบคือเร็วเกิน' },
  { title: 'Tempo Run', color: 'var(--gold)', text: 'วิ่งเหนื่อยแบบคุมได้ พูดได้แค่คำสั้น ๆ ช่วยให้วิ่งเร็วได้นานขึ้น', target: 'HR 150–165 bpm', how: 'ตัวอย่าง: วอร์ม 1 km → Tempo 4–6 km → คูลดาวน์ 1 km' },
  { title: 'Interval', color: '#ff8aa8', text: 'วิ่งเร็วเป็นช่วง ๆ แล้วพัก ใช้เพิ่มสปีดและความทนต่อความเหนื่อย', target: 'RPE 8/10', how: 'ทำไม่บ่อย เพราะแบดช่วยเรื่องสปีดและ agility อยู่แล้ว' },
  { title: 'Long Run', color: 'var(--blue)', text: 'หัวใจของแผนฮาล์ฟ วิ่งช้า ยาว คุม HR และฝึกกินเจล', target: 'HR 130–145 bpm', how: 'จบแล้วควรรู้สึกว่ายังพอไปต่อได้อีก 1–2 km' },
];

const raceSegments = [
  ['KM1–5', '8:40–8:45/km', 'อย่าออกเร็ว คนเยอะ ให้ใช้เป็นช่วงวอร์มเข้าจังหวะ'],
  ['KM6–10', '8:30–8:40/km', 'เริ่มคุมจังหวะ กินเจลช่วง KM6 แล้วดื่มน้ำตาม'],
  ['KM11–16', '8:25–8:35/km', 'ช่วงทำเวลาแบบนิ่ง ๆ ประหยัดแรง'],
  ['Rama VIII Bridge', 'Run by effort', 'ไม่ฝืนเพซ ขึ้นสะพานช้าลงได้ ลงสะพานค่อยเก็บ'],
  ['KM18–21.1', 'ถ้ามีแรงค่อยเร่ง', 'โฟกัสฟอร์ม หายใจ และเข้าเส้นแบบแข็งแรง'],
];

const waterStations = ['KM2', 'KM4', 'KM6', 'KM8', 'KM10', 'KM12.2', 'KM14', 'KM16.5', 'KM18.7', 'KM20.3', 'Finish'];

function daysLeft() {
  const now = new Date();
  const diff = raceDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

type CoachResult = {
  workoutTypeDetected?: string;
  status?: string;
  summary?: string;
  whatWentWell?: string[];
  watchOut?: string[];
  nextWorkoutSuggestion?: string;
  badmintonAdvice?: string;
  fuelAdvice?: string;
  coachNote?: string;
  error?: string;
};

export default function Page() {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [coachResult, setCoachResult] = useState<CoachResult | null>(null);
  const [loadingCoach, setLoadingCoach] = useState(false);
  const [form, setForm] = useState({
    workoutType: 'Long Run',
    distanceKm: '16.38',
    duration: '2:23:47',
    avgPace: '8:47',
    avgHr: '144',
    cadence: '',
    elevation: '',
    gelTaken: 'กินเจล 1 ซองประมาณนาทีที่ 45',
    feeling: 'รู้สึกโอเค มีสะพานชัน',
    pain: 'ไม่มี',
    notes: '',
  });

  const completed = Object.values(done).filter(Boolean).length;
  const pct = Math.round((completed / weeks.length) * 100);
  const remaining = daysLeft();

  async function analyzeRun() {
    setLoadingCoach(true);
    setCoachResult(null);

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setCoachResult(data);
    } catch (error: any) {
      setCoachResult({ error: error?.message || 'Analyze failed' });
    } finally {
      setLoadingCoach(false);
    }
  }

  return (
    <main style={{ maxWidth: 1220, margin: '0 auto', padding: '28px 18px 70px' }}>
      <section className="grid grid-2">
        <div className="card hero-card">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
            <span className="badge"><Trophy size={16}/> Road to ATM 2026</span>
            <span className="badge">Gemini AI Coach</span>
            <span className="badge">Apple Watch SE Gen 2</span>
            <span className="badge">Badminton Edition</span>
          </div>
          <h1>Jarinya’s Half Marathon Race Center</h1>
          <p className="lead">
            เว็บซ้อมวิ่ง 21.1K ที่ปรับตามชีวิตจริง: วิ่งจันทร์/พุธ, แบดอังคาร/พฤหัส และ Long Run วันเสาร์
          </p>
          <div className="grid grid-4 stat-grid">
            {[
              ['21.1K', 'Race distance'],
              ['3:05', 'Main goal'],
              ['Sub 3', 'Stretch goal'],
              ['16.38K', 'Current longest'],
            ].map(([a,b]) => (
              <div key={a} className="mini-card">
                <div className="big">{a}</div>
                <div className="muted">{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 28 }}>
          <h2 className="section-title">Dashboard</h2>
          <div className="countdown">
            <Flag size={26}/>
            <div>
              <div className="big">{remaining} days</div>
              <div className="muted">ถึงวันแข่ง 28 Nov 2026</div>
            </div>
          </div>
          <p className="muted">Training completed: {completed}/{weeks.length} weeks</p>
          <div className="progress"><div style={{ width: `${pct}%` }} /></div>
          <div className="quick-list">
            <div className="badge"><Activity size={16}/> Long Run &gt; Tempo &gt; Easy</div>
            <div className="badge"><HeartPulse size={16}/> Long run HR target 130–145</div>
            <div className="badge"><Dumbbell size={16}/> Badminton Tue / Thu optional priority</div>
            <div className="badge"><Bot size={16}/> Gemini analyzes each workout</div>
          </div>
        </div>
      </section>

      <section className="card coach-card">
        <div>
          <h2 className="section-title"><Bot/> AI Coach — ส่งผลซ้อมให้ Gemini วิเคราะห์</h2>
          <p className="muted">Phase 1: กรอกข้อมูลจาก Apple Fitness / Strava แล้วกด Analyze Run. Phase ถัดไปค่อยเพิ่มอัปโหลด screenshot.</p>
          <div className="coach-form">
            {[
              ['workoutType', 'ประเภทการซ้อม เช่น Easy / Tempo / Long Run'],
              ['distanceKm', 'ระยะ (km)'],
              ['duration', 'เวลา เช่น 2:23:47'],
              ['avgPace', 'เพซเฉลี่ย เช่น 8:47'],
              ['avgHr', 'HR เฉลี่ย'],
              ['cadence', 'Cadence ถ้ามี'],
              ['elevation', 'Elevation ถ้ามี'],
              ['gelTaken', 'กินเจล/น้ำยังไง'],
              ['feeling', 'ความรู้สึกระหว่างวิ่ง'],
              ['pain', 'เจ็บตรงไหนไหม'],
              ['notes', 'โน้ตอื่น ๆ'],
            ].map(([key, label]) => (
              <label key={key}>
                <span>{label}</span>
                {key === 'feeling' || key === 'notes' ? (
                  <textarea value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                ) : (
                  <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                )}
              </label>
            ))}
          </div>
          <button className="primary-btn" onClick={analyzeRun} disabled={loadingCoach}>
            <Send size={16}/> {loadingCoach ? 'กำลังวิเคราะห์...' : 'Analyze Run'}
          </button>
        </div>

        <div className="coach-result">
          <h3>Coach Summary</h3>
          {!coachResult && <p className="muted">ผลวิเคราะห์จะแสดงตรงนี้หลังจากกด Analyze Run</p>}
          {coachResult?.error && <p className="error">{coachResult.error}</p>}
          {coachResult && !coachResult.error && (
            <>
              <div className={`status-pill ${coachResult.status || 'okay'}`}>{coachResult.status || 'okay'} · {coachResult.workoutTypeDetected}</div>
              <p>{coachResult.summary}</p>
              <b>ทำได้ดี</b>
              <ul>{coachResult.whatWentWell?.map((x, i) => <li key={i}>{x}</li>)}</ul>
              <b>ระวัง</b>
              <ul>{coachResult.watchOut?.map((x, i) => <li key={i}>{x}</li>)}</ul>
              <p><b>ซ้อมครั้งถัดไป:</b> {coachResult.nextWorkoutSuggestion}</p>
              <p><b>แบด:</b> {coachResult.badmintonAdvice}</p>
              <p><b>น้ำ/เจล:</b> {coachResult.fuelAdvice}</p>
              <p className="coach-note">{coachResult.coachNote}</p>
            </>
          )}
        </div>
      </section>

      <section className="card race-info">
        <div>
          <h2 className="section-title"><MapPinned/> Race Information</h2>
          <table><tbody>
            <tr><th>ชื่องาน</th><td>Amazing Thailand Marathon Bangkok 2026</td></tr>
            <tr><th>ระยะ</th><td>Half Marathon 21.1 km</td></tr>
            <tr><th>วันที่</th><td>28 พฤศจิกายน 2026</td></tr>
            <tr><th>เวลา Start</th><td>ใส่ค่าไว้เป็นประมาณการก่อน — อัปเดตตามประกาศทางการเมื่อใกล้วันแข่ง</td></tr>
            <tr><th>Start / Finish</th><td>MBK Center</td></tr>
            <tr><th>เป้าหมาย</th><td>A: Sub 3:00 / B: 3:05 / C: Finish Strong</td></tr>
          </tbody></table>
        </div>
        <div className="course-card">
          <h3>Course Difficulty</h3>
          <div className="difficulty">⭐⭐☆☆☆</div>
          <p className="muted">เส้นทางส่วนใหญ่ค่อนข้างราบ จุดที่ต้องระวังคือช่วงสะพานพระราม 8 ประมาณท้ายสนาม ให้คุมแรงมากกว่าฝืนคุมเพซ</p>
          <div className="badge"><Navigation size={16}/> Water stations: {waterStations.length}</div>
        </div>
      </section>

      <section className="card" style={{ padding: 24, marginTop: 26 }}>
        <h2 className="section-title">Course Timeline & Water Stations</h2>
        <div className="course-timeline">
          <div className="node start">START<br/><small>MBK</small></div>
          {waterStations.slice(0, -1).map((w) => <div className="node" key={w}>💧<br/><small>{w}</small></div>)}
          <div className="node bridge">🌉<br/><small>Rama VIII</small></div>
          <div className="node finish">FINISH<br/><small>21.1K</small></div>
        </div>
      </section>

      <section style={{ marginTop: 22 }} className="grid grid-2">
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title">Weekly Structure</h2>
          <table><tbody>
            <tr><th>Day</th><th>Plan</th><th>Note</th></tr>
            <tr><td>Mon</td><td>🏃 Easy / Tempo</td><td>วันวิ่งหลัก</td></tr>
            <tr><td>Tue</td><td>🏸 Badminton</td><td>ถ้าวิ่งจันทร์ล้ามาก skip ได้</td></tr>
            <tr><td>Wed</td><td>🏃 Easy / Tempo / Interval</td><td>วันวิ่งหลัก</td></tr>
            <tr><td>Thu</td><td>🏸 Badminton</td><td>ถ้าวิ่งพุธหนัก ให้ตีเบาหรือพัก</td></tr>
            <tr><td>Fri</td><td>😴 Rest</td><td>พักเต็มเพื่อ Long Run</td></tr>
            <tr><td>Sat</td><td>🔵 Long Run</td><td>หัวใจของแผน / แบดเสาร์ optional</td></tr>
            <tr><td>Sun</td><td>🚶 Recovery</td><td>เดินเบา ๆ / ยืด / นวด</td></tr>
          </tbody></table>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title">Race Strategy</h2>
          {raceSegments.map(([a,b,c]) => <div key={a} className="segment"><b>{a}</b><span>{b} — {c}</span></div>)}
        </div>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2 className="section-title">Run Guide — เปิดแล้วเข้าใจทันที</h2>
        <div className="grid grid-4">
          {runTypes.map((r) => (
            <div className="card run-card" key={r.title} style={{ borderLeft: `6px solid ${r.color}` }}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <b>{r.target}</b>
              <p className="muted">{r.how}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ padding: 24, marginTop: 26 }}>
        <h2 className="section-title"><CalendarDays/> 20-Week Training Plan</h2>
        <p className="muted">ตารางนี้ปรับเป็นวิ่งวันจันทร์ / พุธ และ Long Run วันเสาร์ ส่วนแบดอังคาร / พฤหัส เป็น cross-training ที่ skip ได้ถ้าล้า</p>
        <table className="training-table">
          <thead><tr><th>Done</th><th>Week</th><th>Monday</th><th>Wednesday</th><th>Saturday Long Run</th><th>Fuel Plan แบบภาษาคน</th><th>Coach Note</th></tr></thead>
          <tbody>{weeks.map((wk) => (
            <tr key={wk.w}>
              <td><button onClick={() => setDone((d) => ({ ...d, [wk.w]: !d[wk.w] }))} className={done[wk.w] ? 'done-btn active' : 'done-btn'}><CheckCircle2 size={16}/></button></td>
              <td><b>Week {wk.w}</b></td><td>{wk.mon}</td><td>{wk.wed}</td><td>{wk.sat}</td><td>{wk.fuel}</td><td>{wk.note}</td>
            </tr>
          ))}</tbody>
        </table>
      </section>

      <section style={{ marginTop: 26 }} className="grid grid-2">
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title"><Utensils/> Fuel & Gel Guide</h2>
          <table><tbody>
            <tr><th>ระยะซ้อม</th><th>ต้องกินยังไง</th></tr>
            <tr><td>ไม่เกิน 14 km</td><td>ดื่มน้ำอย่างเดียว ไม่ต้องกินเจล</td></tr>
            <tr><td>16 km</td><td>45 นาทีหลังเริ่มวิ่ง → กินเจล 1 ซอง แล้วดื่มน้ำตาม</td></tr>
            <tr><td>18 km</td><td>45 นาที → เจล 1 ซอง + น้ำ / 90 นาที → เจลอีก 1 ซอง + น้ำ</td></tr>
            <tr><td>20–21 km</td><td>20 นาทีก่อนวิ่ง → เจล 1 ซอง + น้ำ / 45 นาที → เจล / 90 นาที → เจล</td></tr>
            <tr><td>Race Day</td><td>ก่อน Start → KM6 → KM12 → KM17 ใช้เจลคาเฟอีนได้เฉพาะถ้าเคยลองแล้วไม่ใจสั่น</td></tr>
          </tbody></table>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title"><Watch/> Apple Watch Screen</h2>
          <div className="watch-mock"><div>❤️ 142</div><div>🏃 8'42"</div><div>📏 12.3 km</div><div>⏱ 1:45</div></div>
          <p className="muted">Long Run ดูแค่ Distance / Elapsed Time / Heart Rate / Average Pace ก็พอ ไม่ต้องจ้อง current pace ตลอด</p>
        </div>
      </section>

      <section style={{ marginTop: 26 }} className="grid grid-3">
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title"><Backpack/> Race Kit</h2>
          <ul className="checklist"><li>☐ Bib + safety pins</li><li>☐ รองเท้า + ถุงเท้าที่ซ้อมแล้ว</li><li>☐ Apple Watch + ชาร์จเต็ม</li><li>☐ เจล 4 ซอง</li><li>☐ หมวก / กันแดด</li><li>☐ เสื้อผ้าเปลี่ยนหลังแข่ง</li></ul>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title"><CloudSun/> Weather Watch</h2>
          <p className="muted">ก่อนแข่ง 7 วัน ให้เช็กอุณหภูมิ ความชื้น โอกาสฝน และเวลาพระอาทิตย์ขึ้น เพื่อปรับน้ำและ pace</p>
          <div className="badge">Phase 2: ดึง weather API</div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title"><Clock/> Race Day Timeline</h2>
          <ul className="checklist"><li>04:30 ตื่น</li><li>05:00 อาหารเช้า</li><li>ก่อน Start 20 นาที กินเจล + น้ำ</li><li>KM6 เจล 1 ซอง</li><li>KM12 เจล 1 ซอง</li><li>KM17 เจลคาเฟอีนถ้าเคยลอง</li></ul>
        </div>
      </section>
    </main>
  );
}
