import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/email";

const VALID_TYPES = ["music", "poetry", "comedy", "dance", "art", "other"];
const VALID_SLOTS = [
  "19:20","19:30","19:40","20:00","20:10","20:30","20:40","20:50",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      perfType,
      timeSlot,
      note,
    } = body;

    // ── Validation ──────────────────────────────────────────
    if (!firstName?.trim())       return err("Нэрээ оруулна уу.");
    if (!email?.includes("@"))    return err("Имэйл хаяг буруу байна.");
    if (!phone?.trim())           return err("Утасны дугаараа оруулна уу.");
    if (!VALID_TYPES.includes(perfType)) return err("Тоглолтын төрлөө сонгоно уу.");
    if (!VALID_SLOTS.includes(timeSlot)) return err("Цагийн слот буруу байна.");

    // ── Insert into Neon ────────────────────────────────────
    await sql`
      INSERT INTO registrations
        (first_name, last_name, email, phone, perf_type, time_slot, note)
      VALUES
        (${firstName.trim()}, ${lastName?.trim() ?? null}, ${email.trim().toLowerCase()},
         ${phone.trim()}, ${perfType}, ${timeSlot}, ${note?.trim() ?? null})
    `;

    // ── Send confirmation email ─────────────────────────────
    await sendConfirmationEmail({
      firstName: firstName.trim(),
      lastName: lastName?.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      perfType,
      timeSlot,
      note: note?.trim(),
    });

    return NextResponse.json({ success: true });

  } catch (e: unknown) {
    // Unique constraint → slot already taken
    if (
      typeof e === "object" && e !== null &&
      "code" in e && (e as { code: string }).code === "23505"
    ) {
      return err("Энэ цагийн слотыг өөр хүн аваад байна. Өөр цаг сонгоно уу.", 409);
    }

    console.error("[register] error:", e);
    return err("Серверийн алдаа гарлаа. Дахин оролдоно уу.", 500);
  }
}

// ── Helper ──────────────────────────────────────────────────
function err(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}
