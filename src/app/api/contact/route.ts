import { z } from 'zod'
import { sendEmail } from '@/lib/utils/resend'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional().default(''),
  message: z.string().min(10).max(5000),
  sessionId: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, subject, message } = parsed.data

    await sendEmail({
      from: 'portfolio@spacedrift.dev',
      to: 'hello@spacedrift.dev',
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    })

    return Response.json({ sent: true })
  } catch {
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
