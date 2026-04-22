import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Өөрийн prisma path-аа шалгаарай

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const { id } = await params;

  if (secret !== "zolo_open_mic_2026") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    // Number(id) эсвэл id (string) эсэхийг DB-ээсээ хамаарч шийднэ
    await prisma.registration.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "DB Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== "zolo_open_mic_2026")
    return NextResponse.json({ success: false }, { status: 401 });

  try {
    const updated = await prisma.registration.update({
      where: { id: Number(id) },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        grade: body.grade,
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
