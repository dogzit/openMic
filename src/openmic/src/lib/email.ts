import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM ?? "noreply@openmic.mn";

export interface RegistrationData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  perfType: string;
  timeSlot: string;
  note?: string;
}

const PERF_LABELS: Record<string, string> = {
  music:   "🎸 Хөгжим",
  poetry:  "✍️ Яруу найраг",
  comedy:  "🎤 Стенд-ап",
  dance:   "💃 Бүжиг",
  art:     "🎭 Дуран / Жүжиг",
  other:   "✨ Бусад",
};

export async function sendConfirmationEmail(data: RegistrationData) {
  const perfLabel = PERF_LABELS[data.perfType] ?? data.perfType;
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");

  const html = `
<!DOCTYPE html>
<html lang="mn">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Open Mic — Бүртгэл баталгаажлаа</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#e8ff47,#ff4d6d);height:3px;border-radius:4px 4px 0 0;"></td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#111111;border:1px solid rgba(255,255,255,0.07);border-top:none;border-radius:0 0 8px 8px;padding:40px 40px 32px;">

              <!-- Logo -->
              <p style="margin:0 0 32px;font-size:13px;letter-spacing:0.2em;color:#e8ff47;text-transform:uppercase;font-weight:700;">
                OPEN<span style="color:#f0ede6;">MIC</span>
              </p>

              <!-- Title -->
              <h1 style="margin:0 0 8px;font-size:36px;font-weight:800;color:#f0ede6;line-height:1.1;letter-spacing:-0.5px;">
                Тайзанд угтъя,<br/>${fullName}!
              </h1>
              <p style="margin:0 0 32px;font-size:14px;color:rgba(240,237,230,0.45);line-height:1.7;">
                Таны бүртгэл амжилттай баталгаажлаа. Доорх мэдээллийг хадгалаарай.
              </p>

              <!-- Info box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(232,255,71,0.05);border:1px solid rgba(232,255,71,0.15);border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                          <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,230,0.35);">Огноо</span><br/>
                          <span style="font-size:15px;color:#f0ede6;font-weight:600;">2025 оны 6 дугаар сарын 14</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                          <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,230,0.35);">Цаг</span><br/>
                          <span style="font-size:22px;color:#e8ff47;font-weight:800;letter-spacing:0.05em;">${data.timeSlot}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                          <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,230,0.35);">Тоглолтын төрөл</span><br/>
                          <span style="font-size:15px;color:#f0ede6;">${perfLabel}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                          <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,230,0.35);">Утас</span><br/>
                          <span style="font-size:15px;color:#f0ede6;">${data.phone}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(240,237,230,0.35);">Байршил</span><br/>
                          <span style="font-size:15px;color:#f0ede6;">The Factory, Сүхбаатар дүүрэг</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Note about rules -->
              <p style="margin:0 0 32px;font-size:13px;color:rgba(240,237,230,0.35);line-height:1.7;border-left:2px solid rgba(232,255,71,0.3);padding-left:16px;">
                Тоглолтын хугацаа <strong style="color:rgba(240,237,230,0.6);">5–10 минут</strong> байна.<br/>
                Цуцлах бол арга хэмжээнээс <strong style="color:rgba(240,237,230,0.6);">2 хоногийн өмнө</strong> мэдэгдэнэ үү.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:0 0 24px;"/>

              <p style="margin:0;font-size:12px;color:rgba(240,237,230,0.2);line-height:1.6;">
                Асуух зүйл байвал <a href="mailto:info@openmic.mn" style="color:#e8ff47;text-decoration:none;">info@openmic.mn</a> руу бичнэ үү.<br/>
                © 2025 Open Mic Night — Улаанбаатар
              </p>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `✅ Open Mic — ${data.timeSlot} цагийн слот баталгаажлаа`,
    html,
  });
}
