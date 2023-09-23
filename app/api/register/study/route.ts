import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { institution, degree, fieldOfStudy, startDate, endDate, userId } =
      body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!institution) {
      return new NextResponse("institution is required", { status: 400 });
    }
    if (!degree) {
      return new NextResponse("degree is required", { status: 400 });
    }
    if (!fieldOfStudy) {
      return new NextResponse("fieldOfStudy is required", { status: 400 });
    }
    if (!startDate) {
      return new NextResponse("startDate is required", { status: 400 });
    }
    if (!endDate) {
      return new NextResponse("endDate is required", { status: 400 });
    }

    const education = await prismadb.education.create({
      data: {
        institution,
        degree,
        fieldOfStudy,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.log("[EDUCATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
