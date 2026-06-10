import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { prompt, service } = await req.json()

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: `Wewe ni ${service} wa CTRLALTMOHA. Jibu kwa Kiswahili, uwe msaada.` },
        { role: 'user', content: prompt }
      ],
    }),
  })

  const data = await res.json()
  return NextResponse.json({ reply: data.choices[0].message.content })
}
