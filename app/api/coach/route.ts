import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing GEMINI_API_KEY. Please set it in .env.local or Railway Variables.' },
        { status: 500 }
      );
    }

    const body = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json',
      },
    });

    const prompt = `
คุณคือ AI Running Coach ส่วนตัวของน้ำ กำลังซ้อม Half Marathon 21.1K งาน Amazing Thailand Marathon Bangkok 2026

บริบทของนักวิ่ง:
- เป้าหมายหลัก: จบประมาณ 3:00-3:05
- Stretch goal: Sub 3
- Long run ล่าสุดที่เคยทำได้: 16.38 km, HR เฉลี่ยประมาณ 144 bpm
- ใช้ Apple Watch SE Gen 2
- ตารางปกติ: วิ่งวันจันทร์/พุธ, แบดวันอังคาร/พฤหัส, Long Run วันเสาร์
- ถ้าวิ่งเหนื่อย สามารถ skip แบดได้
- Easy/Long target HR: 130-145 bpm
- Tempo target HR: 150-165 bpm
- ต้องตอบเป็นภาษาไทย อ่านง่าย เหมือนโค้ชใจดี ไม่กดดัน

ข้อมูลผลซ้อมที่ผู้ใช้กรอก:
${JSON.stringify(body, null, 2)}

ให้วิเคราะห์ผลซ้อมและตอบกลับเป็น JSON เท่านั้น ตาม schema นี้:
{
  "workoutTypeDetected": "Easy | Tempo | Interval | Long Run | Recovery | Unknown",
  "status": "good | okay | caution",
  "summary": "สรุปสั้น ๆ 1-2 ประโยค",
  "whatWentWell": ["ข้อดี 1", "ข้อดี 2"],
  "watchOut": ["สิ่งที่ต้องระวัง"],
  "nextWorkoutSuggestion": "ควรซ้อมครั้งถัดไปอย่างไร",
  "badmintonAdvice": "ควรตีแบดต่อได้ไหม หรือควรลด/skip",
  "fuelAdvice": "คำแนะนำเรื่องน้ำ/เจล/อาหาร",
  "coachNote": "ข้อความให้กำลังใจแบบเป็นกันเอง"
}

กติกา:
- ถ้า HR เฉลี่ยเกินเป้าหมายของประเภทซ้อม ให้เตือนแบบสุภาพ
- ถ้าเป็น Long Run และระยะ >= 16 km พร้อม HR 130-145 ให้บอกว่าฐานดี
- ถ้ามีอาการเจ็บ เจ็บแปลบ เวียนหัว แน่นหน้าอก ให้แนะนำหยุดพักและพิจารณาพบแพทย์
- อย่าบอกให้ฝืนซ้อมหนักถ้ามีความล้า
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        workoutTypeDetected: 'Unknown',
        status: 'okay',
        summary: text,
        whatWentWell: [],
        watchOut: ['AI ตอบกลับไม่เป็น JSON แต่ยังแสดงผลสรุปได้'],
        nextWorkoutSuggestion: 'ลองตรวจข้อมูลที่กรอก แล้ววิเคราะห์ใหม่อีกครั้ง',
        badmintonAdvice: 'ถ้าล้ามาก ให้ลดความหนักของแบด',
        fuelAdvice: 'ดื่มน้ำและฟื้นตัวให้เพียงพอ',
        coachNote: 'ข้อมูลยังพอใช้วิเคราะห์ได้ แต่ควรปรับ prompt หรือ response format เพิ่ม',
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Unexpected error while analyzing run.' },
      { status: 500 }
    );
  }
}
