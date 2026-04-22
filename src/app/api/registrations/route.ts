import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    if (secret !== "zolo_open_mic_2026") {
      return NextResponse.json(
        { message: "Хандах эрхгүй байна." },
        { status: 401 },
      );
    }

    const data = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Мэдээлэл татахад алдаа гарлаа." },
      { status: 500 },
    );
  }
}
