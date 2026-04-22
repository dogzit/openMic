import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    // --- 0. БҮРТГЭЛИЙН ХУГАЦАА ШАЛГАХ ---
    // 2026 оны 3-р сарын 29, 13:00 цаг
    const DEADLINE = new Date("2026-04-29T13:00:00");
    const NOW = new Date();

    if (NOW > DEADLINE) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Уучлаарай, бүртгэлийн хугацаа 3-р сарын 29-ний 13:00 цагт дууссан байна.",
        },
        { status: 403 }, // Forbidden
      );
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      grade,
      classNumber,
      phone,
      studentCount,
      youtubeLink,
    } = body;

    // 1. Өмнө нь бүртгүүлсэн эсэхийг мэйл хаягаар нь шалгах
    const existingUser = await prisma.registration.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Энэ мэйл хаяг аль хэдийн бүртгүүлсэн байна. Нэг мэйлээр нэг л удаа бүртгүүлэх боломжтой.",
        },
        { status: 400 }, // Bad Request
      );
    }

    // 2. Хэрэв байхгүй бол Бааз руу хадгалах
    const newRegistration = await prisma.registration.create({
      data: {
        firstName,
        lastName,
        email,
        grade,
        classNumber,
        phone,
        studentCount,
        youtubeLink,
      },
    });

    // 3. Хэрэглэгч рүү баталгаажуулах мэйл илгээх
    await transporter.sendMail({
      from: `"Open Mic Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Open Mic - Бүртгэл баталгаажлаа! 🎤",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #3b82f6; border-radius: 12px; max-width: 500px;">
          <h2 style="color: #1e3a8a;">Сайн уу, ${firstName}!</h2>
          <p style="font-size: 16px; color: #334155;">Чиний <b>Open Mic Night</b>-д оролцох бүртгэл амжилттай баталгаажлаа. Тайзан дээр гялалзахыг чинь тэсэн ядан хүлээж байна!</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; font-weight: bold; color: #1e293b;">Бүртгэлийн мэдээлэл:</p>
            <ul style="list-style: none; padding: 0; margin-top: 10px;">
              <li style="margin-bottom: 5px;"><b>Анги:</b> ${grade}-${classNumber}</li>
              <li style="margin-bottom: 5px;"><b>Хамт оролцох:</b> ${studentCount} хүн</li>
              ${youtubeLink ? `<li style="margin-bottom: 5px;"><b>Үзүүлбэр:</b> <a href="${youtubeLink}" style="color: #3b82f6;">Линк үзэх</a></li>` : "<li><b>Үзүүлбэр:</b> Линк хавсаргаагүй</li>"}
            </ul>
          </div>
          <p style="color: #64748b; font-size: 13px;">Хэрэв мэдээлэл буруу байвал эсвэл цуцлах бол зохион байгуулагчидтай холбогдоорой. <br/> Утас: 88782206, 85953579 </p>
          <p style="font-weight: bold; color: #1e3a8a; margin-top: 20px;">Амжилт хүсье! 🚀</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: newRegistration });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { success: false, message: "Бүртгэл хийхэд алдаа гарлаа." },
      { status: 500 },
    );
  }
}
