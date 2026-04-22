import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Simple secret key guard — set ADMIN_SECRET in .env.local
// Access: GET /api/admin?secret=YOUR_SECRET
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await sql`
    SELECT
      id, first_name, last_name, email, phone,
      perf_type, time_slot, note,
      to_char(created_at AT TIME ZONE 'Asia/Ulaanbaatar', 'YYYY-MM-DD HH24:MI') AS registered_at
    FROM registrations
    ORDER BY time_slot ASC
  `;

  return NextResponse.json({ count: rows.length, registrations: rows });
}
