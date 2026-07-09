'use client';

import { Activity, CalendarDays, CheckCircle2, Clock, Dumbbell, Flame, HeartPulse, Trophy } from 'lucide-react';
import { useMemo, useState } from 'react';

const weeks = [
  { w: 1, tue: '🏸 + Easy 5K optional', thu: 'Tempo 6K', sat: 'Long 14K', gel: 'Water only' },
  { w: 2, tue: '🏸 + Easy 6K optional', thu: 'Interval เบา', sat: 'Long 15K', gel: 'Water only' },
  { w: 3, tue: '🏸 หรือพัก', thu: 'Tempo 7K', sat: 'Long 16K', gel: 'Gel @45m' },
  { w: 4, tue: '🏸', thu: 'Easy 5K', sat: 'Long 12K Recovery', gel: 'Water only' },
  { w: 5, tue: '🏸 + Easy optional', thu: 'Tempo 6–7K', sat: 'Long 16K', gel: 'Gel @45m' },
  { w: 6, tue: '🏸', thu: 'Interval 5×800m', sat: 'Long 17K', gel: 'Gel @45m' },
  { w: 7, tue: '🏸', thu: 'Tempo 7K', sat: 'Long 18K', gel: 'Gel @45m + @90m' },
  { w: 8, tue: '🏸', thu: 'Easy 5–6K', sat: 'Long 14K Recovery', gel: 'Water only' },
  { w: 9, tue: '🏸 + Easy optional', thu: 'Tempo 7–8K', sat: 'Long 18K', gel: 'Gel @45m + @90m' },
  { w: 10, tue: '🏸', thu: 'Interval เบา', sat: 'Long 19K', gel: 'Pre + @45m + @90m' },
  { w: 11, tue: '🏸', thu: 'Tempo 8K', sat: 'Long 20K', gel: 'Pre + @45m + @90m' },
  { w: 12, tue: '🏸', thu: 'Easy 6K', sat: 'Long 16K Recovery', gel: 'Gel @45m' },
  { w: 13, tue: '🏸 + Easy optional', thu: 'Tempo 8K', sat: 'Long 20K', gel: 'Race practice' },
  { w: 14, tue: '🏸', thu: 'Tempo 6–7K', sat: 'Long 21K', gel: 'Full race practice' },
  { w: 15, tue: '🏸', thu: 'Easy 6K', sat: 'Long 18K', gel: 'Gel x2' },
  { w: 16, tue: '🏸', thu: 'Tempo 7K', sat: 'Long 20K', gel: 'Pre + @45m + @90m' },
  { w: 17, tue: '🏸', thu: 'Easy 6K', sat: 'Long 16K', gel: 'Gel @45m' },
  { w: 18, tue: '🏸', thu: 'Easy 5K', sat: 'Long 12K', gel: 'Water only' },
  { w: 19, tue: 'Shakeout 4–5K', thu: 'Rest / light badminton', sat: 'Long 8K', gel: 'Water only' },
  { w: 20, tue: 'Easy 3–4K', thu: 'Rest', sat: '🏁 RACE 21.1K', gel: 'Pre → KM6 → KM12 → KM17' },
];

const runTypes = [
  { title: 'Easy Run', color: 'var(--green)', text: 'วิ่งสบาย คุยได้เป็นประโยค ไม่หอบ ใช้สร้างฐานความอึด', target: 'HR 130–145 / Pace 8:45–9:30' },
  { title: 'Tempo', color: 'var(--gold)', text: 'เหนื่อยแบบคุมได้ พูดได้แค่คำสั้น ๆ ช่วยให้วิ่งเร็วได้นานขึ้น', target: 'HR 150–165 / Warm 1K + Tempo + Cool' },
  { title: 'Interval', color: '#ff8aa8', text: 'วิ่งเร็วเป็นช่วง ๆ แล้วพัก ใช้เพิ่มสปีด ไม่ต้องทำบ่อยเพราะมีแบดช่วยแล้ว', target: 'เช่น 5×800m พักเดิน 2 นาที' },
  { title: 'Long Run', color: 'var(--blue)', text: 'หัวใจของแผนฮาล์ฟ วิ่งช้า ยาว คุม HR และฝึกกินเจล', target: 'HR 130–145 / จบแล้วยังพอไปต่อได้' },
];

export default function Page() {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const completed = Object.values(done).filter(Boolean).length;
  const pct = Math.round((completed / weeks.length) * 100);

  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 18px 60px' }}>
      <section className="grid grid-2">
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
            <span className="badge"><Trophy size={16}/> Road to ATM 2026</span>
            <span className="badge">Apple Watch SE Gen 2</span>
            <span className="badge">Badminton Edition</span>
          </div>
          <h1 style={{ fontSize: 50, lineHeight: 1, margin: '0 0 12px' }}>Jarinya’s Half Marathon Race Book</h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.55 }}>
            เป้าหมาย: จบ 21.1K แบบแข็งแรง ประมาณ <b style={{ color: '#fff' }}>3:00–3:05</b> โดยยังตีแบด Tue / Thu / Sat ได้ตามปกติ
          </p>
          <div className="grid grid-3" style={{ marginTop: 20 }}>
            {[
              ['21.1K', 'Race distance'],
              ['3:05', 'Main goal'],
              ['Sub 3', 'Stretch goal'],
            ].map(([a,b]) => (
              <div key={a} className="card" style={{ padding: 18, borderRadius: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{a}</div>
                <div style={{ color: 'var(--muted)' }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 28 }}>
          <h2 className="section-title">Dashboard</h2>
          <p style={{ color: 'var(--muted)' }}>Training completed: {completed}/{weeks.length} weeks</p>
          <div style={{ height: 14, background: 'rgba(255,255,255,.12)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,var(--pink),var(--blue))' }} />
          </div>
          <div style={{ display: 'grid', gap: 12, marginTop: 22 }}>
            <div className="badge"><Activity size={16}/> Longest run 16.38 / 21.1 km</div>
            <div className="badge"><HeartPulse size={16}/> Long run HR avg 144 bpm</div>
            <div className="badge"><Dumbbell size={16}/> Badminton Tue / Thu / Sat</div>
            <div className="badge"><Clock size={16}/> Priority: Long Run &gt; Tempo &gt; Easy</div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 22 }} className="grid grid-2">
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title">Weekly Structure</h2>
          <table>
            <tbody>
              <tr><th>Day</th><th>Plan</th></tr>
              <tr><td>Mon</td><td>Rest / Mobility</td></tr>
              <tr><td>Tue</td><td>🏸 Badminton PM + Optional Easy 5–6K AM</td></tr>
              <tr><td>Wed</td><td>Rest</td></tr>
              <tr><td>Thu</td><td>🏸 Badminton PM + Tempo/Interval 6–8K AM</td></tr>
              <tr><td>Fri</td><td>Rest</td></tr>
              <tr><td>Sat</td><td>Long Run AM + 🏸 Badminton PM</td></tr>
              <tr><td>Sun</td><td>Rest / Walk / Stretch</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title">Race Strategy</h2>
          {[
            ['KM1–5', '8:40–8:45', 'อย่าออกเร็ว'],
            ['KM6–10', '8:30–8:40', 'คุมจังหวะ'],
            ['KM11–16', '8:25–8:35', 'นิ่งและประหยัดแรง'],
            ['Rama VIII Bridge', 'Run by effort', 'ไม่ฝืนเพซ'],
            ['KM18–21', 'ถ้ามีแรงค่อยเร่ง', 'เก็บงานเข้าเส้น'],
          ].map(([a,b,c]) => (
            <div key={a} style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:12, padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,.1)' }}>
              <b>{a}</b><span style={{ color:'var(--muted)' }}>{b} — {c}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2 className="section-title">Run Guide</h2>
        <div className="grid grid-3">
          {runTypes.map((r) => (
            <div className="card" key={r.title} style={{ padding: 22, borderLeft: `6px solid ${r.color}` }}>
              <h3 style={{ marginTop: 0 }}>{r.title}</h3>
              <p style={{ color:'var(--muted)', lineHeight: 1.55 }}>{r.text}</p>
              <b>{r.target}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ padding: 24, marginTop: 26 }}>
        <h2 className="section-title"><CalendarDays/> 20-Week Training Plan</h2>
        <table>
          <thead>
            <tr><th>Done</th><th>Week</th><th>Tue</th><th>Thu</th><th>Sat Long Run</th><th>Gel</th></tr>
          </thead>
          <tbody>
            {weeks.map((wk) => (
              <tr key={wk.w}>
                <td>
                  <button
                    onClick={() => setDone((d) => ({ ...d, [wk.w]: !d[wk.w] }))}
                    style={{
                      border: 0, borderRadius: 999, padding: '8px 10px', cursor: 'pointer',
                      background: done[wk.w] ? 'linear-gradient(90deg,var(--green),var(--blue))' : 'rgba(255,255,255,.12)',
                      color: '#fff'
                    }}
                  >
                    <CheckCircle2 size={16}/>
                  </button>
                </td>
                <td><b>Week {wk.w}</b></td>
                <td>{wk.tue}</td>
                <td>{wk.thu}</td>
                <td>{wk.sat}</td>
                <td>{wk.gel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 26 }} className="grid grid-2">
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title">Gel Plan</h2>
          <table>
            <tbody>
              <tr><th>Distance</th><th>Fuel</th></tr>
              <tr><td>≤14K</td><td>Water only</td></tr>
              <tr><td>16K</td><td>1 gel @45m</td></tr>
              <tr><td>18K</td><td>@45m + @90m</td></tr>
              <tr><td>20–21K</td><td>Pre + @45m + @90m</td></tr>
              <tr><td>Race</td><td>Pre → KM6 → KM12 → KM17 caffeine if tested</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title">Apple Watch Screen</h2>
          <div style={{ margin: '10px auto 0', width: 220, background: '#05050d', border: '10px solid #292929', borderRadius: 46, padding: 24 }}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>❤️ 142</div>
            <div style={{ fontSize: 24, marginBottom: 12 }}>🏃 8'42"</div>
            <div style={{ fontSize: 24, marginBottom: 12 }}>📏 12.3 km</div>
            <div style={{ fontSize: 24 }}>⏱ 1:45</div>
          </div>
        </div>
      </section>
    </main>
  );
}
